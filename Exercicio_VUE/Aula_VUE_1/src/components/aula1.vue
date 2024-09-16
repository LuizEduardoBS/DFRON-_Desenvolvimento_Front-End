<template>
  <div class="main">
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
    <button @click="visualizacaoTexto">{{ !mostrarTexto ? "Mostrar texto" : "Esconder texto"}}</button>
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
    <input v-model="textoEX5" placeholder="Digite algo aqui !">
    <p>
      Texto digitado: {{ textoEX5 }}
    </p>
    <hr>
    <h2>Exercício 6:</h2>
    <p id="texto-estilizado">
      Texto exercicio 6
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
      itens: ["Maça", "Uva", "Abacaxi", "Melância", "Laranja"],
      textoEX5: "",
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

<style scoped>
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  hr {
    width: 800px;
    margin: 20px 0 20px 0;
  }

  h2 {
    margin-bottom: 10px;
  }

  #texto-estilizado {
    font-size: 20px;
    font-weight: bold;
    color: green;
  }
</style>
