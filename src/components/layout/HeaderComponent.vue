// HeaderComponent.vue
<script setup lang="ts">
import { useKeycloakStore } from '@/stores/keycloakStore';
import { ref } from 'vue';

const store = useKeycloakStore();
const keycloakError = ref(store.getKeycloakError);
const keycloakLoading = ref(store.getKeycloakLoading);
const keycloak = ref(store.getKeycloak);

const login = () => {
  if (!keycloakError.value) {
    keycloak.value.login();
  }
};

const register = () => {
  if (!keycloakError.value) {
    keycloak.value.register();
  }
};

const logout = () => {
  keycloak.value.logout();
};
</script>


<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand text-white fw-bold" to="/">Sevyh</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
             <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link btn btn-primary" aria-current="page" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/chat" class="nav-link btn btn-primary">Chat</router-link>
          </li>
          <li class="nav-item" v-if="!keycloakLoading">
            <button class="btn btn-primary" @click="login" :disabled="keycloakError || keycloakLoading" v-if="!$keycloak.authenticated">Login</button>
            <button class="btn btn-primary" @click="register" :disabled="keycloakError || keycloakLoading" v-if="!$keycloak.authenticated">Register</button>
            <button class="btn btn-primary" @click="logout" :disabled="keycloakError || keycloakLoading" v-if="$keycloak.authenticated">Logout</button>
          </li>
          <li class="nav-item ms-5" v-else>
            <div class="spinner-border text-light" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  </template>
  