<template>
	<div class="text-center">
		<router-link
			:to="{
				name: 'shop',
				query: { category: ourProduct._id },
			}"
			class="group relative flex h-40 items-center justify-center overflow-hidden rounded-2xl md:h-96"
		>
			<img
				v-if="ourProduct.coverPhoto.length"
				:src="ourProduct.coverPhoto[0].secure_url"
				alt=""
				class="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
			/>
			<div
				class="flex h-full w-full items-center justify-center bg-gray-300 text-white"
				v-else
			>
				<VueFeather type="image" size="42" class="" />
			</div>
		</router-link>
		<router-link
			:to="{
				name: 'shop',
				query: { category: ourProduct._id },
			}"
			class="mt-4 inline-block font-karla text-xl font-semibold text-red-400 underline underline-offset-2"
		>
			{{ ourProduct.name }}
		</router-link>
	</div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
	ourProduct: Object,
});
</script>
