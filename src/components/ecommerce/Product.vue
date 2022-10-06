<template>
	<div class="relative rounded-lg border p-5 text-left shadow">
		<span
			class="absolute top-5 -left-5 z-10 rounded-md bg-[#FEC126] px-5 py-2 font-bold text-white"
			>SALE!</span
		>
		<div class="group relative">
			<a href="#">
				<img src="../../assets/sample_product.webp" alt="" />
			</a>

			<button
				class="absolute bottom-0 hidden w-full bg-black/75 py-1 text-sm font-bold uppercase text-white group-hover:block"
				@click="$emit('openModal')"
			>
				Quick View
			</button>
		</div>

		<div class="mt-2">
			<h4 class="font-bold">USB Electric Heated Hand Pillow</h4>
			<h5 class="font-mono text-2xl">₱45.00</h5>
			<p class="my-2 text-sm font-bold text-green-600">
				In stock, 33 units
			</p>
			<button
				class="w-full rounded-lg bg-darkBlue px-6 py-2 font-bold text-white"
			>
				Add to Cart
			</button>
		</div>
	</div>
</template>

<script setup></script>
