<template>
  <main class="main-acervo">
    <h1>ACERVO</h1>
    <div class="bloco-acervo-busca">
      <p>Faça login para ter acesso a empréstimos de livros ou Cadastre-se aqui.</p>
      <form>
        <input type="text" placeholder="  Digite aqui o livro que você procura">
        <button>Buscar</button>
      </form>
    </div>

    <div class="bloco-livros-acervo">
      <div class="bloco-interno-livros-acervo">
        <div class="acervo-filtros">
          <p>Filtros aplicados: Nenhum</p>
          <p>Filtros</p>
        </div>
        <hr>
        <div class="bloco-cards-acervo">

          <router-link
            v-for="book in books"
            :key="book._id"
            :to="{ name: 'descricaolivro', params: { id: book._id } }"
            class="card-link"
          >
            <div class="card-livro-acervo">
              <img :src="formatImagePath(book.coverImage)" alt="" />
              <span class="titulo-livros-acervo">{{ book.title }}</span>
              <button class="botao-adicionar-acervo">Adicionar</button>
            </div>
          </router-link>
          
          <div class="paginas-acervo">
            <a href="">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill passador-acervo" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg>
              <p>Anterior</p>
            </a>
            <p>1 / 2532</p>
            <a href="">
              <p>Próximo</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </div>
  </main>
</template>

<script>
import { booksService } from '@/services/api'; // Importa o serviço de livros

export default {
  data() {
    return { books: [] }; // Estado local da lista de livros
  },
  methods: {
    fetchBooks() { // Busca os livros do back-end
      booksService.getBooks().then(response => {
        this.books = response.data; // Atualiza a lista de livros
      });
    },
    formatImagePath(path) {
      // Corrige as barras e adiciona o caminho completo da URL
      return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
    }
  },
  mounted() {
    this.fetchBooks(); // Busca os livros ao montar o componente
  }
};
</script>

<style scoped>
.bloco-cards-acervo .card-link {
  text-decoration: none;
  color: inherit;
  display: inline-block;
}

.main-acervo {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.main-acervo h1 {
  font-size: 25px;
  font-weight: bold;
  align-self: center;
  padding: 0;
  margin: 28px;
}

.bloco-acervo-busca {
  background-color: #fff;
  width: 1072px;
  height: 145px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
  row-gap: 23px;
  padding: 0;
  margin: 0;
}

.bloco-acervo-busca input {
  width: 578px;
  height: 47px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background-color: #E7E7E7; 
  box-shadow: 0 2px 8px 0px #989898;
}

.bloco-acervo-busca form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.bloco-acervo-busca button {
  width: 173px;
  height: 47px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #0C8CE9;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  cursor: pointer;
}

.bloco-acervo-busca button:hover {
  border: 1px solid #0C8CE9;
  background-color: #fff;
  color: #0C8CE9;
}

.bloco-acervo-busca p {
  font-size: 18px;
  padding: 0;
  margin: 0;
}

/* BLOCO COM OS LIVROS DO ACERVO */

.bloco-livros-acervo {
  width: 1072px;
  height: 100%;
  background-color: #fff;
  margin-top: 20px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bloco-interno-livros-acervo {
  max-width: 958px;
}

.acervo-filtros {
  width: 958px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0 0 0;
  padding: 0;
}

.bloco-interno-livros-acervo hr {
  padding: 0;
  margin-top: 2px;
}

.bloco-cards-acervo {
  width: 958px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 26px;
}

.card-livro-acervo {
  width: 143px;
  height: 248px;
  border-radius: 10px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
}

.card-livro-acervo img {
  height: 163px;
  width: 106px;
  margin: 0;
  padding: 0;
  margin-top: 6px;
}

.titulo-livros-acervo {
  text-align: center;
  font-size: 18px;
  padding: 0;
  margin: 0;
}

.botao-adicionar-acervo {
  width: 120px;
  height: 23px;
  background-color: #0C8CE9;
  font-size: 15px;
  font-weight: bold;
  color: #FFF;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.botao-adicionar-acervo:hover {
  border: 1px solid #0C8CE9;
  background-color: #fff;
  color: #0C8CE9;
}

.paginas-acervo {
  width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0 35px 0;
}

.paginas-acervo p {
  font-size: 18px;
}

.bloco-interno-livros-acervo a {
  text-decoration: none;
  font-size: 18px;
  color: #0C8CE9;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.bloco-interno-livros-acervo a p {
  margin: 0;
  padding: 0;
}

.bloco-interno-livros-acervo a svg {
  fill: #0C8CE9; 
  width: 20px;
  height: 20px;
}

.bloco-interno-livros-acervo a:hover {
  text-decoration: underline;
}

.passador-acervo {
    fill: #fff;
    stroke: #0C8CE9;
  }
</style>