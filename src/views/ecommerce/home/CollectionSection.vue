<template>
	<section class="wrapper">
		<SectionTitle title="Selling like hotcakes!" />
		<div
			class="grid w-full grid-cols-2 gap-2 font-xnarrow md:grid-cols-4 md:gap-8 md:px-0"
		>
			<OurProduct
				v-for="ourProduct in products"
				:key="ourProduct.text"
				:ourProduct="ourProduct"
			/>
		</div>
	</section>
</template>

<script setup>
import OurProduct from '@/components/ecommerce/OurProduct.vue';
const props = defineProps(['products']);
</script>

<style lang="scss" scoped></style>
