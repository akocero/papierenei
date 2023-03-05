<template>
	<div class="mt-2 flex" v-if="!store.isLoading && !store.error">
		<h5 class="hidden text-sm text-gray-500 sm:block">
			Showing {{ store.response.from }} to {{ store.response.to }} of
			{{ store.response.total }} results
		</h5>
		<div class="ml-auto space-x-2">
			<button
				class="disabled:border-slate-200 hidden rounded border py-1 px-3 hover:border-gray-700 hover:bg-gray-700 hover:text-white disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none sm:inline-block"
				@click="$emit('paginate', 1)"
				:disabled="store.response._paginate.current_page === 1"
			>
				First
			</button>
			<button
				:disabled="
					!store.response._paginate.previous_page ||
					store.list.length <= 0
				"
				class="disabled:border-slate-200 rounded border py-1 px-3 hover:border-gray-700 hover:bg-gray-700 hover:text-white disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
				@click="
					$emit('paginate', store.response._paginate.previous_page)
				"
			>
				Prev
			</button>
			<button
				:disabled="!store.response._paginate.next_page"
				class="disabled:border-slate-200 rounded border py-1 px-3 hover:border-gray-700 hover:bg-gray-700 hover:text-white disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none"
				@click="$emit('paginate', store.response._paginate.next_page)"
			>
				Next
			</button>
			<button
				class="disabled:border-slate-200 hidden rounded border py-1 px-3 hover:border-gray-700 hover:bg-gray-700 hover:text-white disabled:border-0 disabled:bg-gray-200 disabled:text-gray-500 disabled:shadow-none sm:inline-block"
				@click="$emit('paginate', store.response._paginate.last_page)"
				:disabled="
					store.response._paginate.current_page ===
						store.response._paginate.last_page ||
					store.list.length <= 0
				"
			>
				Last
			</button>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	store: Object,
});

// const paginate = async (page) => {
// 	// let search = '';
// 	// if (searchString.value) {
// 	// 	search = `${searchType.value}[regex]=${searchString.value}&`;
// 	// }
// 	await props.store.fetch(`?${search}page=${page}&limit=5`);
// };
</script>
