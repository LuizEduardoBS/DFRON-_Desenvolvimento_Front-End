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
      path: '/:catchAll(.*)', // Sintaxe para rota coringa
      redirect: '/login',
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
    },
    {
      path: '/perfilusuario',
      name: 'perfilusuario',
      component: () => import('../views/UserProfilePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editar_perfil_usuario',
      name: 'editar_perfil_usuario',
      component: () => import('../views/UserEditPerfil.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/notificacaousuario',
      name: 'notificacaousuario',
      component: () => import('../views/UserNotifPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/carrinho',
      name: 'carrinho',
      component: () => import('../views/UserLoanCart.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: () => import('../views/UserReservationsPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/perfiladm',
      name: 'perfiladm',
      component: () => import('../views/ADMProfilePage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admusers',
      name: 'admusers',
      component: () => import('../views/ADMUsersPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admlivros',
      name: 'admulivros',
      component: () => import('../views/ADMBooksPage.vue'),
      meta: { requiresAuth: true },
      props: true
    } ,
    {
      path: '/admnotificacoes',
      name: 'admnotificacoes',
      component: () => import('../views/ADMNotifPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/adicionarlivro',
      name: 'adicionarlivro',
      component: () => import('../views/AddBooksPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/editarlivro/:id',
      name: 'editarlivro',
      component: () => import('../views/ADMUpdateBook.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/descricaolivro/:id',
      name: 'descricaolivro',
      component: () => import('../views/BookDescription.vue'),
      props: true
    },
    {
      path: '/admperfilusuarios/:id',
      name: 'admperfilusuarios',
      component: () => import('../views/ADMUserProfile.vue'),
      props: true
    }
  ]
})

// Proteção das rotas
router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token');

  if (to.matched.some(record => record.meta.requiresAuth) && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
