import { createApp } from 'vue';
import { createPinia } from 'pinia';

import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router';
import './assets/index.css';

/* Ecommerce Components */
import SectionTitle from './components/ecommerce/SectionTitle.vue';
import ButtonLink from './components/ecommerce/ButtonLink.vue';
import Input from './components/ecommerce/Input.vue';
import Prose from './components/ecommerce/Prose.vue';

/* Layouts Components */
import DrawerCard from './components/DrawerCard.vue';
import TitleBar from './components/layouts/TitleBar.vue';
import ErrorBar from './components/ErrorBar.vue';
import ActionNavbar from './components/layouts/ActionNavbar.vue';
import Spinner from './components/Spinner.vue';
import Loading from './components/Loading.vue';

/* Base Table Components */
import TableData from './components/TableData.vue';
import TableSearch from './components/TableSearch.vue';
import TablePagination from './components/TablePagination.vue';
import BaseTableActionButton from './components/BaseTableActionButton.vue';

/* Base Fields Components */
import BaseSelect from './components/BaseSelect.vue';
import BaseButton from './components/BaseButton.vue';
import BaseInput from './components/BaseInput.vue';
import BaseTextArea from './components/BaseTextArea.vue';

/* Special Components */
import ImageManager from './components/image_module/ImageManager.vue';
import Badge from './components/Badge.vue';

const app = createApp(App);

app.component(VueFeather.name, VueFeather);

app.component('DrawerCard', DrawerCard);
app.component('Badge', Badge);
app.component('ActionNavbar', ActionNavbar);
app.component('TitleBar', TitleBar);
app.component('ErrorBar', ErrorBar);
app.component('Spinner', Spinner);
app.component('Loading', Loading);
app.component('ImageManager', ImageManager);
app.component('BaseSelect', BaseSelect);
app.component('TableData', TableData);
app.component('TableSearch', TableSearch);
app.component('BaseTableActionButton', BaseTableActionButton);
app.component('TablePagination', TablePagination);
app.component('BaseButton', BaseButton);
app.component('BaseInput', BaseInput);
app.component('BaseTextArea', BaseTextArea);

// ecom
app.component('SectionTitle', SectionTitle);
app.component('ButtonLink', ButtonLink);
app.component('Input', Input);
app.component('Prose', Prose);

app.use(createPinia());
app.use(router);

app.mount('#app');
