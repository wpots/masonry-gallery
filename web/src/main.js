import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import observer from './plugins/intersectionObserver';
// eslint-disable-next-line
createApp(App).use(store).use(router).use(observer).mount('#app');
