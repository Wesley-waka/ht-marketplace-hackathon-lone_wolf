import { defineStore } from 'pinia';

export const useConversationStore = defineStore('useConversationStore', {
  state: () => ({
    selectedConversation: null,
    messages: [],
  }),
  actions: {
    setSelectedConversation(selectedConversation) {
      this.selectedConversation = selectedConversation;
    },
    setMessages(messages) {
      this.messages = messages;
    },
  },
});