// src/stores/authStore.js
import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  // Definir as variáveis reativas
  const isLoggedIn = ref(false);
  const userPermission = ref(null);

  // Função para verificar o status de autenticação
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const permissions = localStorage.getItem('permissions');

    if (token) {
      isLoggedIn.value = true;
      // Verificar se as permissões estão no formato correto
      userPermission.value = permissions ? JSON.parse(permissions) : 'Usuário'; // Valor padrão caso as permissões não existam
    } else {
      isLoggedIn.value = false;
      userPermission.value = null;
    }
  };

  // Função de login
  const login = (token, permissions) => {
    localStorage.setItem('token', token);
    localStorage.setItem('permissions', JSON.stringify(permissions)); // Salvar permissões como JSON string
    isLoggedIn.value = true;
    userPermission.value = permissions;
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    isLoggedIn.value = false;
    userPermission.value = null;
  };

  // Chamar a verificação de autenticação quando o componente for montado
  onMounted(() => {
    checkAuthStatus();
  });

  return { isLoggedIn, userPermission, checkAuthStatus, login, logout };
});
