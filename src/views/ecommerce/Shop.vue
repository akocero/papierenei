<template>
	<QuickView
		@closeModal="closeModal"
		:show="isOpen"
		modalTitle="Default Modal"
	>
		<div class="mt-2 grid grid-cols-2 gap-8 text-darkBlue">
			<div><img src="../../assets/sample_product.webp" alt="" /></div>
			<div class="flex flex-col">
				<div>
					<h4 class="text-3xl font-bold">
						USB Electric Heated Hand Pillow
					</h4>
					<h5 class="font-mono text-2xl">₱45.00</h5>

					<p>
						Keep your pages marked with this motivational
						papemelroti bookmark. You never have to worry about it
						slipping out, t...
					</p>
				</div>
				<div class="mt-10">
					<ProductQuantity />
					<button
						class="mt-4 w-full rounded-lg bg-darkBlue px-6 py-2 text-xl font-bold text-white"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	</QuickView>
	<div class="mx-auto my-12 flex max-w-screen-2xl gap-10 px-4 2xl:px-0">
		<div class="flex w-1/4 flex-col space-y-8">
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
					>
						<label for="" class="flex translate-y-1 items-center">
							<input
								type="radio"
								class="mb-1"
								v-model="selectedTag"
								:value="category._id"
							/>
							<span class="ml-2">{{ category.name }}</span>
						</label>
					</li>
				</ul>

				<!-- <div class="border-b py-2">
					<input type="checkbox" class="" />
					<label for="" class="ml-3 inline-block translate-y-1"
						>For Girl</label
					>
				</div> -->
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
						<span class="font-mono font-bold"
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
							class="w-full border-gray-300 font-mono"
						/>
					</div>
					<div class="col-span-5">
						<input
							type="number"
							v-model="priceRange.to"
							placeholder="₱ Max"
							class="w-full border-gray-300 font-mono"
						/>
					</div>
					<button
						@click="sortByPriceRange"
						class="col-span-2 h-full border border-gray-300 font-semibold"
					>
						Go
					</button>
				</div>
			</div>
		</div>
		<div class="bg-lightBlue flex items-center px-6">
			<div class="mx-auto w-full max-w-7xl">
				<div
					class="mb-8"
					v-if="!collectionStore.isLoading && collectionStore.item"
				>
					<h2 class="text-3xl font-bold uppercase">
						{{ collectionStore.item.name }}
					</h2>
					<div class="pt-2 pb-4">
						<hr />
					</div>

					<p>
						{{ collectionStore.item.description }}
					</p>

					<div class="mt-4 h-52 bg-gray-200"></div>
				</div>
				<div class="mb-8" v-else>
					<h2 class="text-3xl font-bold uppercase">ALL PRODUCTS</h2>
					<div class="pt-2 pb-4">
						<hr />
					</div>

					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Eligendi mollitia praesentium magnam quia dolorum
						odio deserunt debitis illo repudiandae fuga?
					</p>

					<div class="mt-4 h-52 bg-gray-200"></div>
				</div>

				<div
					class="grid w-full grid-cols-1 gap-10 px-4 md:grid-cols-4 md:px-0"
					v-if="!productStore.isLoading"
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
				<Spinner v-else />
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import Product from '@/components/ecommerce/Product.vue';
import QuickView from '@/components/ecommerce/QuickView.vue';
import ProductQuantity from '@/components/ecommerce/ProductQuantity.vue';
import Spinner from '@/components/Spinner.vue';
import useUtils from '@/composables/useUtils';
import { useProductStore } from '@/stores/product';
import { useTagStore } from '@/stores/tag';
import { useCollectionStore } from '@/stores/collection';
import { useCartStore } from '@/stores/cart';
import { useRoute } from 'vue-router';
import { computed } from '@vue/reactivity';

const productStore = useProductStore();
const collectionStore = useCollectionStore();
const cartStore = useCartStore();
const tagStore = useTagStore();

const { numberFormat, sort } = useUtils();
const { addToCart } = cartStore;
const route = useRoute();
// initial state of modal
const isOpen = ref(false);

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

