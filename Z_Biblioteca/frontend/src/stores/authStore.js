import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userPermission = ref(null);
  const userStatus = ref(null); // Valor padrão como 'Ativo'

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const permissions = localStorage.getItem('permissions');
    const status = localStorage.getItem('status'); // Pega o status diretamente

    if (token) {
      isLoggedIn.value = true;
      userPermission.value = permissions ? JSON.parse(permissions) : 'Usuário';
      userStatus.value = status || 'Ativo'; // Usando 'Ativo' como valor padrão
    } else {
      isLoggedIn.value = false;
      userPermission.value = null;
      userStatus.value = 'Ativo'; // Caso o usuário não esteja logado, mantém 'Ativo'
    }
  };

  const login = (token, permissions, status) => {
    localStorage.setItem('token', token);
    localStorage.setItem('permissions', JSON.stringify(permissions)); // Armazenando permissões
    localStorage.setItem('status', status); // Armazenando o status diretamente
    isLoggedIn.value = true;
    userPermission.value = permissions;
    userStatus.value = status; // Atualiza o status na store
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    localStorage.removeItem('status'); // Remover o status ao fazer logout
    isLoggedIn.value = false;
    userPermission.value = null;
    userStatus.value = 'Ativo'; // Resetando o status para o valor inicial
  };

  onMounted(() => {
    checkAuthStatus();
  });

  return { isLoggedIn, userPermission, userStatus, checkAuthStatus, login, logout };
});
