import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/index.vue'
import LoginView from '../views/Login/index.vue'
import { storage } from '@/utils'
import { LOGIN_USER } from '@/constants'
import type { User } from '@/stores/user/type'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const user: User = storage.get(LOGIN_USER)
  if (!user) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path === '/login') {
      next(from?.path ?? false)
    } else {
      next()
    }
  }
})

export default router
