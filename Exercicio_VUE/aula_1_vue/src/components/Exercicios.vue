<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <hr>
    <h2>Exercício 1:</h2>
    <p>
      {{ ex1 }}
    </p>
    <hr>
    <h2>Exercício 2:</h2>
    <button @click="incrementarContador">Incrementar contador</button>
    <p>
      Contador: {{ contador }}
    </p>
    <hr>
    <h2>Exercício 3:</h2>
    <button @click="visualizacaoTexto">Texto</button>
    <p v-if="mostrarTexto">
      {{ textoEX3 }}
    </p>
    <hr>
    <h2>Exercício 4:</h2>
    <ul>
      <li v-for="(item, index) in itens" :key="index">{{ item }}</li>
    </ul>
    <hr>
    <h2>Exercício 5:</h2>
    <p>
      Texto exercicio 5
    </p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ex1: 'Olá mundo VUE JS !!!',
      contador: Number(0),
      mostrarTexto: false,
      textoEX3: 'Você está vendo esse texto, porque clicou no botão "texto" !!',
      // itens: ["Maça", "Uva", "Abacaxi", "Melância"],
    };
  },
  methods: {
    incrementarContador() {
      this.contador += 1;
    },
    visualizacaoTexto() {
      if (this.mostrarTexto === false) {
        this.mostrarTexto = true;
      } else if (this.mostrarTexto === true) {
        this.mostrarTexto = false;
      }
    },
  },
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
