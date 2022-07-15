<template>
	<li class="relative px-5 duration-75" v-if="item">
		<router-link
			:to="{ name: item.routeName ? item.routeName : '' }"
			exact
			class="
				abosolute
				flex
				items-center
				hover:text-indigo-900
				hover:font-semibold
				overflow-hidden
			"
			@click="expanded = !expanded"
		>
			<div class="flex items-center">
				<VueFeather :type="item.icon" size="18" class="mr-3" />
				<a
					href="#"
					v-show="sidebarExpanded"
					class="whitespace-nowrap"
					>{{ item.text }}</a
				>
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
			v-if="item?.items?.length && expanded && sidebarExpanded"
		>
			<li v-for="el in item.items" :key="el.text" class="px-5 py-1">
				<router-link
					:to="{ name: el.routeName ? el.routeName : '' }"
					class="whitespace-nowrap"
					>{{ el.text }}</router-link
				>
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
				<a href="#" class="whitespace-nowrap">Courses</a>
			</li>
		</ul>
	</li>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { watch } from 'vue';

const props = defineProps({
	sidebarExpanded: Boolean,
	item: Object
});

const expanded = ref(false);

const emit = defineEmits(['openSidebar']);

watch(expanded, (expanded, prevExpanded) => {
	if (expanded && props.sidebarExpanded === false) {
		emit('openSidebar');
		console.log('Open Sidebar');
	}
});
</script>

<style></style>
