<template>
  <header class="bloco-do-submenu">
    <section class="opcoes-submenu-usuario">
      <router-link to="./perfilusuario" class="opcao-menu">Perfil</router-link>
      <router-link to="./notificacaousuario" class="opcao-menu">Notificações</router-link>
      <router-link to="./carrinho" class="opcao-menu" style="text-align: center; color: #0C8CE9;">Carrinho de<br>Empréstimos</router-link>
      <router-link to="./reservas" class="opcao-menu">Reservas</router-link>
    </section>
  </header>

  <main class="main-usuario-carrinho">
    <div class="conteudo-bloco-carrinho">
      <div>
        <span class="notificacao-livro-indisponivel">
          *Atenção: No máximo 3 livros emprestado. Se ja estiver com 1 pode solicitar apenas 2, se estiver com 2 pode solicitar apenas 1.</span>
      </div>

      <div class="bloco-cards-carrinho">

        <div class="card-carrinho" v-for="book in books" :key="book._id">
          <div class="icone-excluir-card">
            <svg @click="deleteBookCart(book.bookId._id)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
          <img :src="formatImagePath(book.bookId.coverImage)" alt="">
          <div>
            <span>{{ book.bookId.title || 'Nome do livro não disponível' }}</span>
          </div>
          <div>
            <span><strong>Status</strong> <span class="status-livro-card" id="">{{ book.bookId.availability || '...' }}</span></span>
          </div>
        </div>

        
        
      </div>

      <div class="bloco-botoes-carrinho" v-if="books.length > 0">
        <button class="botao-solicitar-emprestimo" 
          :class="{ disabled: isBookDisabled(book) }"
          :disabled="isBookDisabled(book)"
          @click="moveToLoans()">
          <span>Solicitar Empréstimo</span>
        </button>
        <button class="botao-esvaziar-carrinho" @click="cleanCartBook()"><span>Esvaziar Carrinho</span></button>
      </div>
      <div class="bloco-botoes-carrinho" v-else>
        <div style="font-size: 18px;">Seu carrinho está vazio!</div>
      </div>
    </div>
  </main>
</template>

<script>
import { userService } from '@/services/api'

