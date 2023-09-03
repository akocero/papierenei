/**
 * * This is a Setup Type of Store
 *
 */

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import useAlert from '@/composables/useAlert';
import { useProductStore } from '@/stores/product';
import { useLocalStorage } from '@vueuse/core';

export const useShopPageStore = defineStore('shop-page', () => {
	const filteredProducts = computed(() => {});
	const sortedByOptions = {
		best_selling: {
			qry: '&sort=-soldCount',
			text: 'Best Selling',
		},
		low_to_high: {
			qry: '&sort=unitCost',
			text: 'Price, low to high',
		},
		high_to_low: {
			qry: '&sort=-unitCost',
			text: 'Price, high to low',
		},
		old_to_new: {
			qry: '&sort=createdAt',
			text: 'Date, old to new',
		},
		new_to_old: {
			qry: '&sort=-createdAt',
			text: 'Date, new to old',
		},
	};

	const handleFilterBySearch = () => {
		qrySearch.value = `&name[regex]=${searchText.value}`;

		filterProducts();
	};

	const handleFilterByPriceRange = () => {
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

	const handleFilterByDropDown = (val) => {
		qrySelectedSortedBy.value = sortedByOptions[val].qry;

		filterProducts();
	};

	const handleFilterReset = (str) => {
		if (str === 'filter') {
			selectedTag.value = null;
			qrySelectedTag.value = '';
			console.log('filters');
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

		console.log('Filter Products', query.value);

		if (!qryFilterBy.value) {
			query.value = '?' + query.value.slice(1);
		}

		await productStore.fetch(query.value);
	};

	const testFuc = () => {
		console.log('testFuc');
	};

	return { testFuc };
});
