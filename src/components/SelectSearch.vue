<template>
	<Menu as="div" class="relative ml-auto inline-block text-left">
		<div>
			<MenuButton class="justify-cente flex w-full items-center">
				<span>John Doe</span>
				<vue-feather
					type="chevron-down"
					size="18"
					class="ml-2"
				></vue-feather>
			</MenuButton>
		</div>

		<transition
			enter-active-class="transition duration-100 ease-out"
			enter-from-class="transform scale-95 opacity-0"
			enter-to-class="transform scale-100 opacity-100"
			leave-active-class="transition duration-75 ease-in"
			leave-from-class="transform scale-100 opacity-100"
			leave-to-class="transform scale-95 opacity-0"
		>
			<MenuItems
				class="absolute right-0 mt-3 w-56 origin-top-right divide-y divide-gray-200 overflow-hidden rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<div class="">
					<MenuItem v-slot="{ active }">
						<button
							:class="[
								active
									? 'bg-indigo-500 text-white'
									: 'text-gray-900',
								'group flex w-full items-center space-x-3 px-4 py-2',
							]"
						>
							<vue-feather
								type="user"
								size="16"
								class=""
							></vue-feather>
							<span>Manage Account</span>
						</button>
					</MenuItem>
				</div>
				<div class="">
					<MenuItem v-slot="{ active }">
						<button
							:class="[
								active
									? 'bg-indigo-500 text-white'
									: 'text-gray-900',
								'group flex w-full items-center space-x-3 px-4 py-2',
							]"
						>
							<vue-feather
								type="lock"
								size="16"
								class=""
							></vue-feather>
							<span>Security</span>
						</button>
					</MenuItem>
					<MenuItem v-slot="{ active }">
						<button
							:class="[
								active
									? 'bg-indigo-500 text-white'
									: 'text-gray-900',
								'group flex w-full items-center space-x-3 px-4 py-2',
							]"
						>
							<vue-feather
								type="settings"
								size="16"
								class=""
							></vue-feather>
							<span>Settings</span>
						</button>
					</MenuItem>
				</div>

				<div class="">
					<MenuItem v-slot="{ active }">
						<button
							:class="[
								active
									? 'bg-red-400 text-white'
									: 'text-gray-900',
								'group flex w-full items-center space-x-3 px-4 py-2',
							]"
						>
							<vue-feather
								type="log-out"
								size="16"
								class=""
							></vue-feather>
							<span>Log-out</span>
						</button>
					</MenuItem>
				</div>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
</script>
