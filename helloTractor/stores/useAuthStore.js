import { defineStore } from 'pinia'

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    authUser: null
  }),

  actions: {
    setAuthUser(user) {
      this.authUser = user
    },

    clearAuthUser() {
      this.authUser = null
    }
  }
})