<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Kezdőlap</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/posts/create">Create Post</router-link>
        </li>
      </ul>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <template v-if="!authStore.isAuthenticated">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">Bejelentkezés</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">Regisztráció</router-link>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">Profil</router-link>
            </li>
            <li class="nav-item">
              <button @click="handleLogout" class="btn btn-link nav-link text-white">Kijelentkezés</button>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container mt-4">
    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
</style>