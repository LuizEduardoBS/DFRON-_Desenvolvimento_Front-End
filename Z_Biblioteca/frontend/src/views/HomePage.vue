<template>
  <main class="main-index">
    <div class="bloco-index-busca">
      <span class="texto-bem-vindo">Bem-vindo!</span>
      <p>Faça login para ter acesso a empréstimos de livros ou Cadastre-se aqui.</p>
      <form @submit.prevent>
        <input type="text" v-model="searchQuery" placeholder="  Digite aqui o livro que você procura">
        <button @click="applyFilter">Buscar</button>
      </form>
    </div>

    <div class="bloco-destaques-index">
      <p class="titulo-livros-destaque">Livros em destaque:</p>
      <div class="bloco-cards-destaques">

        <div 
            v-for="book in highlightedBooks" 
            :key="book._id" 
            class="card-livro-destaque">
            <!-- Router link envolve apenas a imagem e o título -->
            <router-link 
              :to="{ name: 'descricaolivro', params: { id: book._id } }" 
              class="card-link">
              <img :src="formatImagePath(book.coverImage)" alt="" />
              <span class="titulo-livros-index">{{ book.title }}</span>
            </router-link>

            <!-- Botão "Adicionar" fora do router-link -->
            <button 
              :class="{ disabled: isBookDisabled(book) }"
              :disabled="isBookDisabled(book)"
              @click.stop="addToCart(book)" 
              class="botao-adicionar-index">
              Adicionar
            </button>
          </div>
      </div>
    </div>

    <div class="bloco-categoria">
      <div class="texto-categoria-index">
        <span>Categorias</span>
      </div>
      <div class="lista-categorias">
    <a href="#" @click="applyCategoryFilter('Literatura e Ficção')">Literatura e Ficção</a>
    <a href="#" @click="applyCategoryFilter('Infantil e HQ')">Infantil e HQ’s</a>
    <a href="#" @click="applyCategoryFilter('Informática e Tecnologia')">Informática e Tecnologia</a>
    <a href="#" @click="applyCategoryFilter('Técnicos e Acadêmicos')">Técnicos e Acadêmicos</a>
    <a href="#" @click="applyCategoryFilter('Saúde e Bem Estar')">Saúde e Bem Estar</a>
    <a href="#" @click="applyCategoryFilter('Autoajuda e Espiritualidade')">Autoajuda e Espiritualidade</a>
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
      searchQuery: '', // Consulta de pesquisa para o campo de busca
      highlightedBooks: [], // Lista de livros em destaque, últimos 6 cadastrados
      userCart: [], // Carrinho do usuário
      userReservations: [], // Reservas do usuário
      userLoans: [], // Empréstimos do usuário
    };
  },
  computed: {
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
          item =>
            item.bookId &&
            item.bookId._id === book._id &&
            !isRestricted.includes(item.status.toLowerCase())
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
        // Define os 6 últimos livros cadastrados, ordenados por customId
        this.highlightedBooks = [...this.books]
          .sort((a, b) => b.customId - a.customId) // Ordena do maior para o menor customId
          .slice(0, 6); // Pega os primeiros 6 livros após a ordenação
      });
    },
    applyFilter() {
      // Redireciona para a página '/acervo' com a query de busca como parâmetro
      this.$router.push({ name: 'acervo', query: { search: this.searchQuery } });
    },
    formatImagePath(path) {
      return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
    },
    applyCategoryFilter(category) {
      // Define o valor de searchQuery como o nome da categoria e redireciona para o acervo
      this.$router.push({ name: 'acervo', query: { search: category } });
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
          console.log(this.userCart)
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

    this.fetchBooksCartLendReservations(); 
  }
};
</script>


<style scoped>
.botao-adicionar-index.disabled {
  background-color: #D9D9D9;
  color: #8E8E8E;
  cursor: not-allowed;
}

.bloco-cards-destaques .card-link {
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-index {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bloco-index-busca {
  background-color: #fff;
  width: 1072px;
  height: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.texto-bem-vindo {
  font-size: 30px;
  text-decoration: underline;
  font-weight: bold;
  padding: 0;
  margin: 0;
}

.bloco-index-busca input {
  width: 578px;
  height: 47px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background-color: #E7E7E7; 
  box-shadow: 0 2px 8px 0px #989898;
}

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.bloco-index-busca button {
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

.bloco-index-busca button:hover {
  border: 1px solid #0C8CE9;
  background-color: #fff;
  color: #0C8CE9;
}

.bloco-index-busca p {
  font-size: 18px;
}

/* DESTAQUES - INDEX */
.bloco-destaques-index {
  width: 1072PX;
  height: 316PX;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF;
  box-shadow: 0 2px 8px -2px #989898;
}

.titulo-livros-destaque {
  padding: 0;
  margin: 0;
  height: 47px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
}

.bloco-cards-destaques {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.bloco-cards-destaques:hover > :not(:hover) {
  opacity: .4;
  transform: scale(0.9);
}

.card-livro-destaque {
  width: 143px;
  height: 255px;
  border-radius: 10px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  transition: .35s;
  cursor: pointer;
  justify-content: space-between;
}

.card-livro-destaque img {
  height: 163px;
  width: 106px;
  margin: 0;
  padding: 0;
  margin-top: 6px;
}

.titulo-livros-index {
  text-align: center;
  font-size: 18px;
  padding: 0;
  margin: 0;
}

.botao-adicionar-index {
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

.botao-adicionar-index:hover {
  border: 1px solid #0C8CE9;
  background-color: #fff;
  color: #0C8CE9;
}

/* CATEGORIAS */
.bloco-categoria {
  width: 1072PX;
  height: 316PX; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  margin-top: 20px;
  box-shadow: 0 2px 8px -2px #989898;
}

.lista-categorias {
  width: 700px;
  height: 150px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 16px;
  column-gap: 16px;
  justify-content: center;
}

.texto-categoria-index {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
  padding-top: 0;
}

.lista-categorias a {
  width: 231px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
  padding-bottom: 0;
  font-size: 18px;
  text-decoration: none;
  color: #000;
}

.lista-categorias a:hover {
  background-color: #0C8CE9;
  color: #fff;
  font-weight: 700;
}
</style>