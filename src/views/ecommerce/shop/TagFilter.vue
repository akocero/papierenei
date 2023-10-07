<template>
	<Menu as="div" class="relative inline-block text-left">
		<div>
			<MenuButton
				class="flex h-[3.8rem] w-full items-center justify-between rounded-lg border border-gray-300 pl-4 pr-3 text-gray-500 lg:min-w-[14rem]"
			>
				<div class="text-left">
					<div class="text-sm text-gray-400">Filter by</div>
					<div class="-mt-1 text-lg" v-if="modelValue">
						{{ selectedTag.name }}
					</div>
					<div class="-mt-1 text-lg" v-else>--</div>
				</div>

				<vue-feather
					type="chevron-down"
					size="21"
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
				class="absolute left-0 z-10 mt-3 w-80 origin-top-right divide-gray-200 overflow-hidden rounded-sm bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
			>
				<MenuItem
					v-slot="{ active }"
					class="last:pb-4"
					v-for="tag in tags"
				>
					<label
						:for="tag._id"
						class="flex translate-y-1 items-center px-6 py-2 hover:bg-gray-100"
					>
						<input
							:id="tag._id"
							type="radio"
							class="mb-1"
							@input="
								$emit('update:modelValue', $event.target.value)
							"
							v-model="modelValue"
							:value="tag._id"
						/>
						<span class="mb-[0.2rem] ml-2 inline-block">{{
							tag.name
						}}</span>
					</label>
				</MenuItem>
			</MenuItems>
		</transition>
	</Menu>
</template>

<script setup>
import { computed } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';

const props = defineProps(['tags', 'modelValue']);

const selectedTag = computed(() => {
	if (props.modelValue && props.tags?.length) {
		return props.tags.find((tag) => tag._id == props.modelValue);
	}
});
</script>

<style lang="scss" scoped></style>
