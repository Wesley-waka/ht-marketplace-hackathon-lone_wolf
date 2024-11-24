import { ref } from 'vue';
import { useState } from '#app';
import { useToast } from 'vue-toastification';

const useSendMessage = () => {
  const loading = ref(false);
  const { messages, setMessages, selectedConversation } = useState('conversation', () => ({
    messages: [],
    selectedConversation: null,
  }));
  const toast = useToast();

  const sendMessage = async (message) => {
    loading.value = true;
    try {
      const { data, error } = await useFetch(`/api/messages/send/${selectedConversation.value._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
      if (error) throw new Error(error.message);

      setMessages([...messages.value, data.value]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      loading.value = false;
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;