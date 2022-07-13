<template>
	<div
		class="
			h-screen
			bg-gray-200
			text-slate-600
			duration-75
			fixed
			md:relative
		"
		:class="expanded ? 'w-72 2xl:w-1/6' : 'w-16'"
	>
		<a
			href="#"
			class="
				absolute
				top-[16px]
				right-[-12px]
				bg-slate-800
				text-slate-50
				rounded
				w-6
				h-6
				flex
				items-center
				justify-items-center
				z-10
			"
			v-if="!expanded"
			@click="expanded = !expanded"
		>
			<VueFeather type="chevron-right" size="16" class="ml-[5px]" />
		</a>
		<div class="h-14 bg-gray-300 flex items-center px-5 relative">
			<div class="relative flex items-center w-full">
				<div class="flex items-center">
					<VueFeather type="user" size="18" class="mr-3" />
					<a href="#" v-if="expanded">John Doe</a>
				</div>

				<a
					href="#"
					class="
						ml-auto
						bg-gray-400
						text-gray-200
						flex
						items-center
						justify-center
						w-6
						h-6
						rounded
						hover:bg-slate-800
						hover:text-slate-200
						duration-75
					"
					@click="expanded = !expanded"
					v-if="expanded"
				>
					<VueFeather
						type="chevron-left"
						size="16"
						class="mr-[2px]"
					/>
				</a>
			</div>
		</div>
		<ul class="flex flex-col space-y-4 mt-4 relative">
			<SidebarItem
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

const sidebarRoutes = [
	{
		text: 'Dashboard',
		icon: 'pie-chart',
		items: []
	},
	{
		text: 'Statistics',
		icon: 'bar-chart-2',
		items: []
	},
	{
		text: 'Design',
		icon: 'framer',
		items: [{ text: 'Courses' }, { text: 'Categories' }]
	},
	{
		text: 'Settings',
		icon: 'life-buoy',
		items: [{ text: 'Courses' }, { text: 'Categories' }]
	}
];

const expand = () => {
	expanded.value = !expanded.value;
};
</script>

<style></style>
