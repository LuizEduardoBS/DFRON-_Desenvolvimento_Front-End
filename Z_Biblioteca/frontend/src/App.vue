<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MenuDeslogado from './components/MenuDesgado.vue'
import Rodape from './components/Rodape.vue';
</script>

<template>
  <header>
    <MenuDeslogado />
  </header>

  <RouterView />

  <Rodape />
</template>

<style>

</style>
