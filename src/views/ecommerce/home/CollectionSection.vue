<template>
	<div class="wrapper collection--section overflow-hidden">
		<swiper
			:modules="[Navigation]"
			:slides-per-view="4"
			:space-between="36"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
			:breakpoints="{
				'1': {
					slidesPerView: 1,
					spaceBetween: 20,
				},
				'768': {
					slidesPerView: 2,
					spaceBetween: 40,
				},
				'1024': {
					slidesPerView: 4,
					spaceBetween: 50,
				},
			}"
			navigation
		>
			<swiper-slide v-for="category in categories">
				<OurProduct :key="category._id" :ourProduct="category" />
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
import OurProduct from '@/components/ecommerce/OurProduct.vue';

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

const props = defineProps(['categories']);

const onSwiper = (swiper) => {
	// console.log(swiper);
};
const onSlideChange = () => {
	// console.log('slide change');
};
</script>

<style>
.collection--section .swiper-button-next,
.collection--section .swiper-button-prev {
	background-color: white;
	opacity: 70%;
	color: black;
	border-radius: 0.8rem;
	height: 3rem;
	width: 3rem;
}

.swiper-button-prev.swiper-button-disabled,
.swiper-button-next.swiper-button-disabled {
	display: none;
}

.collection--section .swiper-button-next::after,
.collection--section .swiper-button-prev::after {
	font-size: 20px;
	font-weight: 600;
}
</style>
