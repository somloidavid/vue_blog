import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import PostCreateView from '../views/PostCreateView.vue'
import PostEditView from '../views/PostEditView.vue'
import CategoryView from '../views/CategoryView.vue'
import PostView from '../views/PostView.vue'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/categories/:id',
      name: 'category',
      component: CategoryView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostView,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/create',
      name: 'create-post',
      component: PostCreateView,
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true },
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/create',
      name: 'post-create',
      component: PostCreateView,
      meta: { requiresAuth: true },
    },
    {
      path: '/posts/:id/edit',
      name: 'post-edit',
      component: PostEditView,
      meta: { requiresAuth: true },
      props: true,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/profile')
  } else {
    next()
  }
})

export default router