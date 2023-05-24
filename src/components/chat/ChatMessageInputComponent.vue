<script lang="ts">
import { defineComponent, ref } from "vue";
import type { Message } from "../../interfaces/Message";
import { MessageType } from "@/interfaces/Message";

export default defineComponent({
  name: "MessageInput",
  props: {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const messageText = ref("");

    async function sendMessage() {
      if (messageText.value.trim() === "") return;

      const apiUrl = "http://localhost:3001/api/v1/chat/message";

      const messageData: Message = {
        textContent: messageText.value,
        senderId: props.senderId, 
        receiverId: props.receiverId,
        timestamp: new Date().toISOString(),
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

    return { messageText, sendMessage };
  },
});
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
  