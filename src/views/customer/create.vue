<template>
	<div class="card">
		<div class="mb-4 flex items-baseline justify-between">
			<h4 class="text-xl">New Customer</h4>
			<BaseButton text="Save" />
		</div>
		<form action="">
			<div class="grid grid-cols-6 gap-4">
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstname"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseTextArea
						id="notes"
						label="Notes"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. "
						:required="false"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstname"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseSelect
						id="invoiceFor"
						label="Invoice for"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.invoiceFor || null"
						:options="[]"
						optionLabel="firstName"
						optionValue="_id"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstname"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstname"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-2">
					<BaseInput
						id="input_firstname"
						label="First Name"
						v-model="firstName"
						:error="error"
						:errorField="error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
import BaseButton from '@/components/BaseButton.vue';
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseTextArea from '@/components/BaseTextArea.vue';
import { ref } from 'vue';

const firstName = ref('');
const error = null;
</script>

<style></style>
