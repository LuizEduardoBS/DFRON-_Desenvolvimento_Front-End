<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MenuDesgado from './components/MenuDesgado.vue'
import Rodape from './components/Rodape.vue';
</script>

<template>
  <header>
    <MenuDesgado />
  </header>

  <RouterView />

  <Rodape />
</template>

<style>

</style>
