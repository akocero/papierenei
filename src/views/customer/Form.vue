<template>
	<ErrorBar :error="store.error" v-if="store.error && store.error.errors" />
	<Spinner v-if="store.isLoading" />
	<div class="" v-if="store.item">
		<form @submit.prevent="">
			<div class="card grid grid-cols-12 gap-4">
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_firstName"
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
						id="input_lastName"
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
						type="email"
						id="input_email"
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
						id="input_mobileNumber"
						label="Mobile Number"
						v-model="store.item.mobileNumber"
						:error="store.error"
						:errorField="store.error?.errors?.mobileNumber || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
			</div>
			<div class="card grid grid-cols-12 gap-4">
				<div class="col-span-full">
					<span class="font-semibold">Address</span>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_streetAddress"
						label="Street Address"
						v-model="store.item.streetAddress"
						:error="store.error"
						:errorField="store.error?.errors?.streetAddress || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_barangay"
						label="Barangay"
						v-model="store.item.barangay"
						:error="store.error"
						:errorField="store.error?.errors?.barangay || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_city"
						label="City"
						v-model="store.item.city"
						:error="store.error"
						:errorField="store.error?.errors?.city || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>

				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_zipCode"
						label="Zip Code"
						v-model="store.item.zipCode"
						:error="store.error"
						:errorField="store.error?.errors?.zipCode || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>

				<div class="col-span-full md:col-span-6">
					<BaseInput
						id="input_province"
						label="Province"
						v-model="store.item.province"
						:error="store.error"
						:errorField="store.error?.errors?.province || null"
						placeholder="Ex. ABC"
						:required="false"
					/>
				</div>
			</div>
		</form>
	</div>
</template>

<script setup>
const props = defineProps({
	store: Object,
});
</script>
