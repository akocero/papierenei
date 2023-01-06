import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import useAlert from '@/composables/useAlert';
import { useProductStore } from '@/stores/product';
import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore('cart', () => {
	const { pushAlert } = useAlert();
	const productStore = useProductStore();

	const list = ref(useLocalStorage('cart_list', []));
	const isLoading = ref(false);
	const item = ref(null);
	const page = ref(1);
	const response = ref(null);
	const error = ref(null);

	const updateCartListDetails = async () => {
		isLoading.value = true;
		const _tempList = [];
		if (list.value.length > 0) {
			await Promise.all(
				list.value.map(async (cartItem) => {
					const _cartItem = await getProductDetails(cartItem._id);
					_cartItem.cartQuantity = cartItem.cartQuantity;
					console.log(_cartItem);
					_tempList.push(_cartItem);
				}),
			);
		}
		list.value = _tempList;
		isLoading.value = false;
	};

	const getProductDetails = async (_id) => {
		const { data } = await productStore.find(_id);
		return data;
	};

	const addToCart = (payload) => {
		const existingProduct = list.value.find(
			(cartItem) => cartItem._id == payload._id,
		);

		if (existingProduct) {
			console.log('existing', existingProduct.name);
			incQty(existingProduct._id, 1);
			return;
		}

		pushAlert('success', 'Succesfully added to cart!');

		payload.cartQuantity = 1;
		list.value.push(payload);
	};

	const removeToCart = (_id) => {
		if (confirm('This item will be removed!')) {
			list.value = list.value.filter((cartItem) => cartItem._id != _id);
		}
	};

	const incQty = (id, value) => {
		const cartItem = list.value.find((cartItem) => cartItem._id == id);

		if (cartItem.quantity <= cartItem.cartQuantity) {
			pushAlert('warning', 'Product quantity exceeded!');
			return false;
		}

		cartItem.cartQuantity += value;
	};

	const decQty = (id, value) => {
		const cartItem = list.value.find((cartItem) => cartItem._id == id);

		if (cartItem.cartQuantity <= 1) {
			pushAlert('warning', 'Quantity must be greater or equal than 1!');
			return false;
		}

		cartItem.cartQuantity -= value;
	};

	const subTotal = computed(() => {
		let subTotal = 0;
		list.value.forEach((cartItem) => {
			if (cartItem.salePrice) {
				return (subTotal += cartItem.salePrice * cartItem.cartQuantity);
			}
			return (subTotal += cartItem.unitCost * cartItem.cartQuantity);
		});
		console.log('asdasdasd', subTotal);

		return subTotal;
	});

	return {
		list,
		subTotal,
		isLoading,
		addToCart,
		removeToCart,
		incQty,
		decQty,
		updateCartListDetails,
	};
});

// export const useCartStore = defineStore({
// 	id: 'cart',
// 	state: () => ({
// 		list: [],
// 		isLoading: false,
// 		item: null,
// 		page: 1,
// 		url: `items`,
// 		response: null,
// 		error: null,
// 		subTotal: 0,
// 	}),
// 	getters: {
// 		doubleCount: (state) => state.counter * 2,
// 	},
// 	actions: {
// 		async create(payload) {
// 			return await storeHelpers.create(this, payload);
// 		},
// 		async update(payload) {
// 			return await storeHelpers.update(this, payload);
// 		},
// 		async fetch(query) {
// 			await storeHelpers.fetch(this, query);
// 		},
// 		async find(id) {
// 			await storeHelpers.find(this, id);
// 		},
// 		async deleteImage(payload) {
// 			await storeHelpers.deleteImage(this, payload);
// 		},

// 		add(payload) {
// 			console.log('store cart: add', payload);

// 			const existingProduct = this.list.find(
// 				(cartItem) => cartItem._id == payload._id,
// 			);

// 			if (existingProduct) {
// 				console.log('existing', existingProduct.name);
// 				this.incQty(existingProduct._id, 1);
// 				return;
// 			}

// 			payload.cartQuantity = 1;
// 			this.list.push(payload);
// 			this.computeSubTotal();
// 		},
// 		incQty(id, value) {
// 			const cartItem = this.list.find((cartItem) => cartItem._id == id);

// 			if (cartItem.quantity > cartItem.cartQuantity) {
// 				cartItem.cartQuantity += value;
// 				console.log('nag add');
// 			} else {
// 				console.log('sobra na boy');
// 			}

// 			this.computeSubTotal();
// 		},
// 		decQty(id, value) {
// 			const cartItem = this.list.find((cartItem) => cartItem._id == id);

// 			if (cartItem.cartQuantity > 1) {
// 				cartItem.cartQuantity -= value;
// 				console.log('nag bawas');
// 			} else {
// 				console.log('zero na boy');
// 			}

// 			this.computeSubTotal();
// 		},
// 		computeSubTotal() {
// 			this.subTotal = 0;
// 			this.list.forEach((cartItem) => {
// 				this.subTotal += cartItem.unitCost * cartItem.cartQuantity;
// 			});

// 			console.log(this.subTotal);
// 		},
// 	},
// });
