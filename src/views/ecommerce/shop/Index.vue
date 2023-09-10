<template>
	<div class="wrapper min-h-screen sm:my-10">
		<QuickView
			@closeModal="closeModal"
			:show="isModalOpen"
			modalTitle="Default Modal"
		>
			<ProductHero :product="productModal" v-if="productModal" />
		</QuickView>
		<Spinner v-if="isLoading" />
		<div v-if="!isLoading">
			<!-- Title -->
			<div
				v-if="filterBy"
				class="mb-8 flex flex-col items-center justify-center rounded-2xl px-12 text-center"
				:class="filterBy?.shopBanner[0] && 'h-40'"
				:style="{
					'background-image':
						'url(' + filterBy?.shopBanner[0]?.secure_url + ')',
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}"
			>
				<h2
					class="font-nunito text-3xl font-black uppercase text-indigo-400"
				>
					{{ filterBy.name }}
				</h2>

				<p class="">
					{{ filterBy.description }}
				</p>
			</div>
			<h2
				class="mb-10 text-center font-nunito text-3xl font-black uppercase text-indigo-400"
				v-else
			>
				{{ shopTitle }}
			</h2>

			<!-- Filters -->
			<div class="mb-8 flex justify-between">
				<span class="flex space-x-4">
					<span class="flex flex-col">
						<TagFilter :tags="productTags" v-model="selectedTag" />
						<button
							class="mt-3 place-self-start rounded bg-gray-200 px-3 py-2"
							@click="reset('filter')"
							v-if="selectedTag"
						>
							Clear all
						</button>
					</span>
					<SortFilter
						:sortOptions="_sortedByOptions"
						v-model="selectedSortedBy"
					/>
				</span>
				<span class="flex flex-col">
					<PriceFilter
						:highestPrice="numberFormat(productStore.highestPrice)"
						@sortByPriceRange="sortByPriceRange"
						:priceRange="priceRange"
					/>
					<button
						class="mt-3 place-self-end rounded bg-gray-200 px-3 py-2"
						@click="reset('priceRange')"
						v-if="priceRange.from || priceRange.to"
					>
						Clear all
					</button>
				</span>
			</div>

			<!-- Products -->
			<div
				class="grid w-full grid-cols-2 gap-4 px-0 md:grid-cols-5 md:gap-8 md:px-0"
				v-if="productStore.list.length > 0"
			>
				<div v-for="(product, key) in productStore.list">
					<Product
						:key="product._id"
						:index="key"
						:product="product"
						@openModal="openModal"
						@addToCart="addToCart($event)"
					/>
				</div>
			</div>
			<div v-else class="">
				<h4 class="text-2xl">No products found!</h4>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch, onUnmounted } from 'vue';
import Product from '@/components/ecommerce/Product.vue';
import QuickView from '@/components/ecommerce/QuickView.vue';
import TagFilter from './TagFilter.vue';
import SortFilter from './SortFilter.vue';
import PriceFilter from './PriceFIlter.vue';

import useUtils from '@/composables/useUtils';
import { useProductStore } from '@/stores/product';
import { useTagStore } from '@/stores/tag';
import { useCollectionStore } from '@/stores/collection';

import { useCategoryStore } from '@/stores/category';
import { useCartStore } from '@/stores/cart';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import ProductHero from '@/components/ecommerce/ProductHero.vue';

const productStore = useProductStore();

const collectionStore = useCollectionStore();
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
const tagStore = useTagStore();

const shopTitle = ref('All Products');
const isLoading = ref(false);

const { numberFormat, sort } = useUtils();
const { addToCart } = cartStore;
const route = useRoute();
// initial state of modal
const isModalOpen = ref(false);

// TODO: filter products base on categories
// this is to get all selected categories
const selectedTag = ref(null);

// this is to get selected sortedBy
// select option filter
const selectedSortedBy = ref('new_to_old');
const _sortedByOptions = {
	best_selling: {
		query: '&sort=-soldCount',
		text: 'Best Selling',
	},
	low_to_high: {
		query: '&sort=unitCost',
		text: 'Price, low to high',
	},
	high_to_low: {
		query: '&sort=-unitCost',
		text: 'Price, high to low',
	},
	old_to_new: {
		query: '&sort=createdAt',
		text: 'Date, old to new',
	},
	new_to_old: {
		query: '&sort=-createdAt',
		text: 'Date, new to old',
	},
	sale: {
		query: '&salePrice[gte]=0',
		text: 'Sale',
	},
};

// price range filter
const priceRange = ref({
	from: '',
	to: '',
});
// Main Query
// const query = ref('<COLLECTION><TAG><PRICE><SORTED><SEARCH>');
const query = ref('');
// Filters Query
const qrySelectedPriceRange = ref('');
const qrySelectedTag = ref('');
const qrySelectedSortedBy = ref('');

// Filter Products
const qryFilterBy = ref('');
const qrySearch = ref('');

const filterBy = ref(null);
const isFilterOpen = ref(false);

// API SAMPLE QUERY
// db.tags.find({ tags: { $all: ["cheap", "blue"] } } )

//* query for tag tag is an array
//&tags[in][0]=value

//* query for price
//* '?unitCost[gte]=1&unitCost[lt]=50'

//* query for categories
//* '?categories[in][0]=6342b48cd84510d5a0e35265&categories[in][1]=6342b445d84510d5a0e3525a',

//* query for latest products
//* ?sort=-createdAt'

// for modal product details
const productModal = ref(null);
// search input value
const searchText = ref('');

const productTags = ref([]);

const routeQryUpdate = ref(false);

