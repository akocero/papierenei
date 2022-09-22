<template>
	<div class="bg-[#D8F4F8] px-12 text-lg font-bold">
		<nav class="flex h-32 items-center justify-between">
			<ul class="flex w-2/5 space-x-8">
				<li>Blog</li>
				<li>Collections</li>
				<li>Crafts</li>
				<li>Paper</li>
				<li>About</li>
			</ul>
			<div class="mx-auto w-1/5 text-center">
				<img
					src="../../assets/logo-t.png"
					alt=""
					class="mx-auto w-36"
				/>
			</div>
			<div class="flex w-2/5 justify-end space-x-8">
				<form>
					<div class="relative">
						<vue-feather
							type="search"
							size="20"
							class="absolute left-3 top-[0.5rem]"
						></vue-feather>
						<input
							type="text"
							class="rounded-full border-0 bg-[#BEEDF3] pl-10 accent-[#05A0B5] placeholder:text-[#05A0B5]"
							placeholder="Search"
						/>
					</div>
				</form>
				<div class="relative flex items-center">
					<div
						class="absolute top-6 left-[7.3px] h-5 bg-red-500 px-[2px] text-base text-white"
					>
						0
					</div>
					<vue-feather type="shopping-bag" size="28"></vue-feather>
				</div>
			</div>
		</nav>
	</div>
</template>

<script setup></script>

<style></style>
