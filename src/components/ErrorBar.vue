<template>
	<div
		v-if="error && error.errors"
		class="mb-4 flex rounded border border-red-300 bg-[#FFF4F4] px-5 py-4 text-black"
	>
		<VueFeather
			type="alert-circle"
			size="22"
			class="mt-1 mr-3 text-red-500"
		/>
		<div>
			<h3 class="font-semibold">There is error with this product:</h3>
			<ul class="list-disc pl-5">
				<li v-for="(err, index) in error.errors" :key="index">
					{{ err }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	error: Object,
});
</script>
