<template>
  <header class="bloco-do-submenu">
    <section class="opcoes-submenu-adm">
      <router-link to="./perfiladm" class="opcao-menu">Dashboard</router-link>
      <router-link to="./admusers" class="opcao-menu">Usuários</router-link>
      <router-link to="./admlivros" class="opcao-menu" style="color: #0C8CE9;">Livros</router-link>
    </section>
    <form action="" id="formulario-buscar-livro" @submit.prevent>
      <input type="text" placeholder="   Pesquisar por título, autor, gênero, status ou ID" v-model="searchQuery">
      <button class="botao-busca" @click="applyFilter">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </button>
    </form>
    <router-link to="./adicionarlivro" class="botao-adicionar-livro">Adicionar Livro</router-link>
  </header>


  <main class="main-livros-adm">
    <div class="bloco-adm-livros">
      <div class="cabecalho-tabela-livros">
        <table class="texto-cabeçalho-livros">
          <thead>
            <tr>
              <th id="coluna-1-livro">ID</th>
              <th id="coluna-2-livro">Título</th>
              <th id="coluna-3-livro">Autor</th>
              <th id="coluna-4-livro">Gênero</th>
              <th id="coluna-5-livro">Cópias</th>
              <th id="coluna-6-livro">Status</th>
              <th id="coluna-7-livro">Alterações</th>
              <th id="coluna-8-livro">Excluir</th>
            </tr>
          </thead>
        </table>
      </div>

      <table class="tabela-principal-livros">
        <tbody>
          <tr v-for="book in paginatedBooks" :key="book._id">
            <td id="coluna-1-livro">{{ book.customId }}</td>
            <td id="coluna-2-livro">{{ book.title.length > 25 ? book.title.slice(0, 25) + '...' : book.title }}</td>
            <td id="coluna-3-livro">{{ book.author.length > 15 ? book.author.slice(0, 15) + '...' : book.author }}</td>
            <td id="coluna-4-livro">
              <select name="" id="" v-model="book.genre" @change="atualizarGenero(book._id, $event)">
                <option value="" selected>{{ book.genre }}</option>
                <option value="Literatura e Ficção" :selected="book.genre === 'Literatura e Ficção'">Literatura e Ficção</option>
                <option value="Infantil e HQ" :selected="book.genre === 'Infantil e HQ'">Infantil e HQ</option>
                <option value="Informática e Tecnologia" :selected="book.genre === 'Informática e Tecnologia'">Informática e Tecnologia</option>
                <option value="Técnicos e Acadêmicos" :selected="book.genre === 'Técnicos e Acadêmicos'">Técnicos e Acadêmicos</option>
                <option value="Saúde e Bem Estar" :selected="book.genre === 'Saúde e Bem Estar'">Saúde e Bem Estar</option>
                <option value="Autoajuda e Espiritualidade" :selected="book.genre === 'Autoajuda e Espiritualidade'">Autoajuda e Espiritualidade</option>
              </select>
            </td>
            <td id="coluna-5-livro">{{ book.copies }}</td>
            <td id="coluna-6-livro">
              <select name="" id="" @change="atualizarStatus(book._id, $event)">
                <option value="" disabled selected style="background-color: #989898; color: #fff;">{{ book.availability }}</option>
                <option value="Indisponível" :selected="book.availability === 'Indisponível'">Indisponível</option>
                <option value="Disponível" :selected="book.availability === 'Disponível'">Disponível</option>
              </select>
            </td>
            <td id="coluna-7-livro">
              <router-link
                :to="{ name: 'editarlivro', params: { id: book._id } }"
                class="editar-livro">
                Editar
              </router-link>

            </td>

            <!-- Modal de Confirmação -->
            <div v-if="modalVisible" class="modal">
              <div class="modal-content">
                <p>Tem certeza que deseja excluir esse usuário?</p>
                <button @click="confirmDelete">Sim</button>
                <button @click="cancelDelete">Não</button>
              </div>
            </div>

            <td id="coluna-8-livro">
              <a href="" @click.prevent="showDeleteModal(book._id)" :class="{'deletar-livro': true}" >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </a>
            </td>
          </tr>

        </tbody>
      </table>

      <div class="paginas-tabela-livros">
        <a href="#" class="passador-paginas-livros" @click.prevent="goToPreviousPage">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
          </svg>
          <p>Anterior</p>
        </a>
        <p>{{ currentPage }} / {{ totalPages }}</p>
        <a href="" class="passador-paginas-livros" @click.prevent="goToNextPage">
          <p>Próximo</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </a>
      </div>
    </div>
  </main>