export default {
  data() {
    return {
    books: [], // Lista dos livros no carrinho
    userLoans: [], // Empréstimos do usuário
    activeLoansCount: [],
    book: ''
  }},
  computed: {
    isBookDisabled() {
      return (book) => {
        const isRestricted = ["negado", "devolvido"]; // Status normalizados

        // Contar quantos livros no empréstimo não estão com status "negado" ou "devolvido"
        const activeLoansCount = this.userLoans.filter(
          item => !isRestricted.includes(item.status.toLowerCase())
        ).length;

        // Verificar se o livro já está no empréstimo
        const isInLoan = this.userLoans.some(
          item => item.bookId._id === book.bookId && !isRestricted.includes(item.status.toLowerCase())
        );

        // Verificar disponibilidade do livro
        const isUnavailable = book.availability === "Indisponível";

        // Lógica para habilitar/desabilitar o botão com base no número de livros no empréstimo
        if (activeLoansCount === 3) {
          return true; // Desabilita se o usuário tem 3 livros no empréstimo
        }

        // Quando o usuário tem 2 livros no empréstimo que atendem à condição
        if (activeLoansCount === 2) {
          return this.books.length > 1; // Desabilita se tiver livros no carrinho
        }

        // Quando o usuário tem 1 livro no empréstimo que atende à condição
        if (activeLoansCount === 1) {
          return this.books.length > 2; // Desabilita se tiver mais de 2 livros no carrinho
        }

        // Se o usuário não tiver livros no empréstimo ou a condição não for atendida, pode adicionar o livro
        return isInLoan || isUnavailable;
      };
    },
  },
  methods: {
  // Busca Os livros no carrinho
  fetchBooksCart() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("Usuário não encontrado no localStorage");
      return;
    }

    userService.getCart(userId).then(response => {
      // Verifique se a resposta tem a estrutura esperada
      if (response.data && response.data.carrinho) {
        this.books = response.data.carrinho; // Ajuste para acessar o carrinho no response
        console.log("Livros no carrinho:", this.books); // Verifique se os livros estão sendo carregados corretamente
      } else {
        console.error("Carrinho vazio ou dados inválidos:", response);
      }
    }).catch(error => {
      console.error("Erro ao carregar o carrinho:", error);
    });
  },
  deleteBookCart(bookId) {
    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário
    
    // Verifica se o userId foi recuperado corretamente
    if (!userId) {
        console.error("Usuário não encontrado no localStorage");
        return;
    }

    userService.deleteCart(userId, bookId)
      .then(response => {
        console.log("Livro removido do carrinho com sucesso!");
        
        // Atualiza a lista de livros no carrinho após a remoção
        this.books = this.books.filter(book => book.bookId._id !== bookId);

        // Opcional: Exibir um alerta ou mensagem de sucesso para o usuário
        alert("Livro removido do carrinho!");
      })
      .catch(error => {
        console.error("Erro ao remover livro do carrinho:", error);
        
        // Opcional: Exibir uma mensagem de erro para o usuário
        alert("Erro ao remover livro do carrinho.");
      });
  },
  cleanCartBook() {
    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário
    
    // Verifica se o userId foi recuperado corretamente
    if (!userId) {
        console.error("Usuário não encontrado no localStorage");
        return;
    }
    userService.deleteAllBooksCart(userId)
      .then(response => {
        console.log("Carrinho esvaziado com sucesso!", response);

        // Atualiza a lista para refletir o carrinho vazio
        this.books = [];

        // Opcional: Exibir um alerta ou mensagem de sucesso para o usuário
        alert("Carrinho esvaziado com sucesso!");
      })
      .catch(error => {
        console.error("Erro ao esvaziar carrinho:", error);

        // Opcional: Exibir uma mensagem de erro para o usuário
        alert("Erro ao esvaziar o carrinho.");
      });
  },
  moveToLoans() {
    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário
    
    // Verifica se o userId foi recuperado corretamente
    if (!userId) {
        console.error("Usuário não encontrado no localStorage");
        return;
    }
    userService.moveBooksToLoans(userId)
      .then(response => {
        console.log("Empréstimo solicitado com sucesso!", response);

        // Atualiza a lista para refletir o carrinho vazio
        this.books = [];

        // Opcional: Exibir um alerta ou mensagem de sucesso para o usuário
        alert("Empréstimo solicitado com sucesso!");
      })
      .catch(error => {
        console.error("Erro ao solicitar empréstimo de livros:", error);

        // Opcional: Exibir uma mensagem de erro para o usuário
        alert("Erro ao solicitar empréstimo de livros.");
      });

  },
  formatImagePath(path) {
    return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
  },
  async fetchBooksLend() { // Busca os livro no empréstimos
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("Usuário não encontrado no localStorage");
        return;
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

      // Garante que a interface seja atualizada após mudanças
      this.$forceUpdate();
    },

},
mounted() {
  this.fetchBooksCart();

  this.fetchBooksLend(); 
},

}

</script>

<style scoped>
.botao-solicitar-emprestimo.disabled {
  background-color: #D9D9D9;
  color: #8E8E8E;
  cursor: not-allowed;
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

.opcoes-submenu-usuario {
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  gap: 20px;
  margin-left: 32px;
}

.opcoes-submenu-usuario .opcao-menu {
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
.opcoes-submenu-usuario .opcao-menu:hover {
  color: #0C8CE9;
  text-decoration: underline;
}

/* ########################################### */
/* CARRINHO DO USUARIO */
.main-usuario-carrinho {
  width: 1072px;
  height: 480px;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  font-size: 18px;
}

.conteudo-bloco-carrinho {
  width: 1032px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.notificacao-livro-indisponivel {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #F39C11;
  width: 1032px;
  height: 40px;
  border-radius: 10px;
  margin-bottom: 5px;
  margin-top: 20px;
}

.bloco-cards-carrinho {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 20px;
}

.card-carrinho {
  width: 320px;
  height: 300px;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 8px;
}

.icone-excluir-card {
  width: 320px;
  height: 300px;
  position: absolute;
  display: flex;
  justify-content: end;
  margin-top: 10px;
  margin-right: 10px;
}

.icone-excluir-card svg:hover {
  fill: #ff0000;
}

.card-carrinho img {
  width: 132px;
  height: 200px;
}

.status-livro-card {
  color: #00A65A;
  font-weight: bold;
}

.bloco-botoes-carrinho {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}

.botao-solicitar-emprestimo {
  width: 215px;
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #00A65A;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px -2px #989898;
  border: none;
}

.botao-solicitar-emprestimo:hover {
  background-color: #00cc70;
}

.botao-esvaziar-carrinho {
  width: 215px;
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #F39C11;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px -2px #989898;
  border: none;
}

.botao-esvaziar-carrinho:hover {
  background-color: #ffb339;
}
</style>