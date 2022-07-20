<template>
	<div class="relative">
		<Navbar @toggleSidebar="toggleSidebar" :isSidebarOpen="isSidebarOpen" />
		<div class="flex">
			<Sidebar :isSidebarOpen="isSidebarOpen" />

			<main
				class="w-48 grow p-6 pt-8 duration-300"
				:class="{ 'lg:pl-[17.5rem]': isSidebarOpen }"
			>
				<!-- <Alert /> -->
				<RouterView />
			</main>
		</div>
	</div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import Alert from '@/components/Alert.vue';
import Sidebar from './sidebar/Sidebar.vue';
import Sidebar2 from './Sidebar2.vue';
import { ref } from 'vue';

const isSidebarOpen = ref(true);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style></style>