</template>


<script>
import { booksService } from '@/services/api';

export default {
  data() {
    return {
      books: [], // Lista completa de livros
      searchQuery: this.$route.query.search || '', // Valor da pesquisa do parâmetro da URL
      searchApplied: '', // Valor aplicado ao filtro após clicar em "Buscar"
      currentPage: 1, // Página atual
      booksPerPage: 13, // Quantidade de livros por página
      modalVisible: false,
      bookIdToDelete: null,
    };
  },
  watch: {
    '$route.query.search'(newSearch) {
      this.searchQuery = newSearch;
      this.applyFilter(); // Aplica o filtro ao mudar o parâmetro de busca
    }
  },
  computed: {
    filteredBooks() {
      if (!this.searchApplied) {
        return this.books;
      }
      const query = this.searchApplied.toLowerCase();
      return this.books.filter(book => {
        return (
          book.title.toLowerCase().includes(query) ||
          (book.author && book.author.toLowerCase().includes(query)) ||
          (book.year && book.year.toString().includes(query)) ||
          (book.genre && book.genre.toLowerCase().includes(query))
        );
      });
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      return this.filteredBooks.slice(start, start + this.booksPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    }
  },
  methods: {
    fetchBooks() {
      booksService.getBooks().then(response => {
        this.books = response.data;
      });
    },
    applyFilter() {
      // Aplica a pesquisa no filtro
      this.searchApplied = this.searchQuery;
    },
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    async atualizarGenero(bookId, event) {
      const novaGenero = event.target.value;
      try {
        const response = await booksService.updateBook(bookId, { genre: novaGenero });
        console.log('Gênero atualizado:', response.data);
      } catch (error) {
        console.error('Erro ao atualizar gênero:', error);
      }
    },
    async atualizarStatus(bookId, event) {
      const novoStatus = event.target.value;
      try {
        const response = await booksService.updateBook(bookId, { availability: novoStatus });
        console.log('Disponibilidade atualizada:', response.data);
      } catch (error) {
        console.error('Erro ao atualizar disponibilidade:', error);
      }
    },
    async excluirLivro(bookId) {
      try {
        const response = await booksService.deleteBook(bookId);
        console.log('Livro deletado com sucesso:', response.data);
        this.fetchBooks(); // Atualiza a lista de livros
      } catch (error) {
        console.error('Erro ao deletar livro:', error);
      }
    },
    // Exibe o modal de confirmação
    showDeleteModal(bookId) {
      this.modalVisible = true;
      this.bookIdToDelete = bookId;
    },

    // Cancela a exclusão
    cancelDelete() {
      this.modalVisible = false;
      this.bookIdToDelete = null;
    },

    // Confirma a exclusão
    confirmDelete() {
      // Chame sua função para deletar o livro do banco de dados
      if (this.bookIdToDelete) {
      this.excluirLivro(this.bookIdToDelete);
      this.modalVisible = false;
      this.bookIdToDelete = null;
      }
    },
  },
  mounted() {
    this.fetchBooks();
    if (this.searchQuery) {
      this.applyFilter();
    }
  }
};
</script>


<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.modal-content button {
  margin: 10px;
}

.bloco-do-submenu {
  width: 1072px;
  height: 80px;
  background-color: #fff;
  margin-top: 3px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 2px 8px -2px #989898;
  justify-content: space-between;
}

.opcoes-submenu-adm {
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  gap: 20px;
  margin-left: 32px;
}

.opcoes-submenu-adm .opcao-menu {
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
.opcoes-submenu-adm .opcao-menu:hover {
  color: #0C8CE9;
  text-decoration: underline;
}

.bloco-do-submenu input {
  width: 360px;
  height: 40px;
  background-color: #E7E7E7;
  border: none;
  border-radius: 5px 0 0 5px;
}

.bloco-do-submenu .botao-busca {
  width: 48px;
  height: 42px;
  background-color: #fff;
  border: none;
  border-radius: 0 5px 5px 0;
}

.bloco-do-submenu .botao-busca svg {
  fill: #0C8CE9; 
  width: 20px;
  height: 20px;
}

.bloco-do-submenu .botao-busca:hover {
  background-color: #0C8CE9;
}
.bloco-do-submenu .botao-busca svg:hover {
    fill: #fff;
}

.botao-escolher-livro {
  width: 173px;
  height: 47px;
  background-color: #0C8CE9;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
}

.botao-escolher-livro:hover {
  color: #0C8CE9;
  background-color: #fff;
  border: 1px solid #0C8CE9;
}

/* ########################################### */
/* LIVROS - ADM */
#formulario-buscar-livro {
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 8px -2px #989898;
  margin-right: 35px;
  border-radius: 5px;
}

.bloco-do-submenu .botao-adicionar-livro {
  width: 173px;
  height: 47px;
  background-color: #0C8CE9;
  border: none;
  border-radius: 5px;
  margin-right: 32px;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  font-family: 'Times New Roman';
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
}

.bloco-do-submenu .botao-adicionar-livro:hover {
  background-color: #fff;
  color: #0C8CE9;
  border: 1px solid #0C8CE9;
}

.main-livros-adm {
  height: calc(100% - 170px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bloco-adm-livros {
  width: 1071px;
  height: 593px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cabecalho-tabela-livros {
  width: 1071px;
  height: 48px;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.texto-cabeçalho-livros {
  display: flex;
  flex-direction: row;
  margin: 10px 35px;
  border: none;
  text-align: center;
  font-size: 18px;
}

.bloco-adm-livros .tabela-principal-livros {
  margin: 10px 35px;
  border: 1px solid black;
  text-align: center;
  background-color: #E7E7E7;
  font-size: 18px;
}

.bloco-adm-livros .tabela-principal-livros td {
  border: 1px solid black;
  height: 30px; 
}

#coluna-1-livro {
  width: 58px;
}

#coluna-2-livro {
  width: 237px;
}

#coluna-3-livro {
  width: 162px;
}

#coluna-4-livro {
  width: 186px;
}

#coluna-5-livro {
  width: 58px;
}

#coluna-6-livro {
  width: 138px;
}

#coluna-7-livro {
  width: 88px;
}

#coluna-8-livro {
  width: 67px;
}

.editar-livro {
  text-decoration: none;
  color: #0C8CE9;
  font-weight: bold;
  font-size: 18px;
}

.editar-livro:hover {
  text-decoration: underline;
  color: #000;
}

.deletar-livro svg {
    fill: #ff1e00;
}

.deletar-livro svg:hover {
    fill: #000;
}

.tabela-principal-livros select {
  border: none;
  text-align: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-family: 'Times New Roman';
}

.paginas-tabela-livros {
  width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.paginas-tabela-livros p {
  margin: 0;
  padding: 0;
  font-size: 18px;
}

.bloco-adm-livros .passador-paginas-livros {
  text-decoration: none;
  font-size: 18px;
  color: #0C8CE9;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.bloco-adm-livros .passador-paginas-livros p {
  margin: 0;
  padding: 0;
}

.bloco-adm-livros .passador-paginas-livros:hover {
  text-decoration: underline;
}

.bloco-adm-livros .passador-paginas-livros svg:hover {
    fill: #fff;
    stroke: #0C8CE9;
}
</style>