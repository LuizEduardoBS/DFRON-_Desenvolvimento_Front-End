<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bloco-do-menu">
    <div class="top-bar-index">

      <div class="logo">
        <img src="@/assets/img/Biblioteca (1)-Photoroom.png" alt="BBLTC Biblioteca">
      </div>

      <section class="opcoes-sem-login">
        <router-link to="/">Home</router-link>
        <router-link to="/acervo">Acervo</router-link>
        <router-link to="/politicas">Políticas</router-link>
        <router-link to="/sobre">Sobre</router-link>
        <router-link to="/login">Login</router-link>
        <router-link to="/cadastro">Cadastre-se</router-link>
      </section>
    </div>
  </header>
</template>

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
.opcoes-sem-login {
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  gap: 20px;
}
.opcoes-sem-login a {
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
.opcoes-sem-login a:hover {
  color: #0C8CE9;
  text-decoration: underline;
}
</style>