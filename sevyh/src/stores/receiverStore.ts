import { defineStore } from 'pinia';

export const useReceiverStore = defineStore({
  id: 'receiver',
  state: () => ({
    receiverId: ''
  }),
  actions: {
    setReceiverId(uuid: string) {
      this.receiverId = uuid;
    }
  }
});
