import { defineStore } from 'pinia'
import { useCookie } from 'nuxt/app'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  persist: {
    storage: localStorage,
    paths: ['user', 'token', 'isAuthenticated']
  },

  getters: {
    currentUser: (state) => state.user,
    isLoggedIn: (state) => state.isAuthenticated
  },

  actions: {
    // Login Action
    async login(credentials) {
      this.loading = true
      this.error = null

      try {
        const response = await useCustomFetch('/auth/signin', {
          method: 'POST',
          body: credentials
        })

        if (response.token && response.user) {
          this.setUser(response.user)
          this.setToken(response.token)

          // Set authentication cookie and local storage
          const authCookie = useCookie('auth_token', {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
          })
          authCookie.value = response.token

          // Optional: Persist token in localStorage for additional redundancy
          localStorage.setItem('auth_token', response.token)

          return response
        } else {
          throw new Error('Login failed')
        }
      } catch (error) {
        this.error = error.message
        throw error
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

        if (response.token && response.user) {
          this.setUser(response.user)
          this.setToken(response.token)

          // Set authentication cookie and local storage
          const authCookie = useCookie('auth_token', {
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/'
          })
          authCookie.value = response.token

          // Optional: Persist token in localStorage for additional redundancy
          localStorage.setItem('auth_token', response.token)

          return response
        }

        throw new Error('Signup failed')
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.loading = false
      }
    },

    // Logout Action
    async logout() {
      try {
        // Optional: Call backend logout endpoint
        await useCustomFetch('/api/auth/logout', { method: 'POST' })
      } catch (error) {
        console.error('Logout API call failed', error)
      }

      // Clear authentication state
      this.clearUser()
    },

    // Set User
    setUser(user) {
      this.user = user
      this.isAuthenticated = true
    },

    // Set Token
    setToken(token) {
      this.token = token
      // Optional: Store token in localStorage
      localStorage.setItem('auth_token', token)
    },

    // Clear User
    clearUser() {
      this.user = null
      this.token = null
      this.isAuthenticated = false

      // Clear authentication cookie
      const authCookie = useCookie('auth_token')
      authCookie.value = null

      // Clear localStorage
      localStorage.removeItem('auth_token')

      // Navigate to login page
      navigateTo('/login')
    },

    // Check Authentication Status
    async checkAuthStatus() {
      // Check both cookie and localStorage for token
      const cookieToken = useCookie('auth_token').value
      const localStorageToken = localStorage.getItem('auth_token')
      const token = cookieToken || localStorageToken

      if (!token) {
        this.clearUser()
        return false
      }

      try {
        const response = await useCustomFetch('/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (response) {
          this.setUser(response)
          this.isAuthenticated = true
          return true
        }
      } catch (error) {
        this.clearUser()
        return false
      }
    }
  }
})