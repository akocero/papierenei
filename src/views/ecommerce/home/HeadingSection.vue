<template>
	<div class="wrapper overflow-hidden rounded-2xl">
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
				delay: 2500,
				disableOnInteraction: false,
			}"
			:pagination="{ clickable: true }"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
			effect="fade"
		>
			<swiper-slide>
				<img
					src="../../../assets/new_logos/slide1.webp"
					alt=""
					class="w-full"
				/>
			</swiper-slide>
			<swiper-slide>
				<img
					src="../../../assets/new_logos/slide2.webp"
					alt=""
					class="w-full"
				/>
			</swiper-slide>
			<swiper-slide>
				<img
					src="../../../assets/new_logos/slide3.webp"
					alt=""
					class="w-full"
				/>
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

const onSwiper = (swiper) => {
	// console.log(swiper);
};
const onSlideChange = () => {
	// console.log('slide change');
};
</script>
