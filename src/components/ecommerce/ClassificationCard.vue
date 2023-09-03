<template>
	<div
		class="flex overflow-hidden rounded-2xl bg-indigo-300 text-center"
		:class="is_reverse ? 'flex-col-reverse' : 'flex-col'"
	>
		<div>
			<img src="../../assets/new_logos/classi_img.webp" alt="" />
		</div>
		<div>
			<div class="min-h-[18rem] p-10">
				<p class="text-center text-xl font-bold text-white">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Ullam doloremque quas reprehenderit quasi perspiciatis
					dolores deserunt. Vero ipsa eveniet sunt animi perspiciatis,
					blanditiis officiis numquam! Corrupti dolor laboriosam
					corporis eos.
				</p>
				<button
					class="mt-8 rounded-xl bg-red-400 px-6 py-2 text-lg font-semibold text-white"
				>
					Shop Adhesives
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps(['item', 'is_reverse']);
</script>
