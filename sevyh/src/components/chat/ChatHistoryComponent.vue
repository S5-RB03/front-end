<template>
    <div class="chat-history">
      <div class="card">
        <div class="card-header">
          Chat History
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="(message, index) in messages"
            :key="index"
            class="list-group-item"
          >
            <strong>{{ message.user }}:</strong> {{ message.text }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
<script lang="ts">
import { defineComponent } from "vue";

interface Message {
  user: string;
  text: string;
}

export default defineComponent({
  name: "ChatHistory",
  props: {
    messages: {
      type: Array as () => Message[],
      required: true,
    },
  },
});
</script>
  
<style scoped>
  .chat-history {
    max-height: 500px;
    overflow-y: auto;
  }
</style>
  