<template>
	<div class="wrapper">
		<SectionTitle title="Checkout" size="md" />
		<div class="grid grid-cols-12 gap-y-10 sm:gap-y-0">
			<div
				class="order-last col-span-full sm:order-first sm:col-span-7"
				v-if="EcomAuthStore.user"
			>
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
								:disabled="true"
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
					<div class="mb-10 grid grid-cols-12 gap-2">
						<h3 class="col-span-full mb-2 text-xl font-semibold">
							Mode of Payment
						</h3>
						<div class="col-span-6">
							<BaseSelect
								id="input_payment-method"
								label="Payment"
								v-model="paymentMethod"
								:error="store.error"
								:errorField="
									store.error?.errors?.paymentMethod || null
								"
								:options="[
									{
										value: 'GCash',
										label: 'GCash',
									},
									{
										value: 'BPI Family Savings',
										label: 'BPI Family Savings',
									},
								]"
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
								_class="capitalize"
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
								_class="capitalize"
								:error="store.error"
								:errorField="
									store.error?.errors?.lastName || null
								"
								placeholder="Ex. Doe"
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
							<BaseSelect
								id="input_status"
								label="Shipping to"
								v-model="selectedShipping"
								:error="store.error"
								:errorField="
									store.error?.errors[
										'shippingDetails.fee'
									] || null
								"
								:options="shippingOps"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
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
						<div class="col-span-6">
							<BaseInput
								id="input_barangay"
								label="Barangay"
								v-model="address.barangay"
								:error="store.error"
								:errorField="
									store.error?.errors?.barangay || null
								"
								placeholder="Ex."
								type="text"
								:required="true"
							/>
						</div>
						<div class="col-span-6">
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
						<!-- <div class="col-span-6">
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
						</div> -->

						<div class="col-span-6">
							<BaseInput
								id="input_province"
								label="Province"
								v-model="address.province"
								:error="store.error"
								:errorField="
									store.error?.errors?.province || null
								"
								placeholder="Ex."
								type="text"
							/>
						</div>
						<div class="col-span-6">
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
						<h3 class="col-span-full mt-8 text-xl font-semibold">
							Order Instructions
						</h3>
						<div class="col-span-full">
							<BaseInput
								id="input_notes"
								label="Instructions"
								v-model="notes"
								:error="store.error"
								:errorField="store.error?.errors?.notes || null"
								placeholder="Ex."
								type="text"
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
								<label class="capitalize">{{ ct.name }}</label>
							</div>
							<label class="ml-auto font-sans font-semibold">
								₱{{ numberFormat(ct.cartTotal) }}
							</label>
						</div>
					</li>
					<li v-if="discount.valid" class="mt-1">
						<div
							class="relative flex h-10 items-center rounded border border-green-400 bg-green-400/70 px-4 font-bold text-white"
						>
							<VueFeather
								type="tag"
								size="18"
								class="mr-2"
								stroke-width="2"
							/>
							<span
								class=""
								v-if="discount.discountKind === 'percent'"
								>{{ discount.code }} -
								{{ discount.discountValue }}% OFF</span
							>
							<span class="" v-else
								>{{ discount.code }} - ₱{{
									numberFormat(discount.discountValue)
								}}
								OFF</span
							>
							<button
								class="absolute right-2"
								@click="discount = {}"
							>
								<VueFeather
									type="x"
									size="20"
									class="mt-2"
									stroke-width="3"
								/>
							</button>
						</div>
					</li>
					<li
						class="grid grid-cols-12 items-start gap-2"
						v-if="!discount.valid"
					>
						<div class="col-span-9">
							<BaseInput
								id="input_zipcode"
								v-model="discount.code"
								:error="discount.error"
								:errorField="discount.error?.message || null"
								placeholder="Ex."
								type="text"
							/>
						</div>

						<button
							@click="applyDiscount"
							:disabled="
								!discount.code || discountStore.isLoading
							"
							class="col-span-3 mt-1 h-11 rounded bg-red-400 font-semibold text-white disabled:bg-gray-400"
						>
							Apply
						</button>
					</li>
					<li class="space-y-2 border-b py-4" v-if="cartStore.list">
						<div class="flex justify-between">
							<label>Subtotal</label>
							<span class="font-sans font-semibold">
								₱ {{ numberFormat(cartStore.subTotal) }}
							</span>
						</div>
						<div class="flex justify-between" v-if="shippingTotal">
							<label>Shipping</label>
							<span class="font-sans font-semibold">
								₱ {{ numberFormat(shippingTotal) }}
							</span>
						</div>
						<div class="flex justify-between" v-if="discountTotal">
							<label>Discount</label>
							<span class="font-sans font-semibold">
								-₱ {{ numberFormat(discountTotal) }}
							</span>
						</div>
					</li>
					<li class="space-y-2 border-b py-4">
						<div class="flex justify-between">
							<label class="font-semibold">Total</label>
							<span class="font-sans text-xl font-semibold">
								₱{{ numberFormat(total) }}
							</span>
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
import { useEcomAuthStore } from '@/stores/ecom_auth';
import { useCartStore } from '@/stores/cart';
import { useDiscountStore } from '@/stores/discount';
import useAlert from '../../composables/useAlert';
import useUtils from '@/composables/useUtils';

