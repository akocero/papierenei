<template>
	<router-link
		:to="{
			name: 'shop',
			query: { category: ourProduct._id },
		}"
		class="group relative flex h-40 items-center justify-center overflow-hidden shadow-md md:h-80"
	>
		<img
			:src="ourProduct.coverPhoto[0].secure_url"
			alt=""
			class="h-full w-full object-cover transition-all duration-1000 group-hover:scale-125"
		/>
		<a
			href="#"
			class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-darkBlue/60 text-white transition-all duration-300"
		>
			<div
				class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-xl font-extrabold md:text-5xl"
			>
				<span class="uppercase">{{ ourProduct.name }} </span>
			</div>
		</a>
	</router-link>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
	ourProduct: Object,
});
</script>
