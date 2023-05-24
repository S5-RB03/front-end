<script setup lang="ts">
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import ChatHistoryComponent from "@/components/chat/ChatHistoryComponent.vue";
import ChatMessageInputComponent from "@/components/chat/ChatMessageInputComponent.vue";
import keycloak from '@/keycloak'
import { useReceiverStore } from '@/stores/receiverStore';
import { watchEffect, ref } from 'vue';

const receiverStore = useReceiverStore();
const receiverId = ref<string>(receiverStore.receiverId);
const senderId = ref<string>(keycloak.subject || "")

watchEffect(() => {
  // If Keycloak's authentication state changes, update the sender ID.
  if (keycloak.authenticated) {
    senderId.value = keycloak.tokenParsed?.sub || '';
    console.log('senderId.value:', senderId.value);
  } else {
    senderId.value = '';
  }
});

</script>

<template>
  <HeaderComponent />
  <main class="container mt-2">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <ChatHistoryComponent :senderId="senderId" :receiverId="receiverId" />
        <ChatMessageInputComponent :senderId="senderId" :receiverId="receiverId"/>
      </div>
    </div>
  </main>
</template>
