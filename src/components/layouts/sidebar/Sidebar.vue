<template>
	<div
		class="
			h-screen
			bg-[#051E34]
			text-gray-400
			fixed
			z-10
			md:relative
			duration-200
		"
		:class="expanded ? 'w-72 2xl:w-1/6' : 'w-16'"
	>
		<a
			href="#"
			:class="!expanded ? '' : 'hide'"
			class="btn-close-sidebar"
			@click="openSidebar"
		>
			<VueFeather type="chevron-right" size="16" class="ml-[5px]" />
		</a>
		<div class="h-14 bg-[#173755] flex items-center px-5 relative">
			<div class="relative flex items-center w-full">
				<div class="flex items-center font-semibold">
					<VueFeather type="box" size="20" class="mr-3" />
					<a
						href="#"
						:class="expanded ? '' : 'hidden'"
						class="whitespace-nowrap"
						>Company Name</a
					>
				</div>

				<a
					href="#"
					class="btn-open-sidebar"
					@click="closeSidebar"
					:class="expanded ? '' : 'hide'"
				>
					<VueFeather
						type="chevron-left"
						size="18"
						class="mr-[2px]"
					/>
				</a>
			</div>
		</div>
		<ul class="flex flex-col space-y-5 mt-5 relative">
			<SidebarItem
				@openSidebar="openSidebar"
				v-for="sidebarRoute in sidebarRoutes"
				:key="sidebarRoute.text"
				:sidebarExpanded="expanded"
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

const expanded = ref(true);

const openSidebar = () => {
	expanded.value = true;
};

const closeSidebar = () => {
	expanded.value = false;
};

const route = useRoute();

const sidebarRoutes = ref([
	{
		text: 'Dashboard',
		routeName: 'dashboard',
		isRoute: true,
		icon: 'pie-chart',
		active: false,
		items: []
	},
	{
		text: 'Sales',
		routeName: '',
		icon: 'shopping-bag',
		isRoute: false,
		active: false,
		items: [
			{ text: 'Invoices', routeName: 'sales.invoices', active: false },
			{ text: 'Customers', routeName: 'sales.customers', active: false }
		]
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
				active: false
			}
		]
	}
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
	}
);
</script>

<style></style>
