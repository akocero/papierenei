<template>
	<ErrorBar :error="store.error" v-if="store.error && store.error.errors" />
	<Spinner v-if="store.isLoading" />
	<div class="card" v-if="store.item">
		<form @submit.prevent="">
			<div class="grid grid-cols-12 gap-4">
				<div class="col-span-full">
					<BaseInput
						id="code"
						label="Title"
						v-model="store.item.code"
						:error="store.error"
						:errorField="store.error?.errors?.code || null"
						placeholder="Ex. ABC"
						:required="true"
					/>
				</div>
				<div class="col-span-full">
					<BaseSelect
						id="discountKind"
						label="Discount Type"
						v-model="store.item.discountKind"
						:error="store.error"
						:errorField="store.error?.errors?.discountKind || null"
						:options="[
							{
								value: 'percent',
								label: 'Percent',
							},
							{
								value: 'amount',
								label: 'Amount',
							},
						]"
						:required="true"
					/>
				</div>
				<div class="col-span-full">
					<BaseInput
						id="discountValue"
						label="Discount Value"
						v-model="store.item.discountValue"
						:error="store.error"
						:errorField="store.error?.errors?.discountValue || null"
						placeholder="Ex. ABC"
						:required="true"
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
