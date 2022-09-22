<template>
	<div class="relative font-comfortaa text-[#05A0B5]">
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
