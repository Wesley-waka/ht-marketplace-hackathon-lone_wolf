// stores/authStore.js
import { defineStore } from 'pinia'
import { useCustomFetch } from '../composables/useCustomFetch'

export const useAuthStore = defineStore('auth', {
  // State
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  // Persist state
  persist: {
    storage: persistedState.localStorage,
  },

  // Getters
  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },

  // Actions
  actions: {
    // Login Action
    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        const response = await useCustomFetch('/api/auth/login', {
          method: 'POST',
          body: credentials
        })

        // Handle successful login
        if (response.token && response.user) {
          this.setUser(response.user)
          this.setToken(response.token)
        }

        return response
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Signup Action
    async signup(userData) {
      this.loading = true
      this.error = null

      try {
        const response = await useCustomFetch('/api/auth/signup', {
          method: 'POST',
          body: userData
        })

        // Handle successful signup
        if (response.token && response.user) {
          this.setUser(response.user)
          this.setToken(response.token)
        }

        return response
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },

    // Logout Action
    async logout() {
      try {
        // Optional: Call backend logout endpoint
        await useCustomFetch('/api/auth/logout', {
          method: 'POST'
        })

        // Clear user and token
        this.clearUser()

        // Redirect to login page
        navigateTo('/login')
      } catch (err) {
        this.error = err.message
        throw err
      }
    },

    // Set User
    setUser(user) {
      this.user = user
      this.isAuthenticated = true
    },

    // Set Token
    setToken(token) {
      this.token = token

      // Set token in cookies for server-side use
      const cookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/'
      })
      cookie.value = token
    },

    // Clear User
    clearUser() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Clear auth cookie
      const cookie = useCookie('auth_token')
      cookie.value = null
    },

    // Check Authentication Status
    async checkAuthStatus() {
      // Check if token exists in cookie
      const token = useCookie('auth_token').value

      if (!token) {
        this.clearUser()
        return false
      }

      try {
        const response = await useCustomFetch('/api/auth/me', {
          method: 'GET'
        })

        if (response) {
          this.setUser(response)
          return true
        }
      } catch (err) {
        // Token might be expired or invalid
        this.clearUser()
        return false
      }
    }
  }
})