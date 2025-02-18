<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Profil oldal</h2>
            <div v-if="authStore.user" class="profile-info">
              <div class="mb-3">
                <strong>Név:</strong> {{ authStore.user.name }}
              </div>
              <div class="mb-4">
                <strong>Email:</strong> {{ authStore.user.email }}
              </div>
            </div>
            <div class="d-grid gap-2">
              <button @click="handleLogout" class="btn btn-danger">Kijelentkezés</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>