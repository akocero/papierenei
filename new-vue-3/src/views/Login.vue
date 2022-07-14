<template>
	<div class="bg-slate-100 h-screen pt-16">
		<div class="text-center text-gray-500 mb-8">
			<VueFeather type="box" size="48" class="" />
			<h2 class="text-2xl">EMPEROR</h2>
		</div>
		<div
			class="
				shadow-md
				mx-auto
				bg-white
				rounded-md
				lg:w-1/4
				w-2/3
				overflow-hidden
			"
		>
			<div class="p-6">
				<div class="text-center mb-7 text-gray-500">
					<h2 class="text-xl mb-4">Log in to your account</h2>
				</div>
				<form @submit.prevent="handleSubmit">
					<label class="block mb-4">
						<span class="block mb-1 text-md text-gray-500"
							>Email</span
						>
						<div
							class="
								relative
								flex
								items-center
								text-gray-500
								focus-within:text-gray-600
							"
						>
							<VueFeather
								type="user"
								size="18"
								class="absolute ml-3"
							/>
							<input
								v-model="email"
								type="email"
								placeholder="Email Address"
								class="
									py-2
									px-4
									border
									w-full
									pl-10
									rounded-md
									placeholder-gray-400
									outline-0
								"
							/>
						</div>
					</label>

					<label class="block mb-4">
						<span class="block mb-1 text-md text-gray-500"
							>Passoword</span
						>
						<div
							class="
								relative
								flex
								items-center
								text-gray-500
								focus-within:text-gray-600
							"
						>
							<VueFeather
								type="lock"
								size="18"
								class="absolute ml-3"
							/>
							<input
								v-model="password"
								type="password"
								placeholder="password"
								class="
									py-2
									px-4
									border
									w-full
									pl-10
									rounded-md
									placeholder-gray-400
									outline-0
								"
							/>
						</div>
					</label>
					<input
						type="submit"
						class="
							px-4
							py-2
							rounded-md
							bg-indigo-800
							text-white
							cursor-pointer
							block
							w-full
							mt-5
						"
						value="Log In"
					/>
				</form>
			</div>
			<hr />
			<div class="p-6 text-center text-gray-600">
				New to EMPEROR ? <RouterLink to="/signup">Sign Up</RouterLink>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from '@vue/reactivity';

const email = ref('');
const password = ref('');

const handleSubmit = () => {
	console.log(email.value, password.value);
};
</script>
