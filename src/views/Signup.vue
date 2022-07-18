<script setup></script>

<template>
	<div class="bg-slate-100 h-screen pt-48">
		<div class="mx-auto w-11/12 rounded-md bg-white p-6 shadow-sm md:w-1/3">
			<h2 class="mb-4 text-2xl">Enter you details</h2>
			<form>
				<label class="mb-3 block">
					<span class="mb-1 block">Name</span>
					<input
						type="text"
						placeholder="Email Address"
						class="w-full rounded-md border py-2 px-4"
					/>
				</label>
				<label class="mb-3 block">
					<span class="mb-1 block">Email</span>
					<input
						type="text"
						placeholder="Email Address"
						class="w-full rounded-md border py-2 px-4"
					/>
				</label>
				<label class="mb-3 block">
					<span class="mb-1 block">Passowrd</span>
					<input
						type="text"
						placeholder="Password"
						class="w-full rounded-md border py-2 px-4"
					/>
				</label>

				<label class="mb-3" for="gender">Gender</label>
				<select class="w-full rounded-md" id="gender">
					<option value=""></option>
					<option value="">Male</option>
					<option value="">Female</option>
				</select>

				<button class="bg-slate-800 text-cyan-100 rounded-md px-4 py-2">
					Sign Up
				</button>
			</form>
		</div>
	</div>
</template>
