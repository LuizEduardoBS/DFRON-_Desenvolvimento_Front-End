import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userPermission = ref(null);
  const userStatus = ref(null); 
  const userID = ref(null);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const permissions = localStorage.getItem('permissions');
    const status = localStorage.getItem('status'); // Pega o status diretamente
    const userId = localStorage.getItem('userId'); // Pega o status diretamente


    if (token) {
      isLoggedIn.value = true;
      userPermission.value = permissions ? JSON.parse(permissions) : 'Usuário';
      userStatus.value = status || 'Ativo'; // Usando 'Ativo' como valor padrão
      userID.value = userId || ''; // Usando 'Ativo' como valor padrão

    } else {
      isLoggedIn.value = false;
      userPermission.value = null;
      userStatus.value = 'Ativo'; // Caso o usuário não esteja logado, mantém 'Ativo'
      userID.value = null;

    }
  };

  const login = (token, permissions, status, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('permissions', JSON.stringify(permissions)); // Armazenando permissões
    localStorage.setItem('status', status); // Armazenando o status diretamente
    localStorage.setItem('userId', userId);

    isLoggedIn.value = true;
    userPermission.value = permissions;
    userStatus.value = status; // Atualiza o status na store
    userID.value = userId; // Atribui o ID do usuário ao estado
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    localStorage.removeItem('status'); // Remover o status ao fazer logout
    localStorage.removeItem('userId');
    isLoggedIn.value = false;
    userPermission.value = null;
    userStatus.value = 'Ativo'; // Resetando o status para o valor inicial
  };

  onMounted(() => {
    checkAuthStatus();
  });

  return { isLoggedIn, userPermission, userStatus, userID, checkAuthStatus, login, logout };
});
