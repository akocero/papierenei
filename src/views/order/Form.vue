<template>
	<ErrorBar :error="store.error" v-if="store.error && store.error.errors" />
	<div
		class="main-container mb-4 flex w-full flex-col items-start gap-x-5 sm:flex-row"
		v-if="store.item && !store.isLoading"
	>
		<div class="w-full flex-1">
			<DrawerCard title="Order Status" v-if="store.item">
				<div class="mb-2">
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
								value: 'cancelled',
								label: 'Cancelled',
							},
							{
								value: 'confirmed',
								label: 'Confirmed',
							},
							{
								value: 'fulfilled',
								label: 'Fulfilled',
							},
						]"
					/>
				</div>
				<div v-if="store.item.status === 'fulfilled'">
					<BaseInput
						type="date"
						id="input_order-fulfilled-date"
						label="Fulfilled Date"
						v-model="store.item.orderfulfilledDate"
						:error="store.error"
						:errorField="
							store.error?.errors?.orderfulfilledDate || null
						"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
			</DrawerCard>
			<DrawerCard title="Payment Status" v-if="store.item">
				<div class="mb-2">
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
				</div>

				<div>
					<BaseInput
						v-if="store.item.status === 'paid'"
						type="date"
						id="input_order-paid-date"
						label="Order Paid Date"
						v-model="store.item.orderPaidDate"
						:error="store.error"
						:errorField="store.error?.errors?.orderPaidDate || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
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
		<div class="w-full sm:w-[64%]">
			<form>
				<Item :store="store" />
				<Payment :store="store" />

				<div class="card grid grid-cols-12 gap-4">
					<div class="col-span-full -mt-3 font-semibold">
						Shipping Info.
					</div>
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_name"
							type="number"
							label="Shipping Fee"
							v-model="store.item.shippingDetails.fee"
							:error="store.error"
							:errorField="
								store.error?.errors?.shippingDetails.fee || null
							"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
				</div>

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
		</div>
	</div>
	<Spinner v-else />
</template>

<script setup>
import Form from './Form.vue';
import Payment from './components/Payment.vue';
import Item from './components/Item.vue';

const props = defineProps({
	store: Object,
});

const test = (val) => {
	console.log(val);
};
</script>
