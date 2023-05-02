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
            <strong>{{ message.senderId }}:</strong> {{ message.textContent }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from "vue";
  import { Message } from "@/interfaces/Message";
  
  export default defineComponent({
    name: "ChatHistory",
    props: {
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
    },
    setup(props) {
      const chatMessages = ref<Message[]>([]);
  
      async function fetchMessages() {
        const apiUrl = `http://localhost:3001/api/v1/chat/message?senderId=${props.senderId}&receiverId=${props.receiverId}&page=${props.page}&pageSize=${props.pageSize}`;
        try {
          const response = await fetch(apiUrl);
          if (response.ok) {
            console.log("response", response);
            chatMessages.value = await response.json();
          } else {
            console.error("Failed to fetch messages:", await response.text());
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
  
      onMounted(fetchMessages);
      watch(() => [props.senderId, props.receiverId, props.page, props.pageSize], fetchMessages);
  
      return { chatMessages };
    },
  });
  </script>
  
  <style scoped>
  .chat-history {
    max-height: 500px;
    overflow-y: auto;
  }
  </style>
  