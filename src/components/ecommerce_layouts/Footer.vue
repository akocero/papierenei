<template>
	<div
		class="absolute bottom-0 w-full bg-red-300 text-[1rem] font-semibold text-white lg:h-72"
	>
		<div
			class="mx-auto flex max-w-base flex-col px-5 pt-7 md:flex-row 2xl:px-0"
		>
			<div
				class="mb-8 grid w-full grid-cols-12 gap-y-10 text-left md:gap-10"
			>
				<div class="col-span-full md:pr-20 lg:col-span-4">
					<h3 class="text-xl">HEAL THROUGH CUTE ART!</h3>
					<div class="mt-6">
						<p class="mb-5">
							We at Papier Renei strongly believe that all things
							cute and colorful have healing powers!
						</p>
						<p>
							Have questions?
							<router-link
								class="text-red-500 underline"
								:to="{
									name: 'contact',
								}"
							>
								Contact us here
							</router-link>
						</p>
					</div>
				</div>
				<div class="col-span-full text-left sm:col-span-2">
					<h3 class="text-xl">INFORMATION</h3>
					<ul class="mt-6 grow space-y-3">
						<li>
							<router-link :to="{ name: 'about' }">
								About
							</router-link>
						</li>
						<li>
							<router-link :to="{ name: 'contact' }">
								Contact
							</router-link>
						</li>
						<li>
							<router-link :to="{ name: 'faq' }">
								FAQs
							</router-link>
						</li>
						<li>
							<router-link :to="{ name: 'order-tracking' }">
								Order Tracking
							</router-link>
						</li>
					</ul>
				</div>
				<div class="col-span-full sm:col-span-3">
					<h3 class="text-xl">TERMS AND CONDITIONS</h3>
					<ul class="mt-6 grow space-y-3">
						<li>
							<router-link :to="{ name: 'terms' }">
								Terms of Service
							</router-link>
						</li>
						<li>
							<router-link :to="{ name: 'return-refund' }">
								Shop Policy
							</router-link>
						</li>
					</ul>
				</div>
				<div class="col-span-full sm:col-span-3">
					<h3 class="text-xl">LET'S HANG OUT!</h3>
					<ul class="mt-6 flex justify-start space-x-8">
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

		<div class="absolute w-full bg-red-400 text-white lg:bottom-0">
			<div class="max-w-base px-8 lg:mx-auto 2xl:px-0">
				<h4 class="my-3">
					© Papier Renei {{ new Date().getFullYear() }} - All rights
					reserved.
				</h4>
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
