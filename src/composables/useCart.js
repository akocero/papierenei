import { useCartStore } from '@/stores/cart';
import _ from 'lodash';

export default function useCart() {
	// converting first letter to uppercase
	const cartStore = useCartStore();

	const addToCart = (item) => {
		cartStore.add(item);
	};

	const incQty = (id, value) => {
		return cartStore.incQty(id, value);
	};

	const decQty = (id, value) => {
		return cartStore.decQty(id, value);
	};

	return { addToCart, incQty, decQty };
}
