<template>
    <div class="d-flex justify-content-center align-items-center pb-5">
      <div class="card text-center w-50" v-if="!loading && !error">
        <div class="card-body">
          <h5 class="card-title">Weather Update</h5>
          <p class="card-text">{{ weatherMessage }}</p>
          <button class="btn btn-primary" @click="fetchWeather">Refresh</button>
        </div>
      </div>
      <div class="spinner-border" role="status" v-else-if="loading">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div class="alert alert-danger" role="alert" v-else>
        Error: {{ error }}
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const loading = ref(true);
  const error = ref<string | null>(null);
  const weatherMessage = ref('');
  
  const fetchWeather = async () => {
    try {
      loading.value = true;
      const response = await fetch('https://5d45apn700.execute-api.eu-central-1.amazonaws.com/default/WeatherUpdate?cityName=London');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      weatherMessage.value = await response.text();
    } catch (err) {
      error.value = (err as Error).message || 'An error occurred';
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(fetchWeather);
  </script>