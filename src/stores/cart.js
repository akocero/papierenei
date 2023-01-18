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

	//* This func will update the cart items
	// !Note: Use this function inside onBeforeMounted
	const updateCartListDetails = async () => {
		isLoading.value = true;

		const newCartList = [];
		if (list.value.length > 0) {
			await Promise.all(
				list.value.map(async (prevCartItem) => {
					// get the latest prodct value
					const newCartItem = await getProductDetails(
						prevCartItem._id,
					);
					// check if the previous cart item qty greater than the new cart item qty
					if (prevCartItem.cartQuantity > newCartItem.quantity) {
						// if true get the latest quantity
						newCartItem.cartQuantity = newCartItem.quantity;
					} else {
						// else get the previous and attached it to the updated cart item
						newCartItem.cartQuantity = prevCartItem.cartQuantity;
					}

					// check if the product is on sale then get the sale price if not get the unit cost
					newCartItem.cartPrice = newCartItem.salePrice
						? newCartItem.salePrice
						: newCartItem.unitCost;

					// just multyiply the qty and the price to get the total
					newCartItem.cartTotal =
						newCartItem.cartPrice * prevCartItem.cartQuantity;

					// push to new cart list
					newCartList.push(newCartItem);
				}),
			);
		}
		// udpate the previous cart to latest
		list.value = newCartList;

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

		//* if product is already in cart, just increase qty by 1
		if (existingProduct) {
			console.log('existing', existingProduct.name);
			incQty(existingProduct._id, 1);
			return;
		}

		pushAlert('success', 'Succesfully added to cart!');

		//* add cartQuantity, cartPrice, cartTotal properties to the product itself before pushing to cart
		//* this will use for cart system and checkout

		//! dont use the product quantity, price itself
		payload.cartQuantity = 1;

		//* check if the product is in sale then get the sale price if not get the unit cost
		payload.cartPrice = payload.salePrice
			? payload.salePrice
			: payload.unitCost;

		// just multyiply the qty and the price to get the total
		payload.cartTotal = payload.cartPrice * payload.cartQuantity;

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
		// increase cartQty base on the value given
		cartItem.cartQuantity += value;
		// Update cartTotal
		cartItem.cartTotal = cartItem.cartPrice * cartItem.cartQuantity;
	};

	const decQty = (id, value) => {
		const cartItem = list.value.find((cartItem) => cartItem._id == id);

		if (cartItem.cartQuantity <= 1) {
			pushAlert('warning', 'Quantity must be greater or equal than 1!');
			return false;
		}

		cartItem.cartQuantity -= value;
		cartItem.cartTotal = cartItem.cartPrice * cartItem.cartQuantity;
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

	const clearCart = async (items) => {
		// await Promise.all(
		// 	items.map(async (item) => {
		// 		await productStore.updateQty(item);
		// 	}),
		// );

		list.value = [];
	};

	return {
		list,
		subTotal,
		isLoading,
		addToCart,
		removeToCart,
		incQty,
		decQty,
		updateCartListDetails,
		clearCart,
	};
});
