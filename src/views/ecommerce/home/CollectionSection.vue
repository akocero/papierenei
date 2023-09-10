<template>
	<div class="wrapper overflow-hidden">
		<swiper
			:modules="[Navigation]"
			:slides-per-view="4"
			:space-between="36"
			@swiper="onSwiper"
			@slideChange="onSlideChange"
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
