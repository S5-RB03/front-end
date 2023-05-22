// main.ts
import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.vue';
import router from './router';

import './assets/main.scss';
import keycloakPlugin from './plugins/keycloak';
import keycloak from './keycloak';
import type { KeycloakInitOptions } from 'keycloak-js';


  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.use(keycloakPlugin);

  keycloak.init({}).then((authenticated) => {
    console.log('Keycloak initialized', authenticated);
    app.mount('#app');
  });