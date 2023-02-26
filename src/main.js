import { createApp } from 'vue';
import { createPinia } from 'pinia';

import VueFeather from 'vue-feather';
import App from './App.vue';
import router from './router';
import DrawerCard from './components/DrawerCard.vue';
import BaseSelect from './components/BaseSelect.vue';

import './assets/index.css';

const app = createApp(App);
app.component(VueFeather.name, VueFeather);
app.component('DrawerCard', DrawerCard);
app.component('BaseSelect', BaseSelect);
app.use(createPinia());
app.use(router);

app.mount('#app');
