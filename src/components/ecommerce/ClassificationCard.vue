<template>
	<div
		class="flex overflow-hidden rounded-2xl bg-indigo-300 text-center"
		:class="is_reverse ? 'flex-col-reverse' : 'flex-col'"
	>
		<div>
			<img :src="item.img" alt="" v-if="item.img" />
			<div
				class="flex h-60 items-center justify-center bg-gray-300 lg:h-[32rem]"
				v-else
			>
				<vue-feather
					type="image"
					size="120"
					class="text-white"
				></vue-feather>
			</div>
		</div>
		<div class="">
			<div class="p-10 lg:py-14">
				<p
					class="mb-4 text-center text-xl font-bold text-white lg:mb-10 lg:text-3xl"
				>
					{{ item.details }}
				</p>
				<ButtonLink :link="item.link">
					{{ item.buttonText }}
				</ButtonLink>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['item', 'is_reverse']);
</script>
