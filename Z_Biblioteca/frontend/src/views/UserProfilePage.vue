<template>
  <h1>Logado</h1>
  <button @click="logout">Sair</button>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>
