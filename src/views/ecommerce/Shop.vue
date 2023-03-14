<template>
	<div class="wrapper my-10">
		<QuickView
			@closeModal="closeModal"
			:show="isModalOpen"
			modalTitle="Default Modal"
		>
			<ProductHero :product="productModal" v-if="productModal" />
		</QuickView>
		<div class="grid grid-cols-12 gap-y-10 sm:gap-10">
			<div class="col-span-full space-y-8 sm:col-span-3">
				<form class="relative" @submit.prevent="filterBySearch()">
					<input
						type="text"
						class="w-full border-gray-300 pr-8 font-sans"
						v-model="searchText"
						placeholder="Search..."
					/>
					<button>
						<vue-feather
							type="search"
							size="18"
							class="absolute top-3 right-3 text-gray-500"
						></vue-feather>
					</button>
				</form>

				<div class="">
					<div class="mb-4 flex justify-between">
						<h3 class="font-semibold">SORTED BY</h3>
						<button
							type="button "
							class="text-sm font-bold underline"
							@click="reset('sortedBy')"
						>
							Reset
						</button>
					</div>
					<select
						class="w-full border-gray-300"
						v-model="selectedSortedBy"
					>
						<option
							v-for="so in sortedByOptions"
							:key="so.sort_value"
							:value="so.sort_value"
						>
							{{ so.text }}
						</option>
					</select>
				</div>

				<div>
					<div class="mb-4 flex justify-between">
						<h3 class="font-semibold">FILTERS</h3>
						<button
							type="button "
							class="text-sm font-bold underline"
							@click="reset('filter')"
						>
							Reset
						</button>
					</div>
					<ul>
						<li
							v-for="category in productTags"
							:key="category.name"
							class="py-1"
							v-if="productTags.length > 0"
						>
							<label
								for=""
								class="flex translate-y-1 items-center"
							>
								<input
									type="radio"
									class="mb-1"
									v-model="selectedTag"
									:value="category._id"
								/>
								<span class="ml-2">{{ category.name }}</span>
							</label>
						</li>
						<li v-else>No Filters Found!</li>
					</ul>
				</div>

				<div>
					<div class="mb-4 flex justify-between">
						<h3 class="font-semibold">PRICE</h3>
						<button
							type="button "
							class="text-sm font-bold underline"
							@click="reset('priceRange')"
						>
							Reset
						</button>
					</div>
					<div class="flex justify-between">
						<h5>
							The highest price is
							<span class="font-sans font-bold"
								>₱{{ numberFormat(productStore.highestPrice) }}
							</span>
						</h5>
					</div>
					<div
						class="mt-2 grid grid-cols-12 items-center justify-between gap-1"
					>
						<div class="col-span-5">
							<input
								type="number"
								v-model="priceRange.from"
								placeholder="₱ Min"
								class="w-full border-gray-300 font-sans"
							/>
						</div>
						<div class="col-span-5">
							<input
								type="number"
								v-model="priceRange.to"
								placeholder="₱ Max"
								class="w-full border-gray-300 font-sans"
							/>
						</div>
						<button
							@click="sortByPriceRange"
							class="col-span-2 flex h-full items-center justify-center border border-gray-300 font-semibold"
						>
							<vue-feather
								type="arrow-right"
								size="18"
								class="text-gray-500"
							></vue-feather>
						</button>
					</div>
				</div>
			</div>
			<div class="col-span-full sm:col-span-9">
				<div class="">
					<div class="mb-8" v-if="filterBy">
						<h2 class="text-3xl font-bold uppercase">
							{{ filterBy.name }}
						</h2>
						<div class="pt-2 pb-4">
							<hr />
						</div>

						<p>
							{{ filterBy.description }}
						</p>

						<div class="mt-4 h-52 bg-gray-200"></div>
					</div>
					<div class="mb-8 w-full" v-else>
						<h2 class="text-3xl font-bold uppercase">
							ALL PRODUCTS
						</h2>
						<div class="pt-2 pb-4">
							<hr />
						</div>

						<!-- <p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Eligendi mollitia praesentium magnam quia dolorum
						odio deserunt debitis illo repudiandae fuga?
					</p> -->

						<div class="mt-4 h-52 bg-gray-200"></div>
					</div>

					<Spinner v-if="productStore.isLoading" />

					<div
						class="grid w-full grid-cols-2 gap-4 px-0 md:grid-cols-4 md:gap-10 md:px-0"
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
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import Product from '@/components/ecommerce/Product.vue';
import QuickView from '@/components/ecommerce/QuickView.vue';
import useUtils from '@/composables/useUtils';
import { useProductStore } from '@/stores/product';
import { useTagStore } from '@/stores/tag';
import { useCollectionStore } from '@/stores/collection';
import { useCategoryStore } from '@/stores/category';
import { useCartStore } from '@/stores/cart';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';
import ProductHero from '@/components/ecommerce/ProductHero.vue';

const productStore = useProductStore();
const collectionStore = useCollectionStore();
const categoryStore = useCategoryStore();
const cartStore = useCartStore();
const tagStore = useTagStore();

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
const sortedByOptions = ref([
	{ text: 'Best Selling', sort_value: 'best_selling' },
	{ text: 'Price, low to high', sort_value: 'low_to_high' },
	{ text: 'Price, high to low', sort_value: 'high_to_low' },
	{ text: 'Date, old to new', sort_value: 'old_to_new' },
	{ text: 'Date, new to old', sort_value: 'new_to_old' },
]);

