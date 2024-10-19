import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginPage.vue')
    },
    {
      path: '/cadastro',
      name: 'cadastro',
      component: () => import('../views/RegisterPage.vue')
    },
    {
      path: '/acervo',
      name: 'acervo',
      component: () => import('../views/CollectionPage.vue')
    },
    {
      path: '/politicas',
      name: 'politicas',
      component: () => import('../views/PoliciesPage.vue')
    },
    {
      path: '/sobre',
      name: 'sobre',
      component: () => import('../views/AboutPage.vue')
    }
  ]
})

export default router