const store = useOrderStore();
const cartStore = useCartStore();
const discountStore = useDiscountStore();
const EcomAuthStore = useEcomAuthStore();

const router = useRouter();
const { pushAlert } = useAlert();
const { numberFormat } = useUtils();

const discount = ref({
	code: '',
	error: null,
	valid: false,
	discountKind: '',
	discountValue: 0,
});
const shippingDetails = ref(null);
const selectedShipping = ref(null);

const shippingOps = [
	{
		label: 'NCR',
		value: 'ncr',
		price: 149,
	},
	{
		label: 'Luzon',
		value: 'luzon',
		price: 199,
	},
	{
		label: 'Visayas',
		value: 'visayas',
		price: 249,
	},
	{
		label: 'Mindanao',
		value: 'mindanao',
		price: 299,
	},
];

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const notes = ref('');
const contactNumber = ref('');
const paymentMethod = ref('');
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

	if (EcomAuthStore.user) {
		const user = EcomAuthStore.user;
		firstName.value = user.firstName;
		lastName.value = user.lastName;
		email.value = user.email;
		contactNumber.value = user.mobileNumber;
		address.value = {
			streetAddress: user.streetAddress,
			city: user.city,
			state: user.state,
			zipCode: user.zipCode,
			barangay: user.barangay,
			province: user.province,
		};
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

const total = computed(() => {
	let total = 0;
	total =
		parseFloat(cartStore.subTotal) -
		parseFloat(discountTotal.value) +
		parseFloat(shippingTotal.value);

	return total;
});

const shippingTotal = computed(() => {
	if (selectedShipping.value) {
		console.log(selectedShipping.value);
		const _shipping = shippingOps.find(
			(prd) => prd.value == selectedShipping.value,
		);

		return _shipping.price;
	}

	return 0;
});

const discountTotal = computed(() => {
	if (discount.value.valid) {
		if (discount.value.discountKind === 'amount') {
			if (discount.value.discountValue > cartStore.subTotal) {
				return cartStore.subTotal;
			}

			return discount.value.discountValue;
		}

		const _percent = parseFloat(discount.value.discountValue) / 100;
		return parseFloat(cartStore.subTotal * _percent);
	}

	return 0;
});

const applyDiscount = async () => {
	discount.value.error = null;
	const res = await discountStore.getDiscount(discount.value.code);

	if (discountStore.error) {
		discount.value.error = { message: 'Enter a valid discount code' };
		return;
	}

	discount.value.valid = true;
	discount.value = { ...discount.value, ...res.data };

	console.log(discount.value);
};

const handleSumbit = async () => {
	store.error = null;

	const _shippingDetails = shippingOps.find(
		(sh) => sh.value === selectedShipping.value,
	);

	const data = {
		firstName: firstName.value,
		lastName: lastName.value,
		email: email.value,
		contactNumber: contactNumber.value,
		paymentMethod: paymentMethod.value,
		province: address.value.province,
		barangay: address.value.barangay,
		streetAddress: address.value.streetAddress,
		city: address.value.city,
		zipCode: address.value.zipCode,
		items: items.value,
		subtotal: cartStore.subTotal,
		total: total.value,
		notes: notes.value,
	};

	if (discount.value.valid) {
		data.discount = {
			...discount.value,
			discountTotal: discountTotal.value,
		};
	}

	if (_shippingDetails) {
		data.shippingDetails = {
			fee: _shippingDetails.price,
			place: _shippingDetails.value,
		};
	}

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
