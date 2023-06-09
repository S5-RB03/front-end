/// <reference types="vite/client" />
declare global {
  interface Window {
    env: {
      VITE_KEYCLOAK_URL: string;
      VITE_USERSERVICE_URL: string;
      VITE_CHATSERVICE_URL: string;
    };
  }

  var env: {
    VITE_KEYCLOAK_URL: string;
    VITE_USERSERVICE_URL: string;
    VITE_CHATSERVICE_URL: string;
  };
}
