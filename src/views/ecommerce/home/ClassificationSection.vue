<template>
	<section class="wrapper">
		<div class="grid grid-cols-12 md:gap-8">
			<div class="col-span-6">
				<ClassificationCard />
			</div>
			<div class="col-span-6">
				<ClassificationCard :is_reverse="true" />
			</div>
		</div>
	</section>
</template>

<script setup>
import ClassificationCard from '@/components/ecommerce/ClassificationCard.vue';
</script>

<style lang="scss" scoped></style>
