<template>
  <header class="bloco-do-menu">
    <div class="top-bar-index">
      <div class="logo">
        <img src="@/assets/img/Biblioteca (1)-Photoroom.png" alt="BBLTC Biblioteca">
      </div>

      <section class="opcoes-logado-adm">
        <router-link to="/" class="opcao-menu">Home</router-link>
        <router-link to="/acervo" class="opcao-menu">Acervo</router-link>
        <router-link to="/politicas" class="opcao-menu">Políticas</router-link>
        <router-link to="/sobre" class="opcao-menu">Sobre</router-link>
        <a href="#" class="opcao-menu" id="usuario-menu" @click="toggleMenu">
          {{ user ? user.username : 'Usuário' }} 
          <img id="icone1" v-if="!user.imagePerfil" src="@/assets/img/person.png">
          <img id="icone2" v-else :src="formatImagePath(user.imagePerfil)">
        </a>
      </section>
    </div>

    <div v-if="menuVisible" class="bloco-do-submenu">
      <div class="opcoes-submenu-adm">
        <router-link to="/perfilusuario" class="opcao-menu">Perfil</router-link>
        <router-link to="/notificacaousuario" class="opcao-menu">Notificações</router-link>
        <router-link to="/carrinho" class="opcao-menu" style="text-align: left;">Carrinho de<br>Empréstimos</router-link>
        <router-link to="/reservas" class="opcao-menu" >Reservas</router-link>
        <button @click="logout" class="opcao-menu">Sair</button>
      </div>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '../stores/authStore'; // ajuste o caminho se necessário
import { userService } from '@/services/api'; // Importa o serviço de buscar perfil do usuário

export default {
  data() {
    return {
      menuVisible: false,
      user: {}, // Defina um objeto vazio para evitar problemas de acesso nulo
      imagePerfil: null, // Caminho da imagem do perfil
    };
  },
  methods: {
    formatImagePath(path) {
      return path ? `http://localhost:3000/${path}` : null;
    },
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    logout() {
      const authStore = useAuthStore(); // Obtenha a instância da store
      authStore.logout(); // Chame o método de logout da store
      this.$router.push('/login'); // Redirecione para a página de login
    },
    async fetchUser() { // Busca os livros do back-end
      try {
        const response = await userService.getProfile();
        this.user = response.data; // Atualiza a lista de livros
      } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
      }
    }
  },
  mounted() {
    this.fetchUser(); // Busca os livros ao montar o componente
  }
};
</script>


<style scoped>
.bloco-do-menu {
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  position: relative; /* Para permitir que o submenu seja posicionado em relação ao menu */
}

.top-bar-index {
  width: 1032px;
  height: 44px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.bloco-do-menu img {
  width: 150px;
  height: 100%;
  margin-top: 0;
  padding-left: 20px;
}

.opcoes-logado-adm {
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  gap: 20px;
}

.opcoes-logado-adm .opcao-menu {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 20px;
  display: block;
  height: 44px;
  place-content: center;
  gap: 0;
  padding: 0;
  cursor: pointer;  
}

.opcoes-logado-adm .opcao-menu:hover {
  color: #0C8CE9;
  text-decoration: underline;
}

.opcoes-logado-adm .opcao-menu img {
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 29px;
  margin-left: 5px;
  padding-right: 90px;
}

.bloco-do-submenu {
  width: 150px; /* Largura do submenu */
  background-color: #fff;
  position: absolute; /* Para que não afete o layout do menu principal */
  top: 100%; /* Coloca o submenu diretamente abaixo do menu principal */
  right: 0; /* Alinha à esquerda do menu */
  margin-top: 3px; /* Espaço entre o menu do usuário e o submenu */
  box-shadow: 0 2px 8px -2px #989898;
  z-index: 10; /* Garante que o submenu fique sobre outros elementos */
}

.opcoes-submenu-adm {
  display: flex;
  flex-direction: column; /* Muda para coluna */
  padding: 10px 0; /* Espaçamento vertical */
  gap: 10px; /* Espaçamento entre as opções */
}

.opcoes-submenu-adm .opcao-menu {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 16px; /* Tamanho da fonte ajustado */
  display: block;
  padding: 10px; /* Espaçamento interno */
  width: 100%; /* Largura total */
  box-sizing: border-box; /* Inclui o padding no cálculo da largura */
  cursor: pointer;
}

.opcoes-submenu-adm .opcao-menu:hover {
  background-color: #f0f0f0; /* Cor de fundo ao passar o mouse */
  color: #0C8CE9;
}
</style>
