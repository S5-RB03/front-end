import Keycloak from 'keycloak-js';
import type { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig ={
  url: import.meta.env.VITE_KEYCLOAK_URL as string,
  realm: 'SevyhAuth',
  clientId: 'front-end-client',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
