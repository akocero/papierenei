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
	<div class="mx-auto my-12 flex max-w-screen-2xl gap-10">
		<div class="w-1/4">
			<h3 class="font-semibold">SORTED BY</h3>
			<!-- <hr class="" /> -->
			<div class="my-4">
				<select
					class="w-full focus:border-0"
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

			<h3 class="font-semibold">CATEGORIES</h3>

			<div class="my-3 font-sans">
				<div class="flex justify-between">
					<h5>0 Selected</h5>
					<a href="#">Reset</a>
				</div>
				<div
					class="border-b py-2"
					v-for="category in categoryStore.list"
					:key="category.name"
				>
					<input
						type="checkbox"
						class=""
						v-model="selectedCategories"
						:value="category.name"
					/>
					<label for="" class="ml-3 inline-block translate-y-1">{{
						category.name
					}}</label>
				</div>
				<!-- <div class="border-b py-2">
					<input type="checkbox" class="" />
					<label for="" class="ml-3 inline-block translate-y-1"
						>For Girl</label
					>
				</div> -->
			</div>

			<h3 class="font-semibold">PRICE</h3>

			<div class="my-3 w-full font-sans">
				<div class="flex justify-between">
					<h5>
						The highest price is
						<span class="font-bold"
							>₱
							{{ numberFormat(productStore.highestPrice) }}</span
						>
					</h5>
					<a href="#">Reset</a>
				</div>
				<div class="mt-4 flex items-center justify-between">
					<div class="w-1/2">
						<input
							type="number"
							v-model="priceFrom"
							placeholder="$ From"
							class="w-full"
						/>
					</div>
					<div class="w-1/2">
						<input
							type="number"
							v-model="priceTo"
							placeholder="$ To"
							class="w-full"
						/>
					</div>
					<button @click="sortByPriceRange">Fire</button>
				</div>
			</div>
		</div>
		<div class="bg-lightBlue flex items-center px-6">
			<div class="mx-auto w-full max-w-7xl">
				<div class="mb-8">
					<h2 class="text-3xl font-bold uppercase">Bearly Art</h2>
					<div class="pt-2 pb-4">
						<hr />
					</div>

					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Laborum officiis, nulla optio aliquam error
						repellat aspernatur repudiandae accusamus suscipit
						architecto.
					</p>

					<div class="mt-4 h-52 bg-gray-200"></div>
				</div>

				<div
					class="grid w-full grid-cols-1 gap-10 px-4 md:grid-cols-4 md:px-0"
					v-if="!productStore.isLoading"
				>
					<div v-for="product in productStore.list">
						<Product
							:key="product._id"
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
import { useCategoryStore } from '@/stores/category';
import { useCartStore } from '@/stores/cart';

const productStore = useProductStore();
const categoryStore = useCategoryStore();
const cartStore = useCartStore();

const { numberFormat } = useUtils();
const { addToCart } = cartStore;
// initial state of modal
const isOpen = ref(false);

// TODO: filter products base on categories
// this is to get all selected categories
const selectedCategories = ref([]);

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
const priceFrom = ref(0);
const priceTo = ref(0);

// initial query new to old filter: latest first
const query = ref('?sort=-createdAt');

//* query fo price
//* '?unitCost[gte]=1&unitCost[lt]=50'

onBeforeMount(async () => {
	// fetch products no filter
	await filterProducts();
	// fetch catories
	await categoryStore.fetch('');
});

// if selectedSortedBy is change, filter products accordingly
watch(
	() => selectedSortedBy.value,
	(newVal, oldVal) => {
		switch (newVal) {
			case 'best_selling':
				query.value = '?sort=-soldCount';
				break;
			case 'low_to_high':
				query.value = '?sort=unitCost';
				break;
			case 'high_to_low':
				query.value = '?sort=-unitCost';
				break;
			case 'old_to_new':
				query.value = '?sort=createdAt';
				break;
			case 'new_to_old':
				query.value = '?sort=-createdAt';
				break;
			default:
		}
		filterProducts();
	},
);

// to filter products
const filterProducts = async () => {
	await productStore.fetch(query.value);
	query.value = '?';
};

const sortByPriceRange = () => {
	let _query = '';
	if (!priceFrom.value && !priceTo.value) {
		return;
	}
	if (priceFrom.value) {
		_query += `unitCost[gte]=${priceFrom.value}&`;
	}

	if (priceTo.value) {
		_query += `unitCost[lt]=${priceTo.value}`;
	}
	query.value += _query;

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