onBeforeMount(async () => {
	console.log('MOUNT CALLED');
	isLoading.value = true;
	await tagStore.fetch('');

	if (route.query.collection) {
		filterBy.value = await filterByCollectionOrCategories({
			_store: collectionStore,
			pageQry: 'collection',
			propertyName: 'collections',
		});
	}

	if (route.query.category) {
		filterBy.value = await filterByCollectionOrCategories({
			_store: categoryStore,
			pageQry: 'category',
			propertyName: 'categories',
		});
	}

	routeQryUpdate.value = true;
	if (route.query.sale) {
		selectedSortedBy.value = 'sale';
		qrySelectedSortedBy.value = _sortedByOptions['sale'].query;
		shopTitle.value = 'Sale';
	} else {
		selectedSortedBy.value = 'new_to_old';
		qrySelectedSortedBy.value = _sortedByOptions['new_to_old'].query;
		shopTitle.value = 'All Products';
	}

	// to check if there is route query search
	// if true filter products base on search value
	if (route.query.search) {
		searchText.value = route.query.search;
		filterBySearch(true);
	}

	// if no collection route query or not valid id
	// fetch all products
	await filterProducts();

	productTags.value = getProductTags(productStore.list);
	routeQryUpdate.value = false;
	isLoading.value = false;
});

const filterByCollectionOrCategories = async ({
	_store,
	pageQry,
	propertyName,
}) => {
	let _filterBy = null;
	_filterBy = await _store.find(route.query[pageQry]);

	if (_store.error) {
		return false;
	}

	qryFilterBy.value = `?${propertyName}[in][0]=${_store.item._id}`;

	return _filterBy;
};

// this function will refetch the shop page if the route collection query change
// I did this because if you change the value of collection query the page won't refetch
onBeforeRouteUpdate(async (to, from, next) => {
	console.log('onBeforeRouteUpdate TRIGGERED');
	if (to.fullPath === from.fullPath) {
		next();
		return;
	}

	isLoading.value = true;
	if (to.query.collection) {
		filterBy.value = await collectionStore.find(to.query.collection);

		if (!collectionStore.error) {
			qryFilterBy.value = `?collections[in][0]=${collectionStore.item._id}`;
		}
	}

	if (to.query.category) {
		filterBy.value = await categoryStore.find(route.query.category);

		if (!categoryStore.error) {
			qryFilterBy.value = `?categories[in][0]=${categoryStore.item._id}`;
		}
	}

	if (!to.query.collection && !to.query.category) {
		qryFilterBy.value = '';
		filterBy.value = null;
	}

	routeQryUpdate.value = true;

	if (to.query.sale) {
		selectedSortedBy.value = 'sale';
		qrySelectedSortedBy.value = _sortedByOptions['sale'].query;
		shopTitle.value = 'Sale';
	} else {
		selectedSortedBy.value = 'new_to_old';
		qrySelectedSortedBy.value = _sortedByOptions['new_to_old'].query;
		shopTitle.value = 'All Products';
	}

	// fetch products no filter
	await filterProducts();
	isLoading.value = false;
	routeQryUpdate.value = false;
	next();
});

// to filter products
const filterProducts = async () => {
	console.log('Filter Called');
	query.value = `${qryFilterBy.value}${qrySelectedTag.value}${qrySelectedPriceRange.value}${qrySelectedSortedBy.value}${qrySearch.value}&isPublished=1`;

	if (!qryFilterBy.value) {
		query.value = '?' + query.value.slice(1);
	}

	await productStore.fetch(query.value);
};

const filterBySearch = (isCalledInMount = false) => {
	qrySearch.value = `&name[regex]=${searchText.value}`;

	if (isCalledInMount === false) {
		filterProducts();
	}
};

const reset = (str) => {
	if (str === 'filter') {
		selectedTag.value = null;
		qrySelectedTag.value = '';
	}

	if (str === 'sortedBy') {
		selectedSortedBy.value = 'new_to_old';
		qrySelectedSortedBy.value = '';
	}

	if (str === 'priceRange') {
		qrySelectedPriceRange.value = '';
		priceRange.value.from = '';
		priceRange.value.to = '';
	}

	filterProducts();
};

const getProductTags = (products) => {
	let tags = [];

	products.forEach((p) => {
		if (!p.tags) return;
		p.tags.forEach((t) => {
			tags.push(t);
		});
	});

	const uniqueTags = [...new Set(tags)];

	tags = tagStore.list.filter((t) => {
		if (uniqueTags.includes(t._id)) return t;
		return;
	});

	return sort(tags, 'name');
};

// if selectedSortedBy is change, filter products accordingly
watch(
	() => selectedSortedBy.value,
	(newVal, oldVal) => {
		if (routeQryUpdate.value) {
			return;
		}
		console.log('WATCH selectedSortedBy CALLED');
		qrySelectedSortedBy.value = _sortedByOptions[newVal].query;
		filterProducts();
	},
);

watch(
	() => selectedTag.value,
	(newVal, oldVal) => {
		if (newVal) {
			console.log('WATCH selectedTag CALLED');
			qrySelectedTag.value = `&tags[in][0]=${newVal}`;
			filterProducts();
		}
	},
);

const sortByPriceRange = () => {
	const min = priceRange.value.from ? priceRange.value.from : 0;
	const max = priceRange.value.to
		? priceRange.value.to
		: Number.NEGATIVE_INFINITY;

	qrySelectedPriceRange.value = `&unitCost[gte]=${min}&unitCost[lte]=${max}`;
	filterProducts();
};

// modal functions
function openModal(product) {
	isModalOpen.value = true;
	productModal.value = product;
}

function closeModal() {
	isModalOpen.value = false;
	productModal.value = null;
}
</script>

<style></style>
