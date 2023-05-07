<template>
    <div>
      <button @click="login">Login</button>
      <button @click="register">Register</button>
      <button @click="logout" v-if="$keycloak.authenticated">Logout</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
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