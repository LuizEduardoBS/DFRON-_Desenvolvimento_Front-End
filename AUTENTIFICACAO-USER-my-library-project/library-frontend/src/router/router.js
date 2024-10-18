import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/LoginPage.vue'; 

const routes = [
  {
    path: '/login',
    component: Login,
  },
  // outras rotas podem ser adicionadas aqui
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

