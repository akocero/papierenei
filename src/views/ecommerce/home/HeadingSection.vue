<template>
	<div class="wrapper mt-0 overflow-hidden px-0 lg:mt-8 lg:px-4">
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
						class="w-full lg:rounded-2xl"
					/>

					<div
						class="h-96 w-full bg-gray-300 lg:rounded-2xl"
						v-else
					></div>

					<div
						class="relative top-[50%] z-10 mx-auto -mt-6 flex min-h-[14rem] w-11/12 flex-col justify-center rounded-2xl bg-indigo-300 px-8 text-center lg:absolute lg:bottom-14 lg:left-20 lg:block lg:w-5/12 lg:bg-transparent lg:text-left"
					>
						<h1
							class="mb-6 font-nunito text-4xl font-black capitalize text-white drop-shadow-double lg:text-left lg:text-6xl"
						>
							{{ hero.title }}
						</h1>

						<ButtonLink :link="hero.link" _class="mx-auto">{{
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
