// composables/useSendMessage.js
import { useState } from '#app'
import { useToast } from 'vue-toastification' // You'll need to install this or similar
// import { useConversationStore } from '~/stores/conversation' // Assuming you're using Pinia for state management
import { useCustomFetch } from './useCustomFetch'
import { useConversationStore } from '~/stores/useConversationStore'

export const useSendMessage = () => {
  const loading = ref(false)
  const conversationStore = useConversationStore()

  const sendMessage = async (message) => {
    loading.value = true
    try {
      const { data, error } = await useCustomFetch(`/api/messages/send/${conversationStore.selectedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      })

      if (error.value) throw new Error(error.value.message)
      if (data.value.error) throw new Error(data.value.error)

      // Update messages in store
      conversationStore.setMessages([...conversationStore.messages, data.value])
    } catch (error) {
      $toast.error(error.message)
    } finally {
      loading.value = false
    }
  }

  return {
    sendMessage,
    loading: readonly(loading)
  }
}