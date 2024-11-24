import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useToast } from 'vue-toastification'

const loading = ref(false)
const conversations = ref([])

const toast = useToast()

const getConversations = async () => {
  loading.value = true
  try {
    const { data, error } = await useFetch('/api/users')
    if (error.value) {
      throw new Error(error.value.message)
    }
    conversations.value = data.value
  } catch (error) {
    toast.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getConversations()
})

export default useGetMessages