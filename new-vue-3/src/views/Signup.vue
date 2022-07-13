<script setup></script>

<template>
	<div class="bg-slate-100 h-screen pt-48">
		<div class="shadow-sm p-6 mx-auto bg-white rounded-md w-11/12 md:w-1/3">
			<h2 class="text-2xl mb-4">Enter you details</h2>
			<form>
				<label class="block mb-3">
					<span class="block mb-1">Name</span>
					<input
						type="text"
						placeholder="Email Address"
						class="py-2 px-4 border w-full rounded-md"
					/>
				</label>
				<label class="block mb-3">
					<span class="block mb-1">Email</span>
					<input
						type="text"
						placeholder="Email Address"
						class="py-2 px-4 border w-full rounded-md"
					/>
				</label>
				<label class="block mb-3">
					<span class="block mb-1">Passowrd</span>
					<input
						type="text"
						placeholder="Password"
						class="py-2 px-4 border w-full rounded-md"
					/>
				</label>
				<button class="px-4 py-2 rounded-md bg-slate-800 text-cyan-100">
					Sign Up
				</button>
			</form>
		</div>
	</div>
</template>
