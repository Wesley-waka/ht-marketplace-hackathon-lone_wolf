// plugins/auth.ts
import { useAuthStore } from '../stores/useAuthStore'

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore()

  // Check authentication status on app initialization
  await authStore.checkAuthStatus()

  // Optional: Set up interceptors for global error handling
  const customFetch = useCustomFetch()

  // Global error interceptor
  customFetch.interceptors.response.use(
    (response) => response,
    (error) => {
      // Handle unauthorized errors
      if (error.response?.status === 401) {
        // Logout user and redirect to login
        authStore.logout()
        navigateTo('/login')
      }

      return Promise.reject(error)
    }
  )
})