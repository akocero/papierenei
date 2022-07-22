<template>
	<div
		class="sidebar text-md fixed z-10 h-screen w-56 bg-gray-800 pt-16 text-gray-400 duration-300 sm:w-60 2xl:w-64"
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
		routeObject: { name: 'dashboard' },
		isRoute: true,
		icon: 'pie-chart',
		active: false,
		items: [],
	},
	{
		text: 'Sales',
		routeObject: {},
		icon: 'shopping-bag',
		isRoute: false,
		active: false,
		items: [
			{
				text: 'Invoices',
				routeObject: { name: 'sales.invoices' },
				active: false,
			},
			{
				text: 'Customers',
				routeObject: { name: 'sales.customers' },
				active: false,
			},
			{ text: 'Date', routeObject: {}, active: false },
		],
	},
	{
		text: 'Warehouse',
		routeObject: {},
		icon: 'home',
		isRoute: false,
		active: false,
		items: [
			{
				text: 'Inventory',
				routeObject: { name: 'warehouse.inventory' },
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
		if (sidebarRoute.routeObject.name === routeName) {
			sidebarRoute.active = true;
		} else {
			sidebarRoute.active = false;
			if (sidebarRoute?.items?.length) {
				sidebarRoute.items.map((sidebarSublink) => {
					if (sidebarSublink.routeObject.name === routeName) {
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
