<template>
   <header class="bloco-do-submenu">
    <section class="opcoes-submenu-adm">
      <router-link to="./perfiladm" class="opcao-menu" style="color: #0C8CE9;">Dashboard</router-link>
      <router-link to="./admusers" class="opcao-menu">Usuários</router-link>
      <router-link to="./admlivros" class="opcao-menu">Livros</router-link>
    </section>
  </header>


  <main class="main-homepage-adm">
    <div class="bloco-dashboard">
      <div class="bloco-cards">
        <div class="card1-dashboard">
          <h1>1525</h1>
          <h2>Acessos totais</h2>
        </div>
        <div class="card2-dashboard">
          <h1>53</h1>
          <h2>Acessos esse mês</h2>
        </div>
        <div class="card3-dashboard">
          <h1>2976</h1>
          <h2>Acessos totais</h2>
        </div>
        <div class="card4-dashboard">
          <h1>201</h1>
          <h2>Livros emprestados</h2>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.bloco-do-submenu {
  width: 1072px;
  height: 80px;
  background-color: #fff;
  margin-top: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 2px 8px -2px #989898;
  justify-content: space-between;
}

.opcoes-submenu-adm {
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  gap: 20px;
  margin-left: 32px;
}

.opcoes-submenu-adm .opcao-menu {
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
.opcoes-submenu-adm .opcao-menu:hover {
  color: #0C8CE9;
  text-decoration: underline;
}

/* ########################################### */
/* MAIN - ADMINISTRADOR */
.main-homepage-adm {
  height: calc(100% - 170px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bloco-dashboard {
  width: 1071px;
  height: 593px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
}

.bloco-cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 30px;
  gap: 30px;
}

.card1-dashboard {
  width: 230px;
  height: 112px;
  background-color: #00c0ef;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card2-dashboard {
  width: 230px;
  height: 112px;
  background-color: #f39c11;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card3-dashboard {
  width: 230px;
  height: 112px;
  background-color: #00a65a;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.card4-dashboard {
  width: 230px;
  height: 112px;
  background-color: #dd4c39;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bloco-cards h1 {
  font-size: 60px;
  color: #fff;
  font-weight: bold;
  padding: 0;
  margin: 0 16px;
}

.bloco-cards h2 {
  font-size: 22px;
  color: #fff;
  font-weight: bold;
  padding: 0;
  margin: 0 16px;
  margin-bottom: 10px;
}
</style>


