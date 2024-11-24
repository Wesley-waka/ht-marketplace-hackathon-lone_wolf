import { ref, onMounted, watch } from 'vue'
import { useConversation } from '../zustand/useConversation'
import { useToast } from 'vue-toastification'

const useGetMessages = () => {
  const loading = ref(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const toast = useToast()

  const getMessages = async () => {
    loading.value = true
    try {
      const res = await fetch(`/api/messages/${selectedConversation.value._id}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setMessages(data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    if (selectedConversation.value?._id) getMessages()
  })

  watch(() => selectedConversation.value?._id, (newId) => {
    if (newId) getMessages()
  })

  return { messages, loading }
}

export default useGetMessages