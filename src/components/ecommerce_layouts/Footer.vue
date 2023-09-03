<template>
	<div class="mt-10 w-full bg-red-300 text-[1rem] font-semibold text-white">
		<div class="wrapper flex flex-col md:flex-row">
			<div
				class="grid w-full grid-cols-12 gap-y-10 py-14 text-left md:gap-10"
			>
				<div class="col-span-4 hidden sm:block md:pr-20">
					<h3 class="text-xl">HEAL THROUGH CUTE ART!</h3>
					<div class="mt-6">
						<p class="mb-5">
							We at Papier Renei strongly believe that all things
							cute and colorful have healing powers!
						</p>
						<p>Have questions? <a href="">Contact us here</a></p>
					</div>
				</div>
				<div class="col-span-6 text-center sm:col-span-2 sm:text-left">
					<h3 class="text-xl">INFORMATION</h3>
					<ul class="mt-6 grow space-y-3">
						<li>
							<router-link :to="{ name: 'about' }">
								About
							</router-link>
						</li>
						<li>
							<router-link :to="{ name: 'order-tracking' }">
								Order Tracking
							</router-link>
						</li>
					</ul>
				</div>
				<div class="col-span-6 text-center sm:col-span-3 sm:text-left">
					<h3 class="text-xl">TERMS AND CONDITIONS</h3>
					<ul class="mt-6 grow space-y-3">
						<li>
							<router-link :to="{ name: 'terms' }">
								Terms of Service
							</router-link>
						</li>
						<li>
							<router-link :to="{ name: 'return-refund' }">
								Return and Refund Policy
							</router-link>
						</li>
					</ul>
				</div>
				<div class="col-span-full sm:col-span-3">
					<h3 class="text-center text-xl sm:text-left">
						LET'S HANG OUT!
					</h3>
					<ul
						class="mt-6 flex justify-center space-x-8 md:justify-start"
					>
						<li class="" v-for="link in links" :key="link.icon">
							<a
								:href="link.link"
								target="_blank"
								rel="noopener noreferrer"
								class="flex h-12 w-12 items-center justify-center rounded-full bg-red-400 text-white"
							>
								<vue-feather
									:type="link.icon"
									size="28"
								></vue-feather>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="bg-red-400 text-white">
			<div
				class="mx-4 flex flex-col items-center md:mx-auto md:max-w-screen-2xl md:flex-row md:justify-between"
			>
				<h4 class="my-3">
					© Papier Renei {{ new Date().getFullYear() }} - All rights
					reserved.
				</h4>
				<!-- <ul
					class="my-3 flex flex-col items-center md:flex-row md:space-x-6"
				>
					<li>Privacy Policy</li>
					<li>Terms of Service</li>
				</ul> -->
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const links = ref([
	{
		icon: 'facebook',
		link: 'https://facebook.com/papierenei',
	},
	{
		icon: 'youtube',
		link: 'https://www.youtube.com/@papierenei',
	},
	{
		icon: 'instagram',
		link: 'https://instagram.com/papierenei',
	},
]);
</script>
