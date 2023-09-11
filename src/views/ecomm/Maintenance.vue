<template>
	<div
		class="mb-4 rounded bg-white px-6 py-4"
		:class="[
			EcomSettingStore.item.is_maintenance ? 'bg-red-400 text-white' : '',
		]"
	>
		<div class="flex items-center justify-between">
			<h4 class="font-semibold">Maintenance Mode</h4>
			<label
				class="relative inline-flex cursor-pointer items-center"
				for="maint"
			>
				<input
					id="maint"
					type="checkbox"
					class="peer sr-only"
					v-model="EcomSettingStore.item.is_maintenance"
				/>
				<div
					class="peer h-5 w-8 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"
				></div>
			</label>
		</div>
	</div>
</template>

<script setup>
import { useEcommSettingStore } from '@/stores/ecomm_setting';

const EcomSettingStore = useEcommSettingStore();
</script>

<style lang="scss" scoped></style>
