<template>
	<div
		:class="[
			'fixed top-0 left-0 z-20 h-14 w-full bg-white px-6 ',
			appStore.isSidebarOpen ? 'sm:pl-[16.5rem] 2xl:pl-[17.5rem]' : '',
		]"
	>
		<div
			class="fixed top-0 left-0 hidden h-14 w-60 bg-main px-4 text-white sm:block 2xl:w-64"
		>
			<div class="flex h-full items-center">
				<vue-feather
					type="shopping-bag"
					size="22"
					class="mr-2"
				></vue-feather>
				<span class="font-comfortaa font-bold">Papierenei</span>
				<a href="#" class="ml-auto" @click="appStore.toggleSidebar">
					<vue-feather
						:type="
							appStore.isSidebarOpen
								? `toggle-right`
								: `toggle-left`
						"
						size="20"
						class="mt-[6px]"
					></vue-feather>
				</a>
			</div>
		</div>
		<div
			class="main-container flex h-full items-center justify-between px-2"
		>
			<div class="hidden sm:block">
				<h2 class="text-lg">{{ title }}</h2>
			</div>
			<a href="#" class="sm:hidden" @click="appStore.toggleSidebar">
				<vue-feather
					:type="
						appStore.isSidebarOpen ? `toggle-right` : `toggle-left`
					"
					size="20"
					class="mt-[6px]"
				></vue-feather>
			</a>
			<div>
				<BaseButton
					v-if="!isLoading"
					_type="link"
					:routeObject="{
						name: discard_route_name,
					}"
					text="Discard"
					color="dark"
					_class="mr-2"
				/>
				<BaseButton
					v-if="!isLoading"
					_type="submit"
					@click="$emit('handleSubmit')"
					text="Save"
					color="green"
				/>
				<BaseButton
					v-if="isLoading"
					text="Saving..."
					color="green"
					:disabled="true"
				/>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useAppStore } from '@/stores/app';
const props = defineProps({
	title: {
		type: String,
		default: 'No Title',
	},
	discard_route_name: {
		type: String,
		default: 'dashboard',
	},
	isLoading: {
		type: Boolean,
		required: true,
	},
});

const appStore = useAppStore();
</script>
