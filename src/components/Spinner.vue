<template>
	<div
		class="fixed top-0 left-0 z-40 flex h-screen w-full items-center justify-center bg-gray-900/40"
	>
		<div class="spin z-50"></div>
	</div>
</template>

<style>
.spin {
	display: block;
	width: 62px;
	height: 62px;
	margin: 30px auto;
	border: 8px solid rgb(218, 218, 218);
	border-radius: 50%;
	border-top-color: #1c344c;
	animation: spin 1.1s ease infinite;
}
@keyframes spin {
	to {
		-webkit-transform: rotateZ(360deg);
	}
}
</style>
