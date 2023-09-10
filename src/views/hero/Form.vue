<template>
	<ErrorBar :error="store.error" v-if="store.error && store.error.errors" />
	<Spinner v-if="store.isLoading" />
	<div class="flex flex-col items-start gap-6 md:flex-row" v-if="store.item">
		<div class="card grow">
			<form @submit.prevent="">
				<div class="grid grid-cols-6 gap-4">
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_name"
							label="Title"
							v-model="store.item.title"
							:error="store.error"
							:errorField="store.error?.errors?.title || null"
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
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_link"
							label="Link"
							v-model="store.item.link"
							:error="store.error"
							:errorField="store.error?.errors?.link || null"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
					<div class="col-span-full md:col-span-6">
						<BaseInput
							id="input_button-text"
							label="Button Text"
							v-model="store.item.buttonText"
							:error="store.error"
							:errorField="
								store.error?.errors?.buttonText || null
							"
							placeholder="Ex. ABC"
							:required="true"
						/>
					</div>
				</div>
			</form>
		</div>
		<div class="w-full md:w-[36%]">
			<DrawerCard title="Hero Status" v-if="store.item">
				<BaseSelect
					id="input_status"
					v-model="store.item.isPublished"
					:error="store.error"
					:errorField="store.error?.errors?.isPublished || null"
					:options="[
						{
							value: '1',
							label: 'Published',
						},
						{
							value: '0',
							label: 'Unpublished',
						},
					]"
				/>
			</DrawerCard>
			<ImageManager
				:store="store"
				title="Cover Photo"
				db_column="coverPhoto"
				v-if="store.item"
				uploadType="single"
			/>

			<ImageManager
				:store="store"
				title="Shop Banner"
				db_column="shopBanner"
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
