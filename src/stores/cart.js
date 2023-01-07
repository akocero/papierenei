/**
 * * This is a Setup Type of Store
 *
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import useAlert from '@/composables/useAlert';
import { useProductStore } from '@/stores/product';
import { useLocalStorage } from '@vueuse/core';

export const useCartStore = defineStore('cart', () => {
	const { pushAlert } = useAlert();
	const productStore = useProductStore();

	const list = ref(useLocalStorage('cart_list', []));
	// TODO: use isLoading on all the async function
	const isLoading = ref(false);
	const item = ref(null);
	const page = ref(1);
	const response = ref(null);
	const error = ref(null);

	//* This func will update the cart item
	//* Use this function inside onBeforeMounted
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

	//* Get Specific Product By ID
	const getProductDetails = async (_id) => {
		const { data } = await productStore.find(_id);
		return data;
	};

	const addToCart = (payload) => {
		//* check if the product is existed
		const existingProduct = list.value.find(
			(cartItem) => cartItem._id == payload._id,
		);

		//* if product is on cart, just increase qty by 1
		if (existingProduct) {
			console.log('existing', existingProduct.name);
			incQty(existingProduct._id, 1);
			return;
		}

		pushAlert('success', 'Succesfully added to cart!');

		//* add existing cart qty if product is new
		//! dont use the product quantity itself
		payload.cartQuantity = 1;

		list.value.push(payload);
	};

	// remove cart
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

	//* this computed function will fire everytime 'list' variable changed
	const subTotal = computed(() => {
		let subTotal = 0;
		list.value.forEach((cartItem) => {
			//* check if the product is on sale
			if (cartItem.salePrice) {
				return (subTotal += cartItem.salePrice * cartItem.cartQuantity);
			}
			return (subTotal += cartItem.unitCost * cartItem.cartQuantity);
		});

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
