<template>
	<div class="relative">
		<PrintInvoice :item="invoiceStore.print" />
		<AlertList :alerts="alerts" />
		<Navbar />
		<div class="flex">
			<Sidebar />

			<main
				class="w-52 grow px-6 pt-20 duration-300 print:hidden"
				:class="{
					'print:pl-0 sm:pl-[16.5rem] 2xl:pl-[17.5rem]':
						appStore.isSidebarOpen,
				}"
			>
				<!-- <Alert /> -->
				<RouterView />
			</main>
		</div>
	</div>
</template>

<script setup>
import axios from '../../config/axios-config';
import Navbar from './Navbar.vue';
import AlertList from '../AlertList.vue';
import Sidebar from './sidebar/Sidebar.vue';
import useAlert from '@/composables/useAlert.js';
import { useInvoiceStore } from '@/stores/invoice';
import { useAppStore } from '@/stores/app';
import { useAuthStore } from '@/stores/auth';
import { onBeforeMount, ref } from 'vue';
import PrintInvoice from '../print_templates/PrintInvoice.vue';

const { alerts } = useAlert();

const invoiceStore = useInvoiceStore();
const authStore = useAuthStore();
const appStore = useAppStore();

onBeforeMount(async () => {
	await authStore.me();
});
</script>

<style></style>
