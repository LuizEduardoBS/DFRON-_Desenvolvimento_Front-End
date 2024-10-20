<template>
    <div class="dashboard">
      <h1>Bem-vindo ao Dashboard!</h1>
      <p>Você está autenticado.</p>
      <button @click="logout">Sair</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      logout() {
        localStorage.removeItem('token'); // Remove o token JWT
        this.$router.push('/login'); // Redireciona para a página de login
      }
    }
  };
  </script>

  
  