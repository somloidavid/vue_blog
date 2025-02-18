// src/stores/auth.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { usePostsStore } from './posts'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  const isAuthenticated = computed(() => !!token.value)

  const setToken = (newToken) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }

  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:3000/register', userData)
      setToken(response.data.token)
      user.value = response.data.user
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Regisztrációs hiba történt',
      }
    }
  }

  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:3000/login', credentials)
      setToken(response.data.token)
      user.value = response.data.user

      const postsStore = usePostsStore()
      await postsStore.fetchPosts()
      await postsStore.fetchCategories()

      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Bejelentkezési hiba történt',
      }
    }
  }

  const logout = () => {
    setToken(null)
    user.value = null
  }

  if (token.value) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  }

  return {
    user,
    token,
    isAuthenticated,
    register,
    login,
    logout,
  }
})