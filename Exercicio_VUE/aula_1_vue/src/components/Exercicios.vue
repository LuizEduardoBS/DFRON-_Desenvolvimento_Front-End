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
    <h2>Exercício 1:</h2>
    <p>
      Texto exercicio 1
    </p>
    <hr>
    <h2>Exercício 1:</h2>
    <p>
      Texto exercicio 1
    </p>

  </div>
</template>

<script>
export default {
  data() {
    return {
      ex1: 'Olá mundo VUE JS !!!',
      contador: Number(0),
    };
  },
  methods: {
    incrementarContador() {
      this.contador += 1;
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
