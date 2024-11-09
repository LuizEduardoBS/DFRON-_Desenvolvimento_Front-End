<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/authStore'; // ajuste o caminho se necessário
import MenuDeslogado from './components/MenuDeslogado.vue'; 
import MenuUsuario from './components/MenuUsuario.vue';
import MenuADM from './components/MenuADM.vue';
import Rodape from './components/Rodape.vue';

const authStore = useAuthStore();

// Verifica o estado de autenticação na montagem
onMounted(() => {
  authStore.checkAuthStatus();
});
</script>

<template>
  <header>
    <component 
      :is="authStore.isLoggedIn ? (authStore.userPermission === 'ADM' || authStore.userPermission === 'Bibliotecario(a)' ? MenuADM : MenuUsuario) : MenuDeslogado" />
  </header>

  <RouterView />

  <Rodape />
</template>

<style>
/* Adicione estilos aqui, se necessário */
</style>
