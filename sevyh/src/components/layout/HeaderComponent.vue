<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    mounted() {
        console.log("Keycloak:", this.$keycloak);
    },
    methods: {
        login() {
            this.$keycloak.login();
        },
        register() {
            this.$keycloak.register();
        },
        logout() {
            this.$keycloak.logout();
        },
    },
  });
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
          <router-link class="nav-link active btn btn-primary" aria-current="page" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/chat" class="nav-link btn btn-primary">Chat</router-link>
        </li>
        <li class="nav-item">
          <button class="btn btn-primary" @click="login" v-if="!$keycloak.authenticated">Login</button>
          <button class="btn btn-primary" @click="register" v-if="!$keycloak.authenticated">Register</button>
          <button class="btn btn-primary" @click="logout" v-if="$keycloak.authenticated">Logout</button>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>