<template>
	<div id="print-table" v-if="item" class="hidden font-comfortaa print:block">
		<div class="grid grid-cols-6 gap-4">
			<div class="col-span-3">
				<h2 class="mb-2 text-[1.6rem]">Papier Renei</h2>
				<p>
					Blk 16 Lot 5 Phase E1A <br />
					Francisco Homes-Mulawin <br />
					City of San Jose del Monte <br />
					Bulacan, 3023 <br />
					09266151516
				</p>

				<h1 class="mt-6 text-[1.9rem]">Invoice</h1>
				<label class="text-[1.4rem]"
					>Sent on
					{{ moment(Date.now()).format('MM/DD/YYYY') }}
				</label>
			</div>
			<div class="col-span-3">
				<div class="img-container">
					<img src="../../assets/logo.png" alt="" />
				</div>
			</div>
		</div>

		<div class="grid grid-cols-8 gap-4">
			<div class="col-span-3">
				<label class="mt-6 block text-[1.4rem]">Invoice for:</label>
				<p>
					{{ item?.invoiceFor?.name || '' }} <br />
					{{ item?.invoiceFor?.streetAddress || '' }} <br />
					{{ item?.invoiceFor?.state || '' }} <br />
					{{ item?.invoiceFor?.city || '' }} <br />
					{{ item?.invoiceFor?.email || '' }} <br />
					{{ item?.invoiceFor?.mobileNumber || '' }}
				</p>
			</div>
			<div class="col-span-3">
				<label class="mt-6 block text-[1.4rem]">Payable to:</label>
				<p>{{ item.payableTo }}</p>
			</div>
			<div class="col-span-2">
				<label class="mt-6 block text-[1.4rem]">Invoice #:</label>
				<p>{{ item.invoiceNo }}</p>
				<label class="mt-6 block text-[1.4rem]">Due date:</label>
				<p>{{ moment(item.dueDate).format('MM/DD/YYYY') }}</p>
				<label class="mt-6 block text-[1.4rem]">Status:</label>
				<p class="pb-0 uppercase">
					<span
						:class="
							item.status === 'paid'
								? 'text-green-700'
								: item.status === 'unsettled'
								? 'text-custom-warning'
								: 'text-red-700'
						"
						>{{ item.status }}</span
					>
					<br />
					<span v-if="item.status === 'paid'" class="pt-0">
						{{ moment(item.datePaid).format('MM/DD/YYYY') }}
					</span>
					<span v-else class="pt-0">TO BE PAID</span>
				</p>
			</div>
		</div>
		<table class="table-print mt-6 table">
			<thead>
				<tr>
					<th scope="col" style="width: 5%">#</th>
					<th scope="col">Item Name</th>
					<th scope="col" style="width: 20%">Qty</th>
					<th scope="col" style="width: 20%">Unit price</th>
					<th scope="col" style="width: 20%">Total price</th>
				</tr>
			</thead>
			<tbody>
				<tr
					v-for="(itemDetails, index) in item.items"
					:key="itemDetails._id"
				>
					<td>{{ index + 1 }}</td>
					<td>{{ itemDetails.name }}</td>
					<td>{{ itemDetails.qty }}</td>
					<td>₱{{ numberFormat(itemDetails.unitPrice) }}</td>
					<td>
						₱{{
							numberFormat(
								itemDetails.unitPrice * itemDetails.qty,
							)
						}}
					</td>
				</tr>
				<tr>
					<td colspan="3" class="no-bb p-0">&nbsp;</td>
					<td colspan="10" class="p-0">&nbsp;</td>
				</tr>
				<tr>
					<td colspan="3" class="no-bb"></td>
					<td>Subtotal</td>
					<td>₱{{ subtotal }}</td>
				</tr>
				<tr v-if="item.shippingFee">
					<td colspan="3" class="no-bb"></td>
					<td>Shipping Fee</td>
					<td>₱{{ numberFormat(item.shippingFee) }}</td>
				</tr>
				<tr
					v-if="
						item.discount &&
						item.discount.discountKind === 'percent'
					"
				>
					<td colspan="3" class="no-bb"></td>
					<td>Disc Code</td>
					<td>{{ item.discount.code }} ({{ discountPercent }}%)</td>
				</tr>
				<tr
					v-if="
						item.discount && item.discount.discountKind === 'amount'
					"
				>
					<td colspan="3" class="no-bb"></td>
					<td>Disc Code</td>
					<td>{{ item.discount.code }}</td>
				</tr>
				<tr v-if="item.discount">
					<td colspan="3" class="no-bb"></td>
					<td>Discount</td>
					<td class="text-red-700">- ₱ {{ discount }}</td>
				</tr>
				<tr>
					<td colspan="3" class="no-bb"></td>
					<td>Total</td>
					<td>₱{{ computeAll(item) }}</td>
				</tr>
			</tbody>
		</table>
		<div class="">
			<p v-if="!item.notes">Note:</p>
			<p v-if="item.notes">Note: <br />{{ item.notes }}</p>
		</div>
		<p class="mt-6">Mode of Payment:</p>
		<div class="grid grid-cols-6 gap-4">
			<div class="col-span-2">
				<p>GCash</p>
				<p>
					Reneilda D <br />
					0926 615 1516
				</p>
			</div>
			<div class="col-span-4">
				<p>BPI Family Savings</p>
				<p>
					Reneilda de Leon <br />
					2289 3651 87
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
const props = defineProps({
	item: Object,
});

const total = ref(0);
const subtotal = ref(0);
const discount = ref(0);
const discountPercent = ref(0);

const computeAll = (item) => {
	let _subtotal = 0;
	let _total = 0;
	let _discount = 0;
	if (item) {
		item.items.forEach((property) => {
			_subtotal +=
				parseFloat(property.unitPrice) * parseFloat(property.qty);
		});

		_total = _subtotal;
	}

	if (item.shippingFee) {
		_total += parseFloat(item.shippingFee);
	}

	if (item.discount && item.discount.discountKind === 'percent') {
		const _percent = parseFloat(item.discount.discountValue) / 100;
		_discount = parseFloat(_subtotal * _percent);
		_total -= _discount;

		discountPercent.value = _percent * 100;
		discount.value = numberFormat(_discount);
	}

	if (item.discount && item.discount.discountKind === 'amount') {
		_total -= parseFloat(item.discount.discountValue);

		discount.value = numberFormat(parseFloat(item.discount.discountValue));
	}

	subtotal.value = numberFormat(_subtotal);
	total.value = _total;
	console.log(_subtotal);

	return numberFormat(total.value);
};

const numberFormat = (value) => {
	return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
		minimumFractionDigits: 2,
	});
};
</script>

<style scoped>
#print-table {
	color: #6eccff !important;
	padding: 1.6rem;
	font-size: 0.9rem;
}

#print-table p {
	color: #6c6f73 !important;
	margin-bottom: 1rem;
}

#print-table label {
	font-weight: bolder !important;
	font-size: 1.4rem !important;
}
#print-table h1,
#print-table h2 {
	font-weight: 800;
}

#print-table table th {
	color: #6eccff !important;
	font-weight: 700;
}

td.p-0 {
	padding: 0px !important;
}

.img-container {
	position: relative;
	max-width: 16rem !important;
}

.img-container > img {
	position: absolute;
	top: -2rem;
	right: -6rem;
	bottom: 0 !important;
	width: 100%;
}

.table > :not(:first-child) {
	border-top: 0px solid black;
}

.text-custom-warning {
	color: #d49a06 !important;
}
/* 









 */
</style>
