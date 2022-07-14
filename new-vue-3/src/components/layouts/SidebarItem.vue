<template>
	<li class="relative px-5 duration-75" v-if="item">
		<router-link
			:to="{ name: item.routeName }"
			class="
				abosolute
				flex
				items-center
				hover:text-indigo-900
				hover:font-semibold
			"
			@click="expanded = !expanded"
		>
			<div class="flex items-center">
				<VueFeather :type="item.icon" size="18" class="mr-3" />
				<a href="#" v-show="sidebarExpanded">{{ item.text }}</a>
			</div>

			<VueFeather
				type="chevron-left"
				size="18"
				class="ml-auto duration-75"
				:class="expanded ? 'rotate-[-90deg]' : ''"
				v-if="item?.items?.length"
			/>
		</router-link>

		<ul
			class="mt-4 ml-2 border-l-[2px] border-indigo-200 duration-75"
			v-if="expanded && sidebarExpanded && item.items.length"
		>
			<li v-for="el in item.items" :key="el.text" class="px-5 py-1">
				<a href="#">{{ el.text }}</a>
			</li>
			<li
				class="
					px-5
					my-1
					border-l-[2px]
					ml-[-2px]
					border-indigo-800
					text-indigo-800
					font-semibold
				"
			>
				<a href="#">Courses</a>
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
