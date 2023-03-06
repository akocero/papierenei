<template>
	<ErrorBar :error="store.error" v-if="store.error && store.error.errors" />
	<div
		class="main-container mb-4 flex w-full flex-col items-start gap-x-5 sm:flex-row"
	>
		<div class="w-full sm:w-[64%]">
			<form v-if="store.item && !store.isLoading">
				<Item :store="store" />
				<Payment :store="store" />

				<div class="card grid grid-cols-12 gap-4">
					<div class="col-span-full md:col-span-6">
						<BaseTextArea
							id="input_description"
							label="Order Notes"
							v-model="store.item.notes"
							:error="store.error"
							:errorField="store.error?.errors?.notes || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
				</div>
			</form>
			<Spinner v-else />
		</div>
		<div class="w-full flex-1">
			<DrawerCard title="Order Status" v-if="store.item">
				<BaseSelect
					id="input_order-status"
					v-model="store.item.status"
					:error="store.error"
					:errorField="store.error?.errors?.status || null"
					:options="[
						{
							value: 'pending',
							label: 'Pending',
						},
						{
							value: 'fulfilled',
							label: 'Fulfilled',
						},
					]"
				/>
			</DrawerCard>
			<DrawerCard title="Payment Status" v-if="store.item">
				<BaseSelect
					id="input_order-status"
					v-model="store.item.paymentStatus"
					:error="store.error"
					:errorField="store.error?.errors?.paymentStatus || null"
					:options="[
						{
							value: 'pending',
							label: 'Pending',
						},
						{
							value: 'paid',
							label: 'Paid',
						},
					]"
				/>
			</DrawerCard>
			<div class="card grid grid-cols-12 gap-4" v-if="store.item">
				<div class="col-span-full -mt-3 font-semibold">
					Customer Info.
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="First Name"
						v-model="store.item.firstName"
						:error="store.error"
						:errorField="store.error?.errors?.firstName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Last Name"
						v-model="store.item.lastName"
						:error="store.error"
						:errorField="store.error?.errors?.lastName || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Email"
						v-model="store.item.email"
						:error="store.error"
						:errorField="store.error?.errors?.email || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_name"
						label="Contact Number"
						v-model="store.item.contactNumber"
						:error="store.error"
						:errorField="store.error?.errors?.contactNumber || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
			</div>
			<div class="card grid grid-cols-12 gap-4" v-if="store.item">
				<div class="col-span-full -mt-3 font-semibold">Address</div>
				<div class="col-span-6">
					<BaseInput
						id="input_name"
						label="Country"
						v-model="store.item.country"
						:error="store.error"
						:errorField="store.error?.errors?.country || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>

				<div class="col-span-6">
					<BaseInput
						id="input_name"
						label="State"
						v-model="store.item.state"
						:error="store.error"
						:errorField="store.error?.errors?.state || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>

				<div class="col-span-full">
					<BaseInput
						id="input_name"
						label="Street Address"
						v-model="store.item.streetAddress"
						:error="store.error"
						:errorField="store.error?.errors?.streetAddress || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>

				<div class="col-span-6">
					<BaseInput
						id="input_name"
						label="City"
						v-model="store.item.city"
						:error="store.error"
						:errorField="store.error?.errors?.city || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-6">
					<BaseInput
						id="input_name"
						label="Zip Code"
						v-model="store.item.zipCode"
						:error="store.error"
						:errorField="store.error?.errors?.zipCode || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';
import { onBeforeMount, onMounted, ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProductStore } from '@/stores/product';
import { useOrderStore } from '@/stores/order';
import Form from './Form.vue';

import useUtils from '@/composables/useUtils';
import useAlert from '@/composables/useAlert';
import Payment from './components/Payment.vue';
import Item from './components/Item.vue';

const props = defineProps({
	store: Object,
});

const router = useRouter();
const route = useRoute();
const { pushAlert } = useAlert();
const productStore = useProductStore();
const { numberFormat } = useUtils();
</script>
