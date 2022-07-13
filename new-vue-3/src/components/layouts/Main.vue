<template>
	<div class="flex relative">
		<Sidebar />
		<div class="wrapper h-screen w-full">
			<Navbar />

			<main class="p-6 pt-8 pl-20 sm:pl-6">
				<!-- <Alert /> -->
				<RouterView />
			</main>
		</div>
	</div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Alert from '@/components/Alert.vue';
import Sidebar from './Sidebar.vue';
</script>

<style></style>
