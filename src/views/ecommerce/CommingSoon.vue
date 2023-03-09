<template>
	<div class="flex h-screen items-center p-32">
		<div class="mx-auto h-full w-full rounded-2xl bg-white p-14 shadow-xl">
			<div class="grid h-full grid-cols-12">
				<div class="col-span-6 flex items-center pr-28">
					<div class="pl-10">
						<h2
							class="mb-6 font-sans text-7xl font-bold uppercase text-yellow-400"
						>
							Comming soon!
						</h2>

						<p class="text-xl text-gray-700">
							The page you're looking for isn't available. Try
							searching again or use the Go Back button below
						</p>

						<button
							class="mt-10 rounded-lg border border-gray-400 px-6 py-2"
							@click="goBack"
						>
							Go back
						</button>
					</div>
				</div>
				<div class="col-span-6 flex h-full items-center justify-center">
					<div class="h-full">
						<img :src="notFoundImg" alt="" class="h-full" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import notFoundImg from '../../assets/404.svg';

const router = useRouter();

const goBack = () => {
	router.go(-1);
};
</script>
