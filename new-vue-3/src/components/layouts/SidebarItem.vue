<template>
	<li class="relative px-5 duration-75">
		<a
			href="#"
			class="
				abosolute
				flex
				items-center
				hover:text-gray-800
				hover:font-semibold
			"
			@click="expanded = !expanded"
		>
			<div class="flex items-center">
				<VueFeather :type="item.icon" size="18" class="mr-3" />
				<a href="#" v-if="sidebarExpanded">{{ item.text }}</a>
			</div>

			<VueFeather
				type="chevron-left"
				size="18"
				class="ml-auto duration-75"
				:class="expanded ? 'rotate-[-90deg]' : ''"
				v-if="item?.items?.length"
			/>
		</a>

		<ul
			class="mt-4 ml-2 border-l-2 border-gray-300 pl-5 duration-75"
			v-if="expanded && sidebarExpanded && item.items.length"
		>
			<!-- <li
				class="
					px-3
					py-2
					bg-gray-300
					rounded
					font-semibold
					text-slate-800
				"
			>
				Courses
			</li> -->
			<li v-for="el in item.items" :key="el.text" class="px-3 py-2">
				<a href="#">{{ el.text }}</a>
			</li>
		</ul>
	</li>
</template>

<script setup>
import { ref } from '@vue/reactivity';

const props = defineProps({
	sidebarExpanded: Boolean,
	item: Object
});

const expanded = ref(false);
</script>

<style></style>
