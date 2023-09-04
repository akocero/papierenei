<template>
	<Modal
		:show="EcomStore.isAuthModalOpen"
		@closeModal="EcomStore.isAuthModalOpen = false"
		:backdropClose="false"
		size="xs"
	>
		<h2
			class="mt-3 text-center font-nunito text-xl font-bold text-indigo-500"
		>
			{{ isLogin ? 'Sign in to your account' : 'Create your account' }}
		</h2>
		<div v-if="isLogin">
			<Login />
		</div>
		<div v-else>
			<Register />
		</div>

		<div class="mt-5 text-center">
			<p class="" v-if="isLogin">
				Don’t have an account yet?
				<a @click="isLogin = false" href="#" class="text-indigo-600"
					>Sign up</a
				>
			</p>
			<p class="" v-else>
				Already have an account?
				<a @click="isLogin = true" href="#" class="text-indigo-600"
					>login</a
				>
			</p>
		</div>
	</Modal>
</template>

<script setup>
import { ref } from 'vue';
import Login from './Login.vue';
import { useEcomAppStore } from '@/stores/ecom_app';
import Modal from '@/components/ecommerce/Modal.vue';
import Register from './Register.vue';

const EcomStore = useEcomAppStore();
const isLogin = ref(false);
</script>

<style lang="scss" scoped></style>
