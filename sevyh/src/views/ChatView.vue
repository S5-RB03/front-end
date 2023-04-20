<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import ChatHistoryComponent from "@/components/chat/ChatHistoryComponent.vue";
import ChatMessageInputComponent from "@/components/chat/ChatMessageInputComponent.vue";

interface Message {
  user: string;
  text: string;
}

export default defineComponent({
  name: "YourComponent",
  components: {
    ChatHistoryComponent,
    ChatMessageInputComponent,
    HeaderComponent,
  },
  data() {
    return {
      chatMessages: [
        { user: "User 1", text: "Hello!" },
        { user: "User 2", text: "Hi, how are you?" },
        { user: "User 1", text: "I'm doing well, thank you." },
        { user: "User 2", text: "That's great to hear!" },
      ] as Message[],
    };
  },
});
</script>

<template>
    <HeaderComponent />
    <main class="container mt-2">
    <div class="row">
        <div class="col-md-8 offset-md-2">
        <ChatHistoryComponent :messages="chatMessages" />
        <ChatMessageInputComponent />
        </div>
    </div>
    </main>
</template>