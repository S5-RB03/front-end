// keycloakStore.ts
import { defineStore } from 'pinia';
import keycloak from '@/keycloak';

export const useKeycloakStore = defineStore({
  id: 'keycloak',
  state: () => ({
    keycloakError: false,
    keycloakLoading: false,
    keycloak: keycloak,
  }),
  getters: {
    getKeycloakError: (state) => state.keycloakError,
    getKeycloakLoading: (state) => state.keycloakLoading,
    getKeycloak: (state) => state.keycloak,
  },
  actions: {
    setKeycloakError(value: boolean) {
      this.keycloakError = value;
    },
    setKeycloakLoading(value: boolean) {
      this.keycloakLoading = value;
    },
  },
});
