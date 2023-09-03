<template>
	<div class="relative inline-block text-left">
		<!-- <div class="mb-4 flex justify-between">
			<h3 class="font-semibold">PRICE {{ priceRange }}</h3>
			<button
				type="button "
				class="text-sm font-bold underline"
				@click="$emit('reset')"
			>
				Reset
			</button>
		</div> -->
		<!-- <div class="flex justify-between">
			<h5>
				The highest price is
				<span class="font-sans font-bold">₱{{ highestPrice }} </span>
			</h5>
		</div> -->
		<div
			class="flex h-[3.8rem] min-w-[14rem] justify-between rounded-lg border border-gray-300 text-gray-500"
		>
			<div class="w-[43%]">
				<input
					type="number"
					v-model="priceRange.from"
					placeholder="₱ Min"
					class="h-full w-full rounded-lg border-0 border-gray-300 font-sans focus:ring-0"
				/>
			</div>
			<div class="w-[43%]">
				<input
					type="number"
					v-model="priceRange.to"
					placeholder="₱ Max"
					class="h-full w-full rounded-lg border-0 border-gray-300 font-sans focus:ring-0"
				/>
			</div>
			<div class="w-[14%]">
				<button
					@click="$emit('sortByPriceRange')"
					class="flex h-full w-full items-center justify-center rounded-r-lg border-gray-300 font-semibold text-gray-500 disabled:bg-gray-100 disabled:text-gray-400"
					:disabled="!priceRange.from && !priceRange.to"
				>
					<vue-feather
						type="arrow-right"
						size="18"
						class=""
					></vue-feather>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['highestPrice', 'priceRange']);
</script>
