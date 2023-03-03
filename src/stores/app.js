import { defineStore } from 'pinia';
import { useLocalStorage } from '@vueuse/core';

export const useAppStore = defineStore({
	id: 'app',
	state: () => ({
		isSidebarOpen: useLocalStorage('sidebar', true),
	}),
	actions: {
		toggleSidebar() {
			this.isSidebarOpen = !this.isSidebarOpen;
		},
	},
});
