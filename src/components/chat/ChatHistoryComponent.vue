<template>
    <div class="chat-history">
      <div class="card">
        <div class="card-header">
          Chat History
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="(message, index) in chatMessages"
            :key="index"
            class="list-group-item"
          >
            <strong v-text="message.senderId + ':'"></strong> <span v-text="message.textContent"></span>
          </li>

        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from "vue";
  import { defineProps } from 'vue'
  import type { Message } from "@/interfaces/Message";
  import getEnvironmentVariable from '../../../env';
  import CryptoJS from 'crypto-js';

  const props = defineProps({
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 25,
    },
  });

  const chatMessages = ref<Message[]>([]);
  const secretKey = "E2EE";

  async function fetchMessages() {
    const apiUrl = getEnvironmentVariable('VITE_CHATSERVICE_URL') as string + `/v1/chat/message?senderId=${props.senderId}&receiverId=${props.receiverId}&page=${props.page}&pageSize=${props.pageSize}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const jsonResponse = await response.json();

        chatMessages.value = jsonResponse.data.map((message: Message) => {
          const decryptedTextContent = CryptoJS.AES.decrypt(message.textContent, secretKey).toString(CryptoJS.enc.Utf8);

          return {
            id: message.id,
            conversationId: message.conversationId,
            textContent: decryptedTextContent,
            senderId: message.senderId,
            receiverId: message.receiverId,
            messageType: message.messageType,
          };
        });

        console.log("chatMessages.value", chatMessages.value);
      } else {
        console.error("Failed to fetch messages:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }

  onMounted(fetchMessages);
  watch(() => [props.senderId, props.receiverId, props.page, props.pageSize], fetchMessages);
</script>


  
  <style scoped>
  .chat-history {
    max-height: 500px;
    overflow-y: auto;
  }
  </style>
  