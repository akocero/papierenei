import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useEcomAppStore = defineStore({
	id: 'ecom_app',
	state: () => ({
		isAuthModalOpen: false,
	}),
	actions: {
		toggleAuthModal() {
			this.isAuthModalOpen = !this.isAuthModalOpen;
		},
	},
});
