import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../views/LoginPage.vue'; 

const routes = [
  
  {
    path: "/login",
    name: "Login",
    component: LoginPage
  },
  // outras rotas
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Verifique se está configurado assim para Vite
  routes,
});

export default router;
