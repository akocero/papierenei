<template>
	<section class="wrapper">
		<SectionTitle title="JOIN THE PAPIER RENEI FAM!" />
		<ul class="grid w-full grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
			<li
				v-for="link in socialLinks"
				class="h-48 cursor-pointer overflow-hidden rounded-2xl lg:h-96"
				@click="openSocialAccountModal(link)"
			>
				<img
					:src="link.img"
					alt=""
					class="h-full w-full object-cover"
				/>
			</li>
		</ul>
	</section>
	<Modal
		v-if="activeAccount && isSocialModalOpen"
		:show="true"
		@closeModal="closeSocialAccountModal"
		:backdropClose="false"
		size="xl"
		_class="p-0 rounded-2xl"
	>
		<div class="socia--account flex flex-col lg:flex-row">
			<div class="h-60 lg:h-auto lg:w-[55%]">
				<img
					:src="activeAccount.img"
					alt=""
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="overflow-auto p-5 lg:h-[38rem] lg:w-[45%]">
				<div class="flex items-start">
					<div
						class="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#E50085]"
					>
						<vueFeather
							type="instagram"
							size="21"
							class="text-gray-800"
						/>
					</div>
					<div class="ml-2">
						<span class="block">Instragram User</span>
						<span
							class="-mt-1 block font-mono text-sm text-gray-400"
						>
							{{ activeAccount.postedDate }} ago
						</span>
					</div>
				</div>

				<div
					v-html="activeAccount.body"
					class="text-gray-500 before:prose prose-p:my-4 prose-p:leading-tight prose-a:font-semibold prose-a:text-indigo-700 prose-a:no-underline"
				></div>
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

const activeAccount = ref(null);

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
  August was ✨
</p>

<p>
  Hopefully the rest of the year will also be char 😂
</p>

<p>
  Thank you <a href="@heyitsrenei" class="text-indigo-600">@heyitsrenei</a> for these fab gifts 😍
</p>

<p>
  Hi friends, please do like and follow her and her shop <a href="@papierenei" class="text-indigo-600">@papierenei</a>, much appreciated ~ thank youuu 🌟
</p>

<p>
  <a href="@bearlyarts" class="text-indigo-600">@bearlyarts</a> products ✨
</p>

<p>
  <a href="#crafts" class="text-indigo-600">#crafts</a> <a href="#bearlyarts" class="text-indigo-600">#bearlyarts</a> <a href="#craftglue" class="text-indigo-600">#craftglue</a> <a href="#papierenei" class="text-indigo-600">#papierenei</a> <a href="#gift" class="text-indigo-600">#gift</a>
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

const openSocialAccountModal = (account) => {
	activeAccount.value = account;
	isSocialModalOpen.value = true;
};

const closeSocialAccountModal = (account) => {
	activeAccount.value = null;
	isSocialModalOpen.value = false;
};
</script>

<style scoped>
.social-link {
	color: #4f46e5 !important;
}
</style>
