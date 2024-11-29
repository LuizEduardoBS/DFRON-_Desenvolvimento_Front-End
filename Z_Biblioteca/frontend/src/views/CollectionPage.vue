<template>
  <main class="main-acervo">
    <h1>ACERVO</h1>
    <div class="bloco-acervo-busca">
      <p>Faça login para ter acesso a empréstimos de livros ou Cadastre-se aqui.</p>
      <form @submit.prevent>
        <input type="text" v-model="searchQuery" placeholder="  Digite aqui o livro que você procura">
        <button @click="applyFilter">Buscar</button>
      </form>
    </div>

    <div class="bloco-livros-acervo">
      <div class="bloco-interno-livros-acervo">
        <div class="acervo-filtros">
          <p>Filtros aplicados: {{ searchApplied ? searchApplied : 'Nenhum' }}</p>
          
        </div>
        <hr>
        <div class="bloco-cards-acervo">
          <div 
            v-for="book in paginatedBooks" 
            :key="book._id" 
            class="card-livro-acervo">
            <!-- Router link envolve apenas a imagem e o título -->
            <router-link 
              :to="{ name: 'descricaolivro', params: { id: book._id } }" 
              class="card-link">
              <img :src="formatImagePath(book.coverImage)" alt="" />
              <span class="titulo-livros-acervo">{{ book.title }}</span>
            </router-link>

            <!-- Botão "Adicionar" fora do router-link -->
            <button 
              :class="{ disabled: isBookDisabled(book) }"
              :disabled="isBookDisabled(book)"
              @click.stop="addToCart(book)" 
              class="botao-adicionar-acervo">
              Adicionar
            </button>
          </div>

          <!-- Paginação -->
          <div class="paginas-acervo">
            <a href="#" @click.prevent="goToPreviousPage">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill sgv" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
              <p>Anterior</p>
            </a>
            <p>{{ currentPage }} / {{ totalPages }}</p>
            <a href="#" @click.prevent="goToNextPage">
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
import { booksService } from '@/services/api';
import { userService } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

export default {
  data() {
    return {
      books: [], // Lista completa de livros
      searchQuery: this.$route.query.search || '', // Valor da pesquisa do parâmetro da URL
      searchApplied: '', // Valor aplicado ao filtro após clicar em "Buscar"
      currentPage: 1, // Página atual
      booksPerPage: 18, // Quantidade de livros por página
      userId: '',
      userCart: [], // Carrinho do usuário
      userReservations: [], // Reservas do usuário
      userLoans: [], // Empréstimos do usuário
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
    let books = this.books;

    // Aplica o filtro de busca, se necessário
    if (this.searchApplied) {
      const query = this.searchApplied.toLowerCase();
      books = books.filter(book => {
        return (
          book.title.toLowerCase().includes(query) ||
          (book.author && book.author.toLowerCase().includes(query)) ||
          (book.year && book.year.toString().includes(query)) ||
          (book.genre && book.genre.toLowerCase().includes(query))
        );
      });
    }

    // Ordena os livros em ordem alfabética pelo título
    return books.sort((a, b) => a.title.localeCompare(b.title));
    },
    paginatedBooks() {
      const start = (this.currentPage - 1) * this.booksPerPage;
      return this.filteredBooks.slice(start, start + this.booksPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredBooks.length / this.booksPerPage);
    },

    isBookDisabled() {
      return (book) => {
        const userCart = this.userCart || [];
        const userReservations = this.userReservations || [];
        const userLoans = this.userLoans || [];

        const isRestricted = ["negado", "devolvido"]; // Status normalizados

        // Verificar se já há 3 livros no carrinho
        if (userCart.length >= 3) {
          return true;
        }

        // Verificar se o livro já está no carrinho, reservas ou empréstimos
        const isInCart = userCart.some(item => item.bookId && item.bookId._id === book._id);
        const isInReservation = userReservations.some(item => item.bookId && item.bookId._id === book._id);
        const isInLoan = userLoans.some(
          item => item.bookId && item.bookId._id === book._id &&
                  !isRestricted.includes(item.status?.toLowerCase())
        );


        // Verificar disponibilidade
        const isUnavailable = book.availability === "Indisponível";

        return isInCart || isInReservation || isInLoan || isUnavailable;
      };
    },

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
    formatImagePath(path) {
      return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
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
    async addToCart(book) {
      try {
        const authStore = useAuthStore();
        authStore.checkAuthStatus(); // Verifica o estado de login

        if (!authStore.isLoggedIn) {
          alert("Você precisa estar logado para adicionar um livro ao carrinho.");
          return;
        }

        const userId = localStorage.getItem("userId");

        if (!userId) {
          alert("ID do usuário não encontrado.");
          return;
        }

        const response = await userService.postCart(userId, { bookId: book._id });

        if (response.status === 200) {
          alert("Livro adicionado ao carrinho com sucesso!");

          // Use Vue.set para garantir reatividade
          this.userCart = [...this.userCart, { bookId: book }];
        }
      } catch (error) {
        console.error("Erro ao adicionar o livro ao carrinho:", error);
        alert("Ocorreu um erro ao adicionar o livro ao carrinho.");
      }
    },
    async fetchBooksCartLendReservations() { // Busca os livro no Carrinho, reservas e empréstimos
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("Usuário não encontrado no localStorage");
        return;
      }

      try {
        const response = await userService.getCart(userId);
        if (response.data && response.data.carrinho) {
          this.userCart = response.data.carrinho; // Salvar no estado do componente
        } else {
          console.error("Carrinho vazio ou dados inválidos:", response);
        }
      } catch (error) {
        console.error("Erro ao carregar o carrinho:", error);
      } 
      
      try {
        const response = await userService.getLend(userId);
        if (response.data && response.data.emprestimos) {
          this.userLoans = response.data.emprestimos; // Salvar no estado do componente
        } else {
          console.error("Emprestimos vazio ou dados inválidos:", response);
        }
      } catch (error) {
        console.error("Erro ao carregar o emprestimos:", error);
      }  
      // Busca os livros no reservas
      try {
        const response = await userService.getReservations(userId);
        if (response.data && response.data.reservas) {
          this.userReservations = response.data.reservas; // Salvar no estado do componente
        } else {
          console.error("Reservas vazio ou dados inválidos:", response);
        }
      } catch (error) {
        console.error("Erro ao carregar o reservas:", error);
      } 

      // Garante que a interface seja atualizada após mudanças
      this.$forceUpdate();
    },

  },
  mounted() {
    this.fetchBooks();
    
    if (this.searchQuery) {
      this.applyFilter();
    };

    this.fetchBooksCartLendReservations(); 


  }
};
</script>



<style scoped>
.botao-adicionar-acervo.disabled {
  background-color: #D9D9D9;
  color: #8E8E8E;
  cursor: not-allowed;
}

.bloco-cards-acervo .card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  height: 255px;
  border-radius: 10px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  justify-content: space-between;
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
  margin-bottom: 10px;
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