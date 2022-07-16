<template>
	<li class="relative px-5" v-if="item">
		<router-link
			:to="{ name: item.routeName }"
			exact
			class="nav-item"
			:class="item.active && 'active'"
			@click="toggleSublinks"
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
				v-show="item?.items?.length"
			/>
		</router-link>

		<ul
			class="
				mt-4
				ml-2
				border-l-[1px] border-gray-600
				transition-all
				duration-1000
			"
			:class="
				item?.items?.length && expanded && sidebarExpanded
					? 'block'
					: 'hidden'
			"
		>
			<li v-for="el in item.items" :key="el.text" class="">
				<router-link
					:to="{ name: el.routeName }"
					class="nav-subitem"
					:class="el.active && 'active'"
					>{{ el.text }}</router-link
				>
			</li>
		</ul>
	</li>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
	sidebarExpanded: Boolean,
	item: Object
});

const emit = defineEmits(['openSidebar']);

const expanded = ref(false);

const toggleSublinks = () => {
	expanded.value = expanded.value ? false : true;

	// open sidebar if nav-item is click and sidebar is close
	if (!props.sidebarExpanded) {
		expanded.value = true;
		emit('openSidebar');
	}
};

onMounted(() => {
	// open sublinks if parent/nav-item is active
	setTimeout(() => {
		// i use timeout because it cannot detect immidiately if
		// if the props has a value
		if (props.item.active) {
			expanded.value = true;
		}
	}, 500);
});
</script>

<style>
.route-parent:has(.router-link-exact-active) {
	color: red !important;
}
</style>
