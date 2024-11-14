<template>
   <main class="main-login">
    <div class="bloco-login">
      <div class="bloco-login-interno">
        <h1>Logar</h1>
        <!-- <div> -->
        <form @submit.prevent="loginUser">
          <span>Seu e-mail</span>
          <input v-model="email" placeholder="  exemplo@exemplo.com">
          <span>Sua senha</span>
          <input type="password" v-model="password" placeholder="  senha@123">
          <button type="submit">Logar</button>
        </form>
        <p v-if="message">{{ message }}</p>
        <!-- </div> -->
      </div>
      <div class="nao-possui-conta">
        <span>Ainda não tem conta?</span>
        <router-link to="/cadastro">Cadastre-se</router-link>
      </div>
    </div>
  </main>
</template>

<script>
import { userService } from '../services/api'; // Verifique o caminho do axios
import { useAuthStore } from '../stores/authStore'; // ajuste o caminho se necessário
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async loginUser() {
  try {
    const response = await userService.login({
      email: this.email,
      password: this.password,
    });

    const authStore = useAuthStore();
    const { token, permissions, status, userId } = response.data;

    if (status === 'Bloqueado') {
      this.message = 'Conta bloqueada. Procure o(a) bibliotecario(a)';
      return;  // Impede o login de continuar
    }
    console.log(response.data.status)

    authStore.login(token, permissions, status, userId); // Armazenando status na store

    this.message = 'Login bem-sucedido!';

    if (permissions === 'Usuário') {
      this.$router.push('/perfilusuario');
    } else if (permissions === 'ADM' || permissions === 'Bibliotecario(a)') {
      this.$router.push('/perfiladm');
    } else if (status === 'Bloqueado') {
      this.$router.push('/acervo');
    }else {
      this.message = 'Permissão desconhecida!';
    }
  } catch (error) {
    this.message = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : 'Erro ao fazer login.';
  }
}
}}
</script>



<style scoped>
.main-login {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bloco-login {
  width: 1072px;
  height: 626px;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

.bloco-login-interno {
  width: 392px;
  height: 388px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
}

.bloco-login-interno h1 {
  font-size: 30px;
  font-weight: bold;
  color: #0C8CE9;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
}

.bloco-login-interno form {
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bloco-login-interno span {
  font-size: 18px;
  margin: 0;
  padding: 0;
  display: block;
  width: 324px;
}

.bloco-login-interno input {
  width: 324px;
  height: 47px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
  background-color: #E7E7E7;
  padding: 0;
  margin: 0;
}

.bloco-login-interno button {
  width: 325px;
  height: 47px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  background-color: #0C8CE9;
  color: #fff;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  margin-top: 15px;
}

.bloco-login-interno button:hover {
  background-color: #fff;
  color: #0C8CE9;
  border: 1px solid #0C8CE9;
}

.nao-possui-conta {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 21px;
  align-items: center;
  gap: 21px;
}

.nao-possui-conta a {
  width: 127px;
  height: 30px;
  background-color: #fff;
  color: #0C8CE9;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.nao-possui-conta a:hover {
  background-color: #0C8CE9;
  color: #fff;
}
</style>