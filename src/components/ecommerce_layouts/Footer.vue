<template>
	<div class="w-full bg-lightBlue-2 py-6 font-bold">
		<div class="mx-auto flex max-w-screen-2xl flex-col md:flex-row">
			<div class="flex grow flex-col">
				<div>
					<img
						src="../../assets/logo-t.png"
						alt=""
						class="mx-auto w-72 md:mx-0"
					/>
				</div>
				<ul class="flex justify-center space-x-8 md:justify-start">
					<li
						class="flex h-12 w-12 items-center justify-center rounded-full bg-darkBlue/60 text-white"
					>
						<vue-feather type="facebook" size="28"></vue-feather>
					</li>
					<li
						class="flex h-12 w-12 items-center justify-center rounded-full bg-darkBlue/60 text-white"
					>
						<vue-feather type="youtube" size="28"></vue-feather>
					</li>
					<li
						class="flex h-12 w-12 items-center justify-center rounded-full bg-darkBlue/60 text-white"
					>
						<vue-feather type="instagram" size="28"></vue-feather>
					</li>
					<li
						class="flex h-12 w-12 items-center justify-center rounded-full bg-darkBlue/60 text-white"
					>
						<vue-feather type="linkedin" size="28"></vue-feather>
					</li>
				</ul>
			</div>
			<div class="mt-10 hidden grow text-xl md:flex">
				<ul class="grow space-y-4">
					<li>Collections</li>
					<li>Crafts</li>
					<li>Shop</li>
					<li>Paper</li>
					<li>About</li>
				</ul>
				<ul class="grow space-y-4">
					<li>New Arrivals</li>
					<li>Products</li>
					<li>Crafts</li>
					<li>Stationery</li>
				</ul>
			</div>
		</div>
		<div class="mx-4 h-4 pt-4 md:mx-auto md:max-w-screen-2xl">
			<hr class="border-[1px] border-darkBlue/25" />
		</div>

		<div
			class="mx-4 flex flex-col items-center md:mx-auto md:max-w-screen-2xl md:flex-row md:justify-between"
		>
			<h4 class="my-3">© 2022 Papier Renei. All rights reserved.</h4>
			<ul
				class="my-3 flex flex-col items-center md:flex-row md:space-x-6"
			>
				<li>Privacy Policy</li>
				<li>Terms of Service</li>
			</ul>
		</div>
	</div>
</template>

<script setup></script>

<style></style>
