import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    expiresAt: null as number | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.expiresAt && state.expiresAt > Date.now(),
  },
  actions: {
    login(token: string, expiresIn: number) {
      this.token = token
      this.expiresAt = expiresIn

      localStorage.setItem('token', token)
      localStorage.setItem('expiresAt', this.expiresAt.toString())
    },
    logout() {
      this.token = null
      this.expiresAt = null
      localStorage.removeItem('token')
      localStorage.removeItem('expiresAt')
      localStorage.removeItem('username')
    },
    restoreSession() {
      const token = localStorage.getItem('token')
      const expiresAt = localStorage.getItem('expiresAt')

      if (token && expiresAt) {
        this.token = token
        this.expiresAt = parseInt(expiresAt)
      } else {
        this.logout()
      }
    },
  },
})