// initial query new to old filter: latest first
const query = ref('<COLLECTION><TAG><PRICE><SORTED>');
const queryFilterCategories = ref('');
const queryFilterPriceRange = ref('');
const queryCollection = ref('');
const queryFilterByTag = ref('');
const querySortedBy = ref('');
const activeCollection = ref(null);
// db.tags.find({ tags: { $all: ["cheap", "blue"] } } )

//* query for price
//* '?unitCost[gte]=1&unitCost[lt]=50'

//* query for categories
//* '?categories[in][0]=6342b48cd84510d5a0e35265&categories[in][1]=6342b445d84510d5a0e3525a',

//* query for latest products
//* ?sort=-createdAt'

onBeforeMount(async () => {
	await tagStore.fetch('');
	await collectionStore.find(route.params.id);

	if (!collectionStore.error) {
		queryCollection.value = `collections[in][0]=${collectionStore.item._id}`;
	}

	// fetch products no filter
	await filterProducts();

	// fetch catories
	await collectionStore.fetch('');
	// console.log('product list', collectionStore.list);
});

// to filter products
const filterProducts = async () => {
	if (!queryFilterByTag.value) {
		query.value = query.value.replace('<TAG>', '');
	}

	if (!querySortedBy.value) {
		query.value = query.value.replace('<SORTED>', '');
	}

	if (!queryFilterPriceRange.value) {
		query.value = query.value.replace('<PRICE>', '');
	}

	if (!queryCollection.value) {
		query.value = query.value.replace('<COLLECTION>', '');
	}

	console.log('COLLECTION', queryCollection.value);
	console.log('TAG', queryFilterByTag.value);
	console.log('PRICE', queryFilterPriceRange.value);
	console.log('SORTED', querySortedBy.value);

	query.value = `${queryCollection.value}${queryFilterByTag.value}${queryFilterPriceRange.value}${querySortedBy.value}`;

	if (!queryCollection.value) {
		query.value = '?' + query.value.slice(1);
	}

	console.log('QUERY', query.value);
	await productStore.fetch(query.value);

	// query.value = '?';
};

const reset = (str) => {
	if ('filters') {
		selectedTag.value = null;
		queryFilterByTag.value = '';
	}

	if ('sortedBy') {
		selectedSortedBy.value = 'new_to_old';
		querySortedBy.value = '';
	}

	if ('priceRange') {
		queryFilterPriceRange.value = '';
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
				querySortedBy.value = '&sort=-soldCount';
				break;
			case 'low_to_high':
				querySortedBy.value = '&sort=unitCost';
				break;
			case 'high_to_low':
				querySortedBy.value = '&sort=-unitCost';
				break;
			case 'old_to_new':
				querySortedBy.value = '&sort=createdAt';
				break;
			case 'new_to_old':
				querySortedBy.value = '&sort=-createdAt';
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
			queryFilterByTag.value = `&tags[in][0]=${newVal}`;
			filterProducts();
		}
	},
);

const filterByCategories = (categories) => {
	//* '?categories[in][0]=6342b48cd84510d5a0e35265&categories[in][1]=6342b445d84510d5a0e3525a',

	let query = '?';
	categories.forEach((ctry, index) => {
		query += `categories[in][${index}]=${ctry}&`;
	});
};

// TODO: make it one object
// make it filter on change of value
const sortByPriceRange = () => {
	let _queryFrom = '';
	let _queryTo = '';
	queryFilterPriceRange.value = '';

	if (!priceRange.value.from && !priceRange.value.to) {
		return;
	}

	if (priceRange.value.from) {
		_queryFrom = `&unitCost[gte]=${priceRange.value.from}`;
	}

	if (priceRange.value.to) {
		_queryTo = `&unitCost[lt]=${priceRange.value.to}`;
	}

	queryFilterPriceRange.value = _queryFrom + _queryTo;

	filterProducts();
};

function openModal() {
	isOpen.value = true;
}

function closeModal() {
	isOpen.value = false;
}
</script>

<style></style>
