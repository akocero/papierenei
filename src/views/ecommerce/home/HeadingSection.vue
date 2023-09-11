<template>
	<div class="wrapper overflow-hidden">
		<swiper
			:modules="[
				Navigation,
				Pagination,
				Scrollbar,
				A11y,
				Autoplay,
				EffectFade,
			]"
			:slides-per-view="1"
			:space-between="50"
			:autoplay="{
				delay: 5000,
				disableOnInteraction: false,
			}"
			:pagination="{ clickable: true }"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
			effect="fade"
		>
			<swiper-slide v-for="hero in heros">
				<router-link class="relative" :to="hero.link">
					<img
						v-if="hero?.coverPhoto?.length"
						:src="hero.coverPhoto[0].secure_url"
						alt=""
						class="w-full rounded-2xl"
					/>

					<div
						class="h-96 w-full rounded-2xl bg-gray-300"
						v-else
					></div>

					<div class="absolute bottom-14 left-20 top-[50%] w-5/12">
						<h1
							class="mb-6 font-nunito text-6xl font-black capitalize text-white drop-shadow-double"
						>
							{{ hero.title }}
						</h1>
						<ButtonLink :link="hero.link">{{
							hero.buttonText
						}}</ButtonLink>
					</div>
				</router-link>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script setup>
import {
	Navigation,
	Pagination,
	Scrollbar,
	A11y,
	Autoplay,
	EffectFade,
} from 'swiper/modules';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

const props = defineProps(['heros']);

const onSwiper = (swiper) => {
	// console.log(swiper);
};
const onSlideChange = () => {
	// console.log('slide change');
};
</script>
