<script setup>
import { ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import MenuDeslogado from './components/MenuDesgado.vue'; // Certifique-se de que o nome está correto
import MenuUsuario from './components/MenuUsuario.vue';
import MenuADM from './components/MenuADM.vue';
import Rodape from './components/Rodape.vue';

const isLoggedIn = ref(false);
const userPermission = ref(null);

// Função para verificar o estado de login ao montar o componente
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

// Verifica o estado de autenticação na montagem
checkAuthStatus();

// Observa mudanças no estado de login
watch(isLoggedIn, (newValue) => {
  // Se o usuário fizer logout, atualize o Menu
  if (!newValue) {
    userPermission.value = null;
  }
});
</script>

<template>
  <header>
    <component 
      :is="isLoggedIn ? (userPermission === 'ADM' ? MenuADM : MenuUsuario) : MenuDeslogado" />
  </header>

  <RouterView />

  <Rodape />
</template>

<style>
/* Adicione estilos aqui, se necessário */
</style>
