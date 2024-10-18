<template>
  <div>
    <img src="/img/Bliblioteca (1)-Photoroom.png" alt="Imagem da Biblioteca">
    <img src="/img/instagram.svg" alt="Instagram">
    <img src="/img/twitter-x.svg" alt="Twitter">
    <img src="/img/github.svg" alt="GitHub">
    
    <form @submit.prevent="loginUser">
      <input v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
      <p>{{ message }}</p>
    </form>
  </div>
</template>

<script>
import api from '../services/api'; // Verifique o caminho do axios

export default {
  data() {
    return {
      username: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });
        this.message = 'Login bem-sucedido!';
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        this.message = error.response?.data?.message || 'Erro ao fazer login.';
      }
    }
  }
};
</script>

<style scoped>
/* Seu CSS aqui */
</style>
