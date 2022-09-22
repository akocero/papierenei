<template>
	<div class="relative font-comfortaa text-[#05A0B5]">
		<Navbar />
		<main class="">
			<RouterView />
		</main>
		<div>Footer</div>
	</div>
</template>

<script setup>
import Navbar from './Navbar.vue';
</script>

<style></style>
