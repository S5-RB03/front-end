import Keycloak from 'keycloak-js';
import type { KeycloakConfig } from 'keycloak-js';
import getEnvironmentVariable from '../env';

const keycloakConfig: KeycloakConfig = {
  url: getEnvironmentVariable('VITE_KEYCLOAK_URL') as string,
  realm: 'SevyhAuth',
  clientId: 'front-end-client',
};


const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
