<template>
	<section class="wrapper">
		<SectionTitle title="JOIN THE PAPIER RENEI FAM!" size="md" />
		<ul class="grid w-full grid-cols-4 gap-x-8">
			<li v-for="link in socialLinks" class="">
				<button
					class="h-72 overflow-hidden rounded-2xl"
					@click="isSocialModalOpen = true"
				>
					<img :src="link.img" alt="" class="" />
				</button>
			</li>
		</ul>
	</section>
	<Modal
		:show="isSocialModalOpen"
		@closeModal="isSocialModalOpen = false"
		:backdropClose="false"
		size="md"
	>
		<div>
			<div>
				<img src="" alt="" />
			</div>
			<div>
				<div>
					<div><img src="" alt="" /></div>
					<div>
						<label for="">Instragram User</label><br />
						<span> 9 months ago </span>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	</Modal>
</template>

<script setup>
import { ref } from 'vue';
import Modal from '@/components/ecommerce/Modal.vue';
import mycat from '@/assets/social_media/mycat.jpg';
import mycat2 from '@/assets/social_media/mycat2.jpg';
import jelacrafts from '@/assets/social_media/jelacrafts.jpg';
import papierrenei from '@/assets/social_media/papierrenei.jpg';

const socialLinks = ref([
	{
		img: mycat2,
		body: `<p>
        Glue I love having but feel bad using 😂 pero iba talaga sya! 😊 Thank you <a href="@papierenei">@papierenei</a> for bringing this to us in Manila! 🥰
        </p>
        `,
		postedDate: '25w',
	},
	{
		img: jelacrafts,
		body: `<p>
        August was ✨<br /><br />
        Hopefully the rest of the year will also be char 😂<br /><br />
        Thank you <a href="@heyitsrenei">@heyitsrenei</a> for these fab gifts 😍<br /><br />
        Hi friends, please do like and follow her and her shop <a href="@papierenei">@papierenei</a>, much appreciated ~ thank youuu 🌟<br /><br />
        <a href="@bearlyarts">@bearlyarts</a> products ✨<br /><br />
        <a href="#crafts">#crafts</a> <a href="#bearlyarts">#bearlyarts</a> <a href="#craftglue">#craftglue</a> <a href="#papierenei">#papierenei</a> <a href="#gift">#gift</a>
        </p>
        `,
		postedDate: '3w',
	},
	{
		img: mycat,
		body: `<p>
            My <a href="@bearlyarts">@bearlyarts</a> glue resist cards from last Saturday’s <a href="@craftcreateandswapclub">@craftcreateandswapclub</a> CPN by <a href="@heyitsrenei">@heyitsrenei</a> ☺️<br /><br />
            Order your Bearly Arts from <a href="@papierenei">@papierenei</a>! 🐻<br /><br />
            </p>`,
		postedDate: '2w',
	},
	{
		img: papierrenei,
		body: `
        <p>
        Blessed Sunday, everyone!!<br /><br />
        Here's a quick look at what we have in store for you!!<br /><br />
        <a href="@bearlyarts">@bearlyarts</a> products - glue in all sizes, washi tapes, colorful cards, and envelopes!!<br /><br />
        To those who preordered via <a href="@thecraftersmarketplacemanila">@thecraftersmarketplacemanila</a> (thank you ladies and gents for supporting!), we will start sending out invoices this week and shipping will start next week.<br /><br />
        We still have remaining stocks, so if you're interested, just hit us up through our <a href="https://www.instagram.com/yourIGpage/">IG page</a>.<br /><br />
        <a href="#bearlyart">#bearlyart</a> <a href="#bearlyarts">#bearlyarts</a> <a href="#bearlyartglue">#bearlyartglue</a> <a href="#papierenei">#papierenei</a><br /><br />
        </p>
        `,
		postedDate: '64w',
	},
]);

const isSocialModalOpen = ref(false);
</script>
