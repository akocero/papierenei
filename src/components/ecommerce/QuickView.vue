<template>
	<TransitionRoot appear as="template">
		<Dialog as="div" @click="$emit('closeModal')" class="relative z-30">
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0"
			>
				<div class="fixed inset-0 bg-black bg-opacity-25" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-start justify-center p-4 pt-28 text-center"
				>
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95"
					>
						<DialogPanel
							class="w-full max-w-5xl transform rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all"
						>
							<!-- <DialogTitle
								v-if="modalTitle"
								as="h3"
								class="text-lg font-medium leading-6 text-gray-900"
							>
								{{ modalTitle }}
							</DialogTitle> -->
							<button
								class="absolute -top-3 -right-3 h-8 w-8 rounded-lg bg-darkBlue text-white"
								@click="$emit('closeModal')"
							>
								<vue-feather
									type="x"
									size="24"
									class="mt-1"
								></vue-feather>
							</button>
							<slot></slot>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
	DialogTitle,
} from '@headlessui/vue';

const props = defineProps({
	modalTitle: String,
});
</script>

<style></style>
