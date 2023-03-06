<template>
	<ErrorBar :error="store.error" v-if="store.error && store.error.errors" />
	<div class="flex flex-col items-start gap-6 md:flex-row">
		<div class="card grow">
			<form @submit.prevent="" v-if="store.item && !store.isLoading">
				<div class="grid grid-cols-6 gap-4">
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_name"
							label="Title"
							v-model="store.item.name"
							:error="store.error"
							:errorField="store.error?.errors?.name || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-6">
						<BaseTextArea
							id="input_description"
							label="Description"
							v-model="store.item.description"
							:error="store.error"
							:errorField="
								store.error?.errors?.description || null
							"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
				</div>
			</form>
			<Spinner v-else />
		</div>
		<div class="w-full md:w-[36%]">
			<ImageManager
				:store="store"
				title="Cover Photo"
				db_column="coverPhoto"
				v-if="store.item"
				uploadType="single"
			/>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	store: Object,
});
</script>
