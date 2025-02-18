<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">{{ title }}</h2>
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="email" class="form-label">Email:</label>
                <input type="email" id="email" v-model="email" required class="form-control">
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Jelszó:</label>
                <input type="password" id="password" v-model="password" required class="form-control">
              </div>
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">{{ submitButtonText }}</button>
              </div>
            </form>
            <p class="text-center mt-3">
              {{ alternateText }}
              <router-link to="/register" class="text-primary">{{ alternateLinkText }}</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const email = ref('');
const password = ref('');
const error = ref('');

const isLogin = route.name === 'login';
const title = isLogin ? 'Bejelentkezés' : 'Regisztráció';
const submitButtonText = isLogin ? 'Bejelentkezés' : 'Regisztráció';
const alternateText = isLogin ? 'Még nincs fiókod?' : 'Már van fiókod?';
const alternateLink = isLogin ? '/register' : '/login';
const alternateLinkText = isLogin ? 'Regisztrálj itt!' : 'Jelentkezz be itt!';

const handleSubmit = async () => {
  const credentials = {
    email: email.value,
    password: password.value
  };

  try {
    let result;
    if (isLogin) {
      result = await authStore.login(credentials);
      if (result.success) {
        router.push('/profile');
      } else {
        error.value = result.error;
      }
    } else {
      result = await authStore.register({ name: 'asd', ...credentials });
      if (result.success) {
        router.push('/profile');
      } else {
        error.value = result.error;
      }
    }
  } catch (err) {
    error.value = 'Hiba történt. Próbáld újra.';
  }
};
</script>