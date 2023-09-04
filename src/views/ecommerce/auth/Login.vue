<template>
	<div>
		<form action="" class="mt-4">
			<div class="mb-6">
				<Input v-model="form.email" type="email" label="Your Email" />
			</div>
			<div class="mb-6">
				<Input
					v-model="form.password"
					type="password"
					label="Password"
				/>
			</div>
			<div class="mb-2 flex justify-end">
				<button
					type="submit"
					class="w-full rounded bg-indigo-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
				>
					Sign in
				</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { ref } from 'vue';

const form = ref({});
</script>

<style lang="scss" scoped></style>
