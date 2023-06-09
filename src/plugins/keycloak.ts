// src/plugins/keycloak.ts
import type { App } from 'vue';
import keycloak from '@/keycloak';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $keycloak: typeof keycloak;
  }
}

const keycloakPlugin = {
  install: (app: App) => {
    app.config.globalProperties.$keycloak = keycloak;
  },
};

export default keycloakPlugin;