<template>
    <div>
      <div
        :class="[
          'flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer',
          isSelected ? 'bg-sky-500' : '',
        ]"
        @click="setSelectedConversation(conversation)"
      >
        <div :class="['avatar', isOnline ? 'online' : '']">
          <div class="w-12 rounded-full">
            <img :src="conversation.profilePic" alt="user avatar" />
          </div>
        </div>
  
        <div class="flex flex-col flex-1">
          <div class="flex gap-3 justify-between">
            <p class="font-bold text-gray-200">{{ conversation.fullName }}</p>
            
          </div>
        </div>
      </div>
  
      <div v-if="!lastIdx" class="divider my-0 py-0 h-1" />
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
import { useConversationStore } from '~/stores/useConversationStore';

  const props = defineProps({
    conversation: Object,
    lastIdx: Boolean,
  });
  
  const conversationStore = useConversationStore();;
  const { selectedConversation, setSelectedConversation } = conversationStore;
  const { onlineUsers } = useSocket();
  
  const isSelected = computed(() => selectedConversation?._id === props.conversation._id);
  const isOnline = computed(() => onlineUsers.includes(props.conversation._id));
  </script>