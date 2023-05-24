import Keycloak from 'keycloak-js';
import type { KeycloakConfig } from 'keycloak-js';

const keycloakConfig: KeycloakConfig ={
  url: 'http://localhost:8080/auth',
  realm: 'SevyhAuth',
  clientId: 'front-end-client',
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
