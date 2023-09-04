<template>
	<div>
		<form action="" class="mt-4 grid grid-cols-2 gap-x-4">
			<div class="mb-6">
				<Input
					v-model="form.firstName"
					type="email"
					label="First Name"
				/>
			</div>
			<div class="mb-6">
				<Input v-model="form.lastName" type="email" label="Last Name" />
			</div>
			<div class="col-span-full mb-6">
				<Input
					v-model="form.mobileNumber"
					type="email"
					label="Mobile Number"
				/>
			</div>
			<div class="col-span-full mb-6">
				<Input v-model="form.email" type="email" label="Your Email" />
			</div>
			<div class="col-span-full mb-6">
				<Input
					v-model="form.password"
					type="password"
					label="Password"
				/>
			</div>
			<div class="col-span-full mb-6">
				<Input
					v-model="form.passwordConfirm"
					type="password"
					label="Password Cofirm"
				/>
			</div>
			<div class="col-span-full mb-2 flex justify-end">
				<button
					type="submit"
					class="w-full rounded bg-indigo-500 px-5 py-3 text-center text-lg font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
				>
					Register
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
