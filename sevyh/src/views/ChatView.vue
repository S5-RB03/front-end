<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "@/components/layout/HeaderComponent.vue";
import ChatHistoryComponent from "@/components/chat/ChatHistoryComponent.vue";
import ChatMessageInputComponent from "@/components/chat/ChatMessageInputComponent.vue";

export default defineComponent({
  name: "YourComponent",
  components: {
    HeaderComponent,
    ChatHistoryComponent,
    ChatMessageInputComponent,
  },
  data() {
    return {
      senderId: "5f02ed77-dba5-41ff-ae8b-61d4f9d58d98",
      receiverId: "2eb21682-586c-4fd6-8152-8624f93d7db5",
    };
  },
});
</script>

<template>
  <HeaderComponent />
  <main class="container mt-2">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <ChatHistoryComponent :senderId="senderId" :receiverId="receiverId" />
        <ChatMessageInputComponent />
      </div>
    </div>
  </main>
</template>
