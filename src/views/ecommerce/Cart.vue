<template>
	<div class="mx-auto my-8 max-w-7xl">
		<div class="flex items-baseline justify-between">
			<h2 class="text-4xl font-semibold">Your Cart</h2>
			<router-link to="shop" class="font-semibold underline"
				>Continue Shopping</router-link
			>
		</div>
		<div class="mt-4">
			<table class="mb-5 w-full">
				<thead class="border-b">
					<tr class="text-left">
						<th class="py-2">Product</th>
						<th class="py-2">Quantity</th>
						<th class="py-2 text-right">Total</th>
					</tr>
				</thead>
				<tbody>
					<tr class="border-b py-1">
						<td class="py-2">
							<div>All Around Town Sticker Book $13.95</div>
						</td>
						<td class="py-2">
							<ProductQuantity />
						</td>
						<td class="py-2 text-right">$13.95</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="flex justify-between">
			<div class="flex flex-col">
				<label for="">Order special instructions</label>
				<textarea
					name=""
					id=""
					cols="30"
					rows="3"
					class="border-darkBlue"
				></textarea>
			</div>
			<div class="max-w-xl">
				<div>
					<h4 class="text-right">
						<span class="font-bold">Subtotal</span> $13.95 USD
					</h4>
					<p>Taxes and shipping calculated at checkout</p>
				</div>

				<router-link
					to="check-out"
					class="mt-4 block w-full rounded-lg bg-darkBlue px-6 py-2 text-center text-xl font-semibold text-white"
					>Check Out</router-link
				>
			</div>
		</div>
	</div>
</template>

<script setup>
import ProductQuantity from '../../components/ecommerce/ProductQuantity.vue';
</script>

<style></style>
