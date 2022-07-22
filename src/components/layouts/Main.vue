<template>
	<div class="relative">
		<AlertList :alerts="alerts" />
		<Navbar @toggleSidebar="toggleSidebar" :isSidebarOpen="isSidebarOpen" />
		<div class="flex">
			<Sidebar :isSidebarOpen="isSidebarOpen" />

			<main
				class="w-52 grow px-6 pt-20 duration-300"
				:class="{ 'sm:pl-[16.5rem] 2xl:pl-[17.5rem]': isSidebarOpen }"
			>
				<!-- <Alert /> -->
				<RouterView />
			</main>
		</div>
	</div>
</template>

<script setup>
import Navbar from './Navbar.vue';
import AlertList from '../AlertList.vue';
import Sidebar from './sidebar/Sidebar.vue';
import useAlert from '@/composables/useAlert.js';

import { ref } from 'vue';
const { alerts } = useAlert();
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
	isSidebarOpen.value = !isSidebarOpen.value;
};
</script>

<style></style>
