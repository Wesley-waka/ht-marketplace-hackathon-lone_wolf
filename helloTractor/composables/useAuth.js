// composables/useAuth.ts
import { useAuthStore } from '~/stores/authStore'

// export const useAuth = () => {
//   const authStore = useAuthStore()

//   // Login method
//   const login = async (credentials) => {
//     try {
//       await authStore.login(credentials)

//       // Redirect to dashboard or previous page
//       const router = useRouter()
//       router.push('/dashboard')
//     } catch (error) {
//       // Error handling is managed by the store
//       console.error('Login failed', error)
//     }
//   }

//   // Signup method
//   const signup = async (userData) => {
//     try {
//       await authStore.signup(userData)

//       // Redirect to dashboard or previous page
//       const router = useRouter()
//       router.push('/dashboard')
//     } catch (error) {
//       console.error('Signup failed', error)
//     }
//   }

//   // Logout method
//   const logout = async () => {
//     try {
//       await authStore.logout()
//     } catch (error) {
//       console.error('Logout failed', error)
//     }
//   }

//   // Return store state and methods
//   return {
//     // State
//     user: computed(() => authStore.currentUser),
//     isAuthenticated: computed(() => authStore.isLoggedIn),
//     loading: computed(() => authStore.loading),
//     error: computed(() => authStore.error),

//     // Methods
//     login,
//     signup,
//     logout,
//     checkAuthStatus: () => authStore.checkAuthStatus()
//   }
// }
export const useAuth = () => {
  const authStore = useAuthStore()

  const login = async (credentials) => {
    try {
      await authStore.login(credentials)
      const router = useRouter()
      router.push('/dashboard')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  const signup = async (userData) => {
    try {
      await authStore.signup(userData)
      const router = useRouter()
      router.push('/dashboard')
    } catch (error) {
      console.error('Signup failed', error)
    }
  }

  const logout = async () => {
    try {
      await authStore.logout()
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  return {
    user: computed(() => authStore.currentUser),
    isAuthenticated: computed(() => authStore.isLoggedIn),
    loading: computed(() => authStore.loading),
    error: computed(() => authStore.error),
    login,
    signup,
    logout,
    checkAuthStatus: () => authStore.checkAuthStatus()
  }
}