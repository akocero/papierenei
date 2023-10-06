<template>
	<section class="wrapper">
		<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
			<div class="">
				<ClassificationCard :item="class1" />
			</div>
			<div class="">
				<ClassificationCard :item="class2" :is_reverse="true" />
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref } from 'vue';
import ClassificationCard from '@/components/ecommerce/ClassificationCard.vue';

const class1 = ref({
	buttonText: 'Treat yourself today',
	details: 'Your shop for Bearly Art goodies!',
	link: {
		name: 'shop',
		query: { collection: '63f1ec5a523099c6d9fb9281' },
	},
});

const class2 = ref({
	buttonText: 'Check ‘em out',
	details: 'New products for you to purchase!',
	link: {
		name: 'shop',
		query: { collection: '6501cc25bb5a4e46ff3183e2' },
	},
});
</script>

<style lang="scss" scoped></style>