// price range filter
const priceRange = ref({
	from: '',
	to: '',
});
// Main Query
const query = ref('<COLLECTION><TAG><PRICE><SORTED><SEARCH>');
// Filters Query
const qrySelectedPriceRange = ref('');
const qrySelectedTag = ref('');
const qrySelectedSortedBy = ref('');

// Filter Products
const qryFilterBy = ref('');
const qrySearch = ref('');

const filterBy = ref(null);

// API SAMPLE QUERY
// db.tags.find({ tags: { $all: ["cheap", "blue"] } } )

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

onBeforeMount(async () => {
	await tagStore.fetch('');

	// check if there is a route query collection
	if (route.query.collection) {
		// find and filter the product base on the product collection
		filterBy.value = await collectionStore.find(route.query.collection);

		// if the collection id is valid filter the products base on collection id
		if (!collectionStore.error) {
			qryFilterBy.value = `?collections[in][0]=${collectionStore.item._id}`;
		}
	}

	// check if there is a route query collection
	if (route.query.category) {
		// find and filter the product base on the product collection
		filterBy.value = await categoryStore.find(route.query.category);

		console.log('filterBy.value', filterBy.value);

		// if the collection id is valid filter the products base on collection id
		if (!categoryStore.error) {
			qryFilterBy.value = `?categories[in][0]=${categoryStore.item._id}`;
		}
	}

	// if no collection route query or not valid id
	// fetch all products
	await filterProducts();

	// to check if there is route query search
	// if true filter products base on search value
	if (route.query.search) {
		searchText.value = route.query.search;
		filterBySearch();
	}
});

// this function will refetch the shop page if the route collection query change
// I did this because if you change the value of collection query the page won't refetch
onBeforeRouteUpdate(async (to, from, next) => {
	await collectionStore.find(to.query.collection);

	if (!collectionStore.error) {
		qryFilterBy.value = `?collections[in][0]=${collectionStore.item._id}`;
	}

	// fetch products no filter
	await filterProducts();
	next();
});

// to filter products
const filterProducts = async () => {
	if (!qrySelectedTag.value) {
		query.value = query.value.replace('<TAG>', '');
	}

	if (!qrySelectedSortedBy.value) {
		query.value = query.value.replace('<SORTED>', '');
	}

	if (!qrySelectedPriceRange.value) {
		query.value = query.value.replace('<PRICE>', '');
	}

	if (!qrySearch.value) {
		query.value = query.value.replace('<SEARCH>', '');
	}

	if (!qryFilterBy.value) {
		query.value = query.value.replace('<COLLECTION>', '');
	}

	query.value = `${qryFilterBy.value}${qrySelectedTag.value}${qrySelectedPriceRange.value}${qrySelectedSortedBy.value}${qrySearch.value}&isPublished=1`;

	if (!qryFilterBy.value) {
		query.value = '?' + query.value.slice(1);
	}

	await productStore.fetch(query.value);
};

const filterBySearch = () => {
	qrySearch.value = `&name[regex]=${searchText.value}`;

	filterProducts();
};

const reset = (str) => {
	if ('filters') {
		selectedTag.value = null;
		qrySelectedTag.value = '';
	}

	if ('sortedBy') {
		selectedSortedBy.value = 'new_to_old';
		qrySelectedSortedBy.value = '';
	}

	if ('priceRange') {
		qrySelectedPriceRange.value = '';
		priceRange.value.from = '';
		priceRange.value.to = '';
	}

	filterProducts();
};

const productTags = computed(() => {
	let tags = [];
	productStore.list.forEach((p) => {
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
});

// if selectedSortedBy is change, filter products accordingly
watch(
	() => selectedSortedBy.value,
	(newVal, oldVal) => {
		switch (newVal) {
			case 'best_selling':
				qrySelectedSortedBy.value = '&sort=-soldCount';
				break;
			case 'low_to_high':
				qrySelectedSortedBy.value = '&sort=unitCost';
				break;
			case 'high_to_low':
				qrySelectedSortedBy.value = '&sort=-unitCost';
				break;
			case 'old_to_new':
				qrySelectedSortedBy.value = '&sort=createdAt';
				break;
			case 'new_to_old':
				qrySelectedSortedBy.value = '&sort=-createdAt';
				break;
			default:
		}
		filterProducts();
	},
);

watch(
	() => selectedTag.value,
	(newVal, oldVal) => {
		// filterByCategories(newVal);
		if (newVal) {
			qrySelectedTag.value = `&tags[in][0]=${newVal}`;
			filterProducts();
		}
	},
);

const sortByPriceRange = () => {
	let _queryFrom = '';
	let _queryTo = '';
	qrySelectedPriceRange.value = '';

	if (!priceRange.value.from && !priceRange.value.to) {
		return;
	}

	if (priceRange.value.from) {
		_queryFrom = `&unitCost[gte]=${priceRange.value.from}`;
	}

	if (priceRange.value.to) {
		_queryTo = `&unitCost[lt]=${priceRange.value.to}`;
	}

	qrySelectedPriceRange.value = _queryFrom + _queryTo;

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
