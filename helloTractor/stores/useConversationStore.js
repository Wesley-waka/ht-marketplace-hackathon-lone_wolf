import { defineStore } from 'pinia';

const useConversationStore = defineStore('useConversationStore', {
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

export default useConversationStore;