<template>
	<div
		class="sidebar text-md fixed z-10 w-64 bg-gray-800 text-gray-400 duration-300"
		:class="isSidebarOpen ? 'visible left-0' : 'invisible -left-64'"
	>
		<ul class="relative flex flex-col">
			<SidebarItem
				v-for="sidebarRoute in sidebarRoutes"
				:key="sidebarRoute.text"
				:item="sidebarRoute"
			/>
		</ul>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import SidebarItem from './SidebarItem.vue';

const props = defineProps({
	isSidebarOpen: Boolean,
});

const expanded = ref(true);

const route = useRoute();

const sidebarRoutes = ref([
	{
		text: 'Dashboard',
		routeName: 'dashboard',
		isRoute: true,
		icon: 'pie-chart',
		active: false,
		items: [],
	},
	{
		text: 'Sales',
		routeName: '',
		icon: 'shopping-bag',
		isRoute: false,
		active: false,
		items: [
			{ text: 'Invoices', routeName: 'sales.invoices', active: false },
			{ text: 'Customers', routeName: 'sales.customers', active: false },
			{ text: 'Date', routeName: 'sales.customers', active: false },
		],
	},
	{
		text: 'Warehouse',
		routeName: '',
		icon: 'home',
		isRoute: false,
		active: false,
		items: [
			{
				text: 'Inventory',
				routeName: 'warehouse.inventory',
				active: false,
			},
		],
	},
]);

onMounted(() => {
	generateActiveRoute(route.name);
});

const generateActiveRoute = (routeName) => {
	sidebarRoutes.value = sidebarRoutes.value.map((sidebarRoute) => {
		if (sidebarRoute.routeName === routeName) {
			sidebarRoute.active = true;
		} else {
			sidebarRoute.active = false;
			if (sidebarRoute?.items?.length) {
				sidebarRoute.items.map((sidebarSublink) => {
					if (sidebarSublink.routeName === routeName) {
						sidebarRoute.active = true;
						sidebarSublink.active = true;
					} else {
						sidebarSublink.active = false;
					}

					return sidebarSublink;
				});
			}
		}

		return sidebarRoute;
	});
};

watch(
	() => route.name,
	() => {
		generateActiveRoute(route.name);
	},
);
</script>

<style></style>
