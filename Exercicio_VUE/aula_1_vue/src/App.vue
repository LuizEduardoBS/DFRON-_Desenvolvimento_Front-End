<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <Exercicios msg="Aula 1 - Exercícios VUE"/>
</template>

<script>
import Exercicios from './components/Exercicios.vue';

export default {
  name: 'App',
  components: {
    Exercicios,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
