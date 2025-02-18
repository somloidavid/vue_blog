<template>
    <div class="register-container">
        <h2>Regisztráció</h2>
        <form @submit.prevent="handleSubmit" class="form">
            <div class="form-group">
                <label for="name">Név:</label>
                <input type="text" id="name" v-model="name" required class="form-control" />
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required class="form-control" />
            </div>
            <div class="form-group">
                <label for="password">Jelszó:</label>
                <input type="password" id="password" v-model="password" required class="form-control" />
            </div>
            <div v-if="error" class="error">
                {{ error }}
            </div>
            <button type="submit" class="btn">Regisztráció</button>
        </form>
        <p class="text-center">
            Már van fiókod?
            <RouterLink to="/login">Jelentkezz be itt!</RouterLink>
        </p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const authStore = useAuthStore()
const router = useRouter()

const handleSubmit = async () => {
    const result = await authStore.register({
        name: name.value,
        email: email.value,
        password: password.value
    })

    if (result.success) {
        router.push('/profile')
    } else {
        error.value = result.error
    }
}
</script>