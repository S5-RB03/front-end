<script setup lang="ts">
import getEnvironmentVariable from '../../../env';
import { ref } from "vue";
import type { Message } from "../../interfaces/Message";
import { MessageType } from "@/interfaces/Message";
import { defineProps } from 'vue'

const apiUrl = getEnvironmentVariable('VITE_CHATSERVICE_URL') as string + "/v1/chat/message";

const props = defineProps({
  senderId: {
    type: String,
    required: true,
  },
  receiverId: {
    type: String,
    required: true,
  },
})

const messageText = ref("");

async function sendMessage() {
  if (messageText.value.trim() === "") return;

  const messageId = `${props.senderId}-${new Date().toISOString()}-${Math.random().toString(36).substring(2)}`

  const messageData: Message = {
    id: messageId,
    textContent: messageText.value,
    senderId: props.senderId,
    receiverId: props.receiverId,
    messageType: MessageType.TEXT,
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    if (response.ok) {
      messageText.value = "";
    } else {
      console.error("Failed to send message:", await response.text());
    }
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
</script>


<template>
    <div class="message-input">
      <form @submit.prevent="sendMessage">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Type your message..."
            v-model="messageText"
          />
          <button type="submit" class="btn btn-primary">Send</button>
        </div>
      </form>
    </div>
  </template>
  
  
<style scoped>
  .message-input {
    margin-top: 1rem;
  }
</style>
  