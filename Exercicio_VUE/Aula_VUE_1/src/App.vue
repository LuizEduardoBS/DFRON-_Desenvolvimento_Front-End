<script setup>
import aula1 from './components/aula1.vue'

</script>

<template>
  <header>
    <div>
      
    </div>
    <div class="titulo-e-logo">
      <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
      <aula1 msg="Aula 1 - VUE" />
    </div>
  </header>


</template>

<style scoped>

.titulo-e-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


</style>
