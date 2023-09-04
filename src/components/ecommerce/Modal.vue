<template>
	<TransitionRoot appear as="template">
		<Dialog as="div" @click="handleCloseModal" class="relative z-30">
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
					class="flex min-h-full items-start justify-center p-4 text-center 2xl:pt-32"
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
							class="w-full transform overflow-hidden rounded-sm bg-white p-6 text-left align-middle shadow-xl transition-all"
							:class="modalSize[size]"
						>
							<DialogTitle
								v-if="modalTitle"
								as="h3"
								class="text-lg font-medium leading-6 text-gray-900"
							>
								{{ modalTitle }}
							</DialogTitle>

							<button
								class="absolute right-3 top-3"
								@click="$emit('closeModal')"
							>
								<vueFeather type="x" size="18" class="" />
							</button>
							<slot></slot>
							<!-- <div class="mt-2">
								<p class="text-sm text-gray-500">
									Your payment has been successfully
									submitted. We’ve sent you an email with all
									of the details of your order.
								</p>
							</div>

							<div class="mt-4">
								<button
									type="button"
									class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
									@click="$emit('closeModal')"
								>
									Got it, thanks!
								</button>
							</div> -->
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import {
	TransitionRoot,
	TransitionChild,
	Dialog,
	DialogPanel,
	DialogTitle,
} from '@headlessui/vue';

const props = defineProps({
	modalTitle: String,
	backdropClose: {
		type: Boolean,
		default: true,
	},
	size: {
		type: String,
		default: 'xl',
		validator(value) {
			// note: modify this validator base on modalSize value
			return ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].includes(value);
		},
	},
});

const modalSize = ref({
	xs: 'max-w-md',
	sm: 'max-w-xl',
	md: 'max-w-2xl',
	lg: 'max-w-3xl',
	xl: 'max-w-4xl',
	xxl: 'max-w-5xl',
});

const emit = defineEmits(['closeModal']);

const handleCloseModal = () => {
	if (props.backdropClose) {
		emit('closeModal');
	}
	return;
};
</script>

<style></style>
