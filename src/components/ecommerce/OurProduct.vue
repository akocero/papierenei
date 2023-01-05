<template>
	<div
		class="relative flex h-80 items-center justify-center overflow-hidden bg-cover bg-center shadow-md"
	>
		<img :src="ourProduct.url" alt="" />
		<a
			href="#"
			class="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-transparent text-transparent transition-all duration-300 hover:bg-darkBlue/60 hover:text-white"
		>
			<div
				class="mx-auto flex flex-col justify-center space-y-5 rounded-lg px-4 py-2 text-4xl font-extrabold"
			>
				<vue-feather
					type="external-link"
					size="32"
					class="mx-auto"
				></vue-feather>
				<span class="">{{ ourProduct.text }}</span>
			</div>
		</a>
	</div>
</template>

<script setup>
const props = defineProps({
	ourProduct: Object,
});
</script>
