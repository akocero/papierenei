<template>
	<Popover v-slot="{ open }" class="relative z-[999]">
		<PopoverButton class="text-indigo-600 focus:outline-none">
			<vue-feather type="user" size="28" class="" stroke-width="1.8" />
		</PopoverButton>

		<transition
			enter-active-class="transition duration-200 ease-out"
			enter-from-class="translate-y-1 opacity-0"
			enter-to-class="translate-y-0 opacity-100"
			leave-active-class="transition duration-150 ease-in"
			leave-from-class="translate-y-0 opacity-100"
			leave-to-class="translate-y-1 opacity-0"
		>
			<PopoverPanel
				class="absolute left-1/2 mt-1 w-screen max-w-[200px] -translate-x-1/2 transform px-4 sm:px-0"
			>
				<div
					class="overflow-hidden rounded-sm bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5"
				>
					<div class="grid">
						<router-link
							:to="{
								name: 'account-details',
							}"
							class="flex items-center rounded-sm px-3 py-1 text-lg font-normal capitalize hover:bg-indigo-100 hover:text-gray-700"
						>
							<vue-feather
								type="user"
								size="20"
								class="mr-3 text-gray-500"
								stroke-width="2"
							/>
							<span>Account</span>
						</router-link>
						<router-link
							:to="{
								name: 'account-orders',
							}"
							class="flex items-center rounded-sm px-3 py-1 text-lg font-normal capitalize hover:bg-indigo-100 hover:text-gray-700"
						>
							<vue-feather
								type="archive"
								size="20"
								class="mr-3 text-gray-500"
								stroke-width="2"
							/>
							<span>Orders</span>
						</router-link>
					</div>
					<div class="bg-gray-100">
						<button
							class="flex w-full items-center rounded-sm px-3 py-1 text-lg font-normal capitalize hover:bg-red-400 hover:text-white"
							@click="EcomAuthStore.logout"
						>
							<vue-feather
								type="log-out"
								size="20"
								class="mr-3"
								stroke-width="2"
							/>
							<span>Logout</span>
						</button>
					</div>
				</div>
			</PopoverPanel>
		</transition>
	</Popover>
</template>

<script setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
import { useEcomAuthStore } from '@/stores/ecom_auth';

const EcomAuthStore = useEcomAuthStore();

defineProps(['user']);
</script>
