// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './assets/main.scss';

import App from '@/App.vue';
import router from './router';

import keycloakPlugin from './plugins/keycloak';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(keycloakPlugin);

import { useKeycloakStore } from '@/stores/keycloakStore';
const store = useKeycloakStore();

app.mount('#app');

store.setKeycloakLoading(true);
store.keycloak.init({}).then((authenticated) => {
  console.log('Keycloak authenticated', authenticated);
  store.setKeycloakLoading(false);
  console.log('keycloak loading', store.getKeycloakLoading);
}).catch((error) => {
  console.log('Keycloak initialization error', error);
  store.setKeycloakError(true);
  store.setKeycloakLoading(false);
});
