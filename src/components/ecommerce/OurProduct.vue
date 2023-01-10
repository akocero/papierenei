<template>
	<div
		class="group relative flex h-80 items-center justify-center overflow-hidden bg-cover bg-center shadow-md"
	>
		<img
			:src="ourProduct.img"
			alt=""
			class="transition-all duration-1000 group-hover:scale-125"
		/>
		<a
			href="#"
			class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-darkBlue/60 text-white transition-all duration-300"
		>
			<div
				class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-5xl font-extrabold"
			>
				<span class="">{{ ourProduct.text }}</span>
			</div>
		</a>
	</div>
</template>

<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
	ourProduct: Object,
});
</script>
