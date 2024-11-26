import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useToast } from 'vue-toastification'

const loading = ref(false)
const conversations = ref([])

const toast = useToast()

const useGetConversations = async () => {
  loading.value = true
  try {
    const { data, error } = await useCustomFetch('/api/users')
    // api for getting matched users
    if (error.value) {
      throw new Error(error.value.message)
    }
    // conversations.value = data.value
    return { data }
  } catch (error) {
    toast.error(error.message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  useGetConversations()
})

export default useGetConversations