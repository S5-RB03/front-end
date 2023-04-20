<script lang="ts">
import { defineComponent, ref } from "vue";
import { Message, MessageType } from "../../interfaces/Message";

export default defineComponent({
  name: "MessageInput",
  setup() {
    const messageText = ref("");

    async function sendMessage() {
      if (messageText.value.trim() === "") return;

      const apiUrl = "http://localhost:3001/api/v1/chat/message";

      const messageData: Message = {
        textContent: messageText.value,
        senderId: "9f98b59b-cd36-4243-aad1-6ba3cd6e4fc0", 
        receiverId: "b4e229c4-fa16-492d-8890-a577dca9d6b5",
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
  