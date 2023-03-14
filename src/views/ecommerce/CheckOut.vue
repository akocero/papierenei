<template>
	<div class="wrapper sm:my-10">
		<div class="grid grid-cols-12 gap-y-10 sm:gap-y-0">
			<div class="order-last col-span-full sm:order-first sm:col-span-7">
				<form class="p-2 sm:p-20" @submit.prevent="handleSumbit">
					<div class="mb-10 grid grid-cols-12 gap-2">
						<h3 class="col-span-full mb-2 text-xl font-semibold">
							Contact Information
						</h3>
						<div class="col-span-6">
							<BaseInput
								id="input_email"
								label="Email"
								v-model="email"
								:error="store.error"
								:errorField="store.error?.errors?.email || null"
								placeholder="Ex. sample@gmail.com"
								type="email"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_contact-number"
								label="Contact Number"
								v-model="contactNumber"
								:error="store.error"
								:errorField="
									store.error?.errors?.contactNumber || null
								"
								placeholder="Ex. 09999999999"
								type="text"
								:required="true"
							/>
						</div>
					</div>
					<div class="mb-4 grid grid-cols-12 gap-2">
						<h3 class="col-span-full text-xl font-semibold">
							Shipping Address
						</h3>
						<div class="col-span-6">
							<BaseInput
								id="input_first_name"
								label="First Name"
								v-model="firstName"
								:error="store.error"
								:errorField="
									store.error?.errors?.firstName || null
								"
								placeholder="Ex. John"
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
							<BaseInput
								id="input_last_name"
								label="Last Name"
								v-model="lastName"
								:error="store.error"
								:errorField="
									store.error?.errors?.lastName || null
								"
								placeholder="Ex. Doe"
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-full">
							<BaseInput
								id="input_street"
								label="Street Address"
								v-model="address.streetAddress"
								:error="store.error"
								:errorField="
									store.error?.errors?.streetAddress || null
								"
								placeholder="Ex. Address"
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-full">
							<BaseInput
								id="input_city"
								label="City"
								v-model="address.city"
								:error="store.error"
								:errorField="store.error?.errors?.city || null"
								placeholder="Ex. "
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-4">
							<BaseInput
								id="input_country"
								label="Country"
								v-model="address.country"
								:error="store.error"
								:errorField="
									store.error?.errors?.country || null
								"
								placeholder="Ex."
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-4">
							<BaseInput
								id="input_state"
								label="State"
								v-model="address.state"
								:error="store.error"
								:errorField="store.error?.errors?.state || null"
								placeholder="Ex."
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-4">
							<BaseInput
								id="input_zipcode"
								label="Zip Code"
								v-model="address.zipCode"
								:error="store.error"
								:errorField="
									store.error?.errors?.zipCode || null
								"
								placeholder="Ex."
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-full mt-4">
							<BaseButton
								_type="submit"
								text="Place Order"
								color="primary"
								_class="w-full sm:w-auto"
								v-if="!store.isLoading"
							/>
							<BaseButton
								v-if="store.isLoading"
								_type="submit"
								text="Loading..."
								color="primary"
								_class="w-full sm:w-auto"
								:disabled="true"
							/>
						</div>
					</div>
				</form>
			</div>
			<div
				class="col-span-full bg-white p-6 shadow-lg sm:col-span-5 sm:p-12"
				v-if="cartStore.list.length > 0"
			>
				<h3 class="col-span-full mb-2 text-xl font-semibold">
					Order Items
				</h3>

				<ul>
					<li class="border-b py-4" v-for="ct in cartStore.list">
						<div class="flex items-center">
							<div
								v-if="
									ct?.images?.length || ct?.coverPhoto?.length
								"
								class="relative h-24 w-24"
							>
								<img
									class="h-full w-full object-cover"
									:src="ct.coverPhoto[0].secure_url"
									alt=""
									v-if="ct.coverPhoto.length"
								/>
								<img
									class="h-full w-full object-cover"
									:src="ct.images[0].secure_url"
									alt=""
									v-else
								/>

								<span
									class="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 font-sans text-white"
								>
									{{ ct.cartQuantity }}
								</span>
							</div>
							<div v-else class="relative h-24 w-24">
								<img
									class="h-full w-full object-cover"
									src="https://via.placeholder.com/400?text=Image+N/A"
									alt=""
								/>
								<span
									class="absolute -top-3 -right-3 flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 font-sans text-white"
								>
									{{ ct.cartQuantity }}
								</span>
							</div>
							<div class="ml-4 font-semibold">
								<label>{{ ct.name }}</label>
							</div>
							<label class="ml-auto font-sans font-semibold"
								>₱{{ numberFormat(ct.cartTotal) }}</label
							>
						</div>
					</li>
					<li class="space-y-2 border-b py-4" v-if="cartStore.list">
						<div class="flex justify-between">
							<label>Subtotal</label>
							<span class="font-sans font-semibold"
								>₱{{ numberFormat(cartStore.subTotal) }}</span
							>
						</div>
						<div class="flex justify-between">
							<label>Shipping</label>
							<span class="font-sans font-semibold"
								>₱{{ numberFormat(shippingDetails.fee) }}</span
							>
						</div>
					</li>
					<li class="space-y-2 border-b py-4">
						<div class="flex justify-between">
							<label class="font-semibold">Total</label>
							<span class="font-sans text-xl font-semibold"
								>₱{{ numberFormat(total) }}</span
							>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/order';
import { useCartStore } from '@/stores/cart';
import useAlert from '../../composables/useAlert';
import useUtils from '@/composables/useUtils';

const store = useOrderStore();
const cartStore = useCartStore();
const router = useRouter();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();
const shippingDetails = ref({
	fee: 149,
});
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const contactNumber = ref('');
const address = ref({
	streetAddress: '',
	city: '',
	state: '',
	zipCode: '',
	country: '',
});
const items = ref([]);

onBeforeMount(async () => {
	if (cartStore.list.length < 1) {
		router.push({
			name: 'shop',
		});

		return;
	}

	// this is for handleSumbit function so you dont need to change the property field name
	items.value = cartStore.list.map((cartItem) => {
		return {
			item_id: cartItem._id,
			name: cartItem.name,
			qty: cartItem.cartQuantity,
			price: cartItem.cartPrice,
			total: cartItem.cartTotal,
		};
	});
});

// const items = computed(() => {
// 	return cartStore.list.map((cartItem) => {
// 		return {
// 			item_id: cartItem._id,
// 			name: cartItem.name,
// 			qty: cartItem.cartQuantity,
// 			price: cartItem.cartPrice,
// 			total: cartItem.cartTotal,
// 		};
// 	});
// });

const total = computed(() => {
	return cartStore.subTotal + shippingDetails.value.fee;
});
const handleSumbit = async () => {
	store.error = null;

	const data = {
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		contactNumber: contactNumber.value,
		country: address.value.country,
		streetAddress: address.value.streetAddress,
		city: address.value.city,
		state: address.value.state,
		zipCode: address.value.zipCode,
		items: items.value,
		shippingDetails: shippingDetails.value,
		subtotal: cartStore.subTotal,
		total: cartStore.subTotal + shippingDetails.value.fee,
		notes: '',
	};

	const res = await store.create(data);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	// sending email
	// @params order id for the email details
	//const emailRes = await store.sendEmailOrderDetails(res.data._id);

	if (store.error) {
		pushAlert('error', store.error.message);
		return;
	}

	// clear the cart after successfully ordered
	cartStore.clearCart(items.value);

	// pushAlert('success', 'Order succesfully!');

	// redirect to order summary
	router.push({
		name: 'order-summary',
		params: { id: res.data._id },
	});
};
</script>
