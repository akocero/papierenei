<template>
	<div class="mt-2" v-if="dataArr">
		<span
			v-for="el in dataArr"
			class="mr-2 mb-1 inline-block items-center rounded-full bg-indigo-500 py-[1px] pl-3 pr-2 text-gray-50"
		>
			<div class="flex items-center">
				<span>{{ el }}</span>
				<VueFeather
					type="x"
					size="15"
					class="mt-[1px] ml-1 cursor-pointer"
					stroke-width="3"
					@click="$emit('pop', el)"
				/>
			</div>
		</span>
	</div>
</template>

<script setup>
const props = defineProps({
	dataArr: Object,
});
</script>
