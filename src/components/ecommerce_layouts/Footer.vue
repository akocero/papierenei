<template>
	<div
		class="mt-10 w-full bg-lightBlue-2 text-[1rem] font-semibold text-customDarkBlue"
	>
		<div class="mx-auto flex max-w-screen-2xl flex-col md:flex-row">
			<div
				class="grid w-full grid-cols-1 gap-y-10 py-14 text-center md:grid-cols-12 md:gap-10 md:text-left"
			>
				<div class="col-span-4 md:pr-20">
					<h3 class="text-xl">HEAL THROUGH CUTE ART!</h3>
					<div class="mt-6">
						<p class="mb-5">
							We at Papier Renei strongly believe that all things
							cute and colorful have healing powers!
						</p>
						<p>Have questions? <a href="">Contact us here</a></p>
					</div>
				</div>
				<div class="col-span-2">
					<h3 class="text-xl">INFORMATION</h3>
					<ul class="mt-6 grow space-y-3">
						<li>About</li>
						<li>FAQs</li>
						<li>Shipping and Returns</li>
						<li>Order Tracking</li>
					</ul>
				</div>
				<div class="col-span-3">
					<h3 class="text-xl">TERMS AND CONDITIONS</h3>
					<ul class="mt-6 grow space-y-3">
						<li>Terms of Service</li>
						<li>Privacy Policy</li>
					</ul>
				</div>
				<div class="col-span-3">
					<h3 class="text-xl">LET'S HANG OUT!</h3>
					<ul
						class="mt-6 flex justify-center space-x-8 md:justify-start"
					>
						<li
							class="flex h-12 w-12 items-center justify-center rounded-full bg-darkBlue text-white"
						>
							<vue-feather
								type="facebook"
								size="28"
							></vue-feather>
						</li>
						<li
							class="flex h-12 w-12 items-center justify-center rounded-full bg-darkBlue text-white"
						>
							<vue-feather type="youtube" size="28"></vue-feather>
						</li>
						<li
							class="flex h-12 w-12 items-center justify-center rounded-full bg-darkBlue text-white"
						>
							<vue-feather
								type="instagram"
								size="28"
							></vue-feather>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="bg-lightBlue-3 text-white">
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

<script setup></script>

<style></style>
