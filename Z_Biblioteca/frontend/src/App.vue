<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MenuLogado from './components/MenuDesgado.vue'
import Rodape from './components/Rodape.vue';
</script>

<template>
  <header>
    <MenuLogado />
  </header>

  <RouterView />

  <Rodape />
</template>

<style>

</style>
