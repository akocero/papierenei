<template>
	<div
		class="
			h-screen
			bg-indigo-100
			text-indigo-900
			fixed
			md:relative
			duration-200
		"
		:class="expanded ? 'w-72 2xl:w-1/6' : 'w-16'"
	>
		<a
			href="#"
			class="
				absolute
				top-[16px]
				right-[-12px]
				bg-indigo-800
				text-indigo-50
				rounded
				w-6
				h-6
				flex
				items-center
				justify-items-center
				z-10
			"
			v-if="!expanded"
			@click="openSidebar"
		>
			<VueFeather type="chevron-right" size="16" class="ml-[5px]" />
		</a>
		<div class="h-14 bg-indigo-300 flex items-center px-5 relative">
			<div class="relative flex items-center w-full">
				<div class="flex items-center font-semibold">
					<VueFeather type="box" size="20" class="mr-3" />
					<a href="#" v-if="expanded" class="whitespace-nowrap"
						>Company Name</a
					>
				</div>

				<a
					href="#"
					class="
						ml-auto
						bg-indigo-500
						text-indigo-200
						flex
						items-center
						justify-center
						w-6
						h-6
						rounded
						hover:bg-indigo-800
						hover:text-indigo-200
						duration-75
					"
					@click="closeSidebar"
					v-if="expanded"
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
import SidebarItem from './SidebarItem.vue';

const expanded = ref(true);

const openSidebar = () => {
	expanded.value = true;
};

const closeSidebar = () => {
	expanded.value = false;
};

const sidebarRoutes = [
	{
		text: 'Dashboard',
		routeName: 'dashboard',
		icon: 'pie-chart',
		items: []
	},
	{
		text: 'Inventory',
		routeName: '',
		icon: 'archive',
		items: []
	},
	{
		text: 'Sales',
		routeName: 'sales',
		icon: 'shopping-bag',
		items: [
			{ text: 'Invoices', routeName: 'invoices' },
			{ text: 'Customers', routeName: 'customers' }
		]
	},
	{
		text: 'Purchases',
		routeName: '',
		icon: 'shopping-cart',
		items: [{ text: 'Courses' }, { text: 'Categories' }]
	},
	{
		text: 'HR',
		routeName: '',
		icon: 'users',
		items: [{ text: 'Courses' }, { text: 'Categories' }]
	},
	{
		text: 'Banking',
		routeName: '',
		icon: 'credit-card'
	},
	{
		text: 'Reports',
		routeName: '',
		icon: 'bar-chart-2',
		items: [{ text: 'Courses' }, { text: 'Categories' }]
	},
	{
		text: 'Apps',
		routeName: '',
		icon: 'smartphone'
	}
];
</script>

<style></style>
