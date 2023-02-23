<template>
	<li class="relative" v-if="item">
		<router-link
			:to="item.routeObject"
			exact
			class="nav-item"
			:class="{ active: item.active }"
			:target="item.newTab ? '_blank' : ''"
			@click="toggleSublinks"
		>
			<div class="flex items-center">
				<VueFeather :type="item.icon" size="18" class="mr-4" />
				<span class="whitespace-nowrap">{{ item.text }}</span>
			</div>

			<VueFeather
				type="chevron-right"
				size="18"
				class="ml-auto duration-200"
				:class="expanded ? 'rotate-90' : ''"
				v-show="item?.items?.length"
			/>
		</router-link>

		<ul v-if="item?.items?.length" :class="expanded ? 'block' : 'hidden'">
			<li v-for="el in item.items" :key="el.text" class="my-[2px]">
				<router-link
					:to="el.routeObject"
					class="nav-subitem"
					:class="el.active && 'active'"
				>
					<VueFeather type="circle" size="16" class="mr-4" />
					<span>{{ el.text }} </span>
				</router-link>
			</li>
		</ul>
	</li>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
	item: Object,
});

const expanded = ref(false);

const toggleSublinks = () => {
	expanded.value = expanded.value ? false : true;
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

<style></style>
