<template>
	<ErrorBar :error="store.error" v-if="store.error && store.error.errors" />
	<div class="">
		<form @submit.prevent="" v-if="store.item && !store.isLoading">
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
						id="input_state"
						label="State"
						v-model="store.item.state"
						:error="store.error"
						:errorField="store.error?.errors?.state || null"
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
			</div>
		</form>
		<Spinner v-else />
	</div>
</template>

<script setup>
const props = defineProps({
	store: Object,
});
</script>
