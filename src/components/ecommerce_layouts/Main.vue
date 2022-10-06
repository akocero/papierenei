<template>
	<div class="relative font-quicksand text-[rgb(5,160,181)]">
		<div class="bg-[#FEC126] p-2 text-center text-xl font-bold text-white">
			BEAR MONTHS SALE HAPPENING NOW - UP TO 30% OFF!
		</div>
		<Navbar />
		<main class="">
			<RouterView />
		</main>
		<Footer />
	</div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Footer from './Footer.vue';
</script>

<style></style>
