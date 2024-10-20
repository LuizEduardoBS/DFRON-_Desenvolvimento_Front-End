// src/stores/authStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const isLoggedIn = ref(false);
  const userPermission = ref(null);

  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const permissions = localStorage.getItem('permissions');
    if (token) {
      isLoggedIn.value = true;
      userPermission.value = permissions;
    } else {
      isLoggedIn.value = false;
    }
  };

  const login = (token, permissions) => {
    localStorage.setItem('token', token);
    localStorage.setItem('permissions', permissions);
    isLoggedIn.value = true;
    userPermission.value = permissions;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('permissions');
    isLoggedIn.value = false;
    userPermission.value = null;
  };

  return { isLoggedIn, userPermission, checkAuthStatus, login, logout };
});
