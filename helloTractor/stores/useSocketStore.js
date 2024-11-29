// store/socket.js
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';
import { useAuth } from '@/composables/useAuth';
import { ref, onMounted, onUnmounted } from 'vue';

export const useSocketStore = defineStore('useSocketStore', () => {
  const socket = ref(null);
  const onlineUsers = ref([]);
  const { authUser } = useAuth();

  onMounted(() => {
    if (authUser.value) {
      socket.value = io('/message', {
        query: {
          userId: authUser.value._id,
        },
      });

      socket.value.on('getOnlineUsers', (users) => {
        onlineUsers.value = users;
      });
    }
  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.close();
      socket.value = null;
    }
  });

  return { socket, onlineUsers };
});