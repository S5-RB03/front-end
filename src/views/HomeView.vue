<script setup lang="ts">
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import UserListComponent from '@/components/users/UserListComponent.vue';

</script>

<template>
  <HeaderComponent />
  <main class="container mt-2">
    <h1>Home</h1>
    <UserListComponent />
  </main>

</template>
