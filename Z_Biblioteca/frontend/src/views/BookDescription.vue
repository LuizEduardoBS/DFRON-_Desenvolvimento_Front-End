<template>
<main class="main-descricao-livro">
  <div class="conteudo-descricao-livro">
    <span>Gênero: </span>
    <span v-if="book">{{ book.genre }}</span>
    <span v-else>Carregando gênero do livro</span>
  </div>

  <div class="capa-titulo-descricao">
    <div>
      <img :src="formatImagePath(book.coverImage)" alt="" class="capa-livro-descricao" v-if="book">
      <img src="#" alt="" class="capa-livro-descricao" v-else>
    </div>
    <div class="titulo-descriçao-botoes">
      <div>
        <div>
          <h1 class="titulo-livro-descricao" v-if="book">{{ book.title }}</h1>
          <h1 class="titulo-livro-descricao" v-else>Carregando título do livro...</h1>
        </div>
        <div class="nota-numero-leitores">
          <div><span>Nota: </span><span>{{ averageRating }}</span></div>
          <div><span>{{ allReviews.length }}</span><span> avaliações</span></div>
          <div><span>{{ allReviews.length }}</span><span> pessoas leram esse título</span></div>
        </div>
        <div class="texto-descricao-livro">
          <p v-if="book">{{ book.description }}</p>
          <p v-else>Carregando descrição...</p>
        </div>
        <div class="qtde-autor-publicacao">
          <div class="info-card">
            <div><span>Qnt Disponível</span></div>
            <div>
              <span v-if="book">{{ book.copies }}</span>
              <span v-else>Carregando info...</span>
            </div>
          </div>
          <div class="info-card">
            <div><span>Autor(a)</span></div>
            <div>
              <span v-if="book">{{ book.author }}</span>
              <span v-else>Carregando info...</span>
            </div>
          </div>
          <div class="info-card">
            <div><span>Publicação</span></div>
            <div>
              <span v-if="book">{{ book.year }}</span>
              <span v-else>Carregando info...</span>
            </div>
          </div>
        </div>
      </div>
      <div class="botoes-da-descricao">
        <button class="botao-adicionar-da-descricao" 
          :class="{ disabled: isBookDisabled(book) }"
          :disabled="isBookDisabled(book)"
          @click.stop="addToCart(book)">
        Adicionar ao carrinho
      </button>
        <button class="botao-reservar-da-descricao" 
        :class="{ disabled: isBookDisabled(book) }"
        :disabled="isBookDisabled(book)"
        @click.stop="addToReservations(book)">
        Reservar
      </button>
      </div>
    </div>
  </div>
  <div><span class="comentarios-e-avaliacoes">Comentarios e avaliações</span></div>
  <hr class="linha-vertical-descricao">
  <div class="avaliacoes-descricao">
    <div class="notas-descricao">
      <div>
        <span id="nota-grande">{{ averageRating }}</span>
        <span>{{ allReviews.length }}</span><span> avaliações</span>
      </div>
      <div class="percentual-avaliacoes">
        <div><span>5 estrelas: </span><span>{{ fiveStarCount }}</span><span> avaliações</span></div>
        <div><span>4 estrelas: </span><span>{{ fourStarCount }}</span><span> avaliações</span></div>
        <div><span>3 estrelas: </span><span>{{ threeStarCount }}</span><span> avaliações</span></div>
        <div><span>2 estrelas: </span><span>{{ twoStarCount }}</span><span> avaliações</span></div>
        <div><span>1 estrela: </span><span>{{ oneStarCount }}</span><span> avaliação</span></div>
      </div>
    </div>
    <div class="textos-avaliacoes">
      <div v-if="allReviews && allReviews.length">
        <div 
          class="card-avaliacao-descricao" 
          v-for="review in allReviews" 
          :key="review._id"
        >
          <div class="identificacao-avaliacao">
            <div>
              <span class="username-descricao">{{ users.find(user => user.data._id === review.userId)?.data.username || 'Usuário desconhecido' }}</span>

              

              <span> Nota: </span><span>{{ review.rating }}</span>
            </div>
            <div>
              <span id="date">{{ formatDate(review.reviewsDate) }}</span>
            </div>
          </div>
          <div>
            <p>{{ review.comment }}</p>
          </div>
          <hr>
        </div>
        <div class="botao-ver-mais-descricao"><span>Ver mais</span></div>
      </div>
      
      <div v-else>
        <p>Nenhuma avaliação encontrada.</p>
      </div>
      
    </div>
  </div>
</main>
</template>

<script>
import { booksService } from '@/services/api'; // Importa o serviço de livros
import { userService } from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      book: '',
      userId: '',
      userCart: [], // Carrinho do usuário
      userReservations: [], // Reservas do usuário
      userLoans: [], // Empréstimos do usuário
      allReviews: [],
      user: '',
      userIds: [],
      users: [],
    };
  },
  watch: {
    // Quando a prop 'id' mudar, a função fetchBook será chamada para atualizar os dados
    id: 'fetchBook'
  },
  computed: {
    isBookDisabled() {
      return (book) => {
        // console.log('Dados usados para desabilitar:', this.userCart, this.userReservations, this.userLoans);

        const userCart = this.userCart || [];
        const userReservations = this.userReservations || [];
        const userLoans = this.userLoans || [];

        const isRestricted = ["negado", "devolvido"]; // Status normalizados

        // Verificar se já há 3 livros no carrinho
        if (userCart.length >= 3) {
          return true;
        }

        // Verificar se o livro já está no carrinho, reservas ou empréstimos
        const isInCart = userCart.some(item => item.bookId._id === book._id);
        const isInReservation = userReservations.some(item => item.bookId._id === book._id);
        const isInLoan = userLoans.some(
          item => item.bookId._id === book._id &&
                  !isRestricted.includes(item.status.toLowerCase())
        );

        // Verificar disponibilidade
        const isUnavailable = book.availability === "Indisponível";

        return isInCart || isInReservation || isInLoan || isUnavailable;
      };
    },
    averageRating() {
      if (this.allReviews.length === 0) return 0; // Evitar divisão por zero
      const total = this.allReviews.reduce((sum, review) => sum + review.rating, 0);
      const average = total / this.allReviews.length; // Dividindo pela quantidade de avaliações
      return average.toFixed(1).replace('.', ','); // Formato brasileiro
    },
    // Contagem das avaliações por estrela
    fiveStarCount() {
      return this.allReviews.filter(review => review.rating === 5).length;
    },
    fourStarCount() {
      return this.allReviews.filter(review => review.rating === 4).length;
    },
    threeStarCount() {
      return this.allReviews.filter(review => review.rating === 3).length;
    },
    twoStarCount() {
      return this.allReviews.filter(review => review.rating === 2).length;
    },
    oneStarCount() {
      return this.allReviews.filter(review => review.rating === 1).length;
    },
  },
  methods: {
    // Função para formatar a data
    formatDate(dateString) {
      if (!dateString || isNaN(Date.parse(dateString))) return '---'; // Verifica se a data é válida
      const date = new Date(dateString);
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      return new Intl.DateTimeFormat('pt-BR', options).format(date);
    },
    async fetchBook() {
      booksService.fetchBookById(this.id)
        .then(data => {
          this.book = data;
          this.allReviews = this.book.reviews
          // console.log('Reviews', this.allReviews)

        const userIds = this.allReviews.map(review => review.userId);
        Promise.all(userIds.map(id => userService.getProfileById(id)))
          .then(users => {
            this.users = users; // Array de perfis de usuários
            // console.log('Veja: ', this.users)
          })
          .catch(error => {
            console.error('Erro ao buscar os perfis de usuários:', error);
          });


        if (this.userId) {
          userService.getProfileById(this.userId)
            .then(userData => {
                this.user = userData;
            })
            .catch(error => {
              console.error('Erro ao buscar os dados do usuário:', error);
            });
          }
        })
        .catch(error => console.error("Erro ao buscar dados do livro:", error));
    },
    formatImagePath(path) {
      // Corrige as barras e adiciona o caminho completo da URL
      return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
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
    async addToReservations(book) {
      try {
        const authStore = useAuthStore();
        authStore.checkAuthStatus(); // Verifica o estado de login

        if (!authStore.isLoggedIn) {
          alert("Você precisa estar logado para reservar um livro.");
          return;
        }

        const userId = localStorage.getItem("userId");

        if (!userId) {
          alert("ID do usuário não encontrado.");
          return;
        }

        const response = await userService.postReservations(userId, { bookId: book._id });

        if (response.status === 200) {
          alert("Livro reservado com sucesso!");

          // Use Vue.set para garantir reatividade
          this.userReservations = [...this.userReservations, { bookId: book }];
        }
      } catch (error) {
        console.error("Erro ao adicionar o livro ao carrinho:", error);
        alert("Ocorreu um erro ao adicionar o livro ao carrinho.");
      }
    }
  },
  mounted() {
    this.fetchBook();  // Chama a função fetchBook ao montar
    this.fetchBooksCartLendReservations(); 
    
  },
};
</script>


<style scoped>
.botao-adicionar-da-descricao.disabled {
  background-color: #D9D9D9;
  color: #8E8E8E;
  cursor: not-allowed;
}

.botao-reservar-da-descricao.disabled {
  background-color: #D9D9D9;
  color: #8E8E8E;
  cursor: not-allowed;
}

/* ########################################### */
/* DESCRIÇÃO DO LIVRO */
.main-descricao-livro {
  width: 1072px;
  height: 1150px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-descricao-livro {
  width: 1022px;
  height: 25px;
  margin-top: 10px;
}

.capa-titulo-descricao {
  display: flex;
  flex-direction: row;
  gap: 22px;
  margin-bottom: 20px;
}

.capa-livro-descricao {
  width: 407px;
  height: 586px;
}

.titulo-descriçao-botoes {
  width: 593px;
  height: 586;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.titulo-livro-descricao {
  font-size: 50px;
  margin: 0;
  margin-bottom: 10px;
}

.nota-numero-leitores {
  width: 593px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.texto-descricao-livro {
  font-size: 18px;
}

.qtde-autor-publicacao {
  height: 54px;
  width: 593px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.info-card {
  width: 120px;
  height: 80px;
  flex-direction: column;
  justify-items: center;
  column-gap: 10px;
  text-align: center;
}

.botoes-da-descricao {
  width: 593px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}

.botao-adicionar-da-descricao {
  width: 280px;
  height: 47px;
  background-color: #00A65A;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  box-shadow: 0 2px 8px -2px #989898;
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
}

.botao-adicionar-da-descricao:hover {
  background-color: #00cc70;
}

.botao-reservar-da-descricao {
  width: 280px;
  height: 47px;
  background-color: #F39C11;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  box-shadow: 0 2px 8px -2px #989898;
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
}

.botao-reservar-da-descricao:hover {
  background-color: #ffb339;
}

.comentarios-e-avaliacoes {
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
}

.linha-vertical-descricao {
  width: 1019px;
  opacity: 60%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.avaliacoes-descricao {
  display: flex;
  flex-direction: row;
  
}

.notas-descricao {
  width: 228px;
  display: flex;
  flex-direction: column;
}

#nota-grande {
  font-size: 60px;
  font-weight: bold;
  color: #0C8CE9;
}

.percentual-avaliacoes {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 10px;
}

.main-descricao-livro span {
  font-size: 18px;
}

.textos-avaliacoes {
  width: 722px;
}



.identificacao-avaliacao {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.username-descricao {
  font-weight: bold;
  margin-right: 10px;
}

#date {
  font-size: 14px;
}

.botao-ver-mais-descricao {
  width: 169px;
  height: 35px;
  margin: 15px 0 0px 0;
  font-size: 18px;
  text-decoration: underline;
  font-weight: bold;
  color: #0C8CE9;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  justify-self: center;
}

.botao-ver-mais-descricao:hover {
  background-color: #0C8CE9;
  color: #FFF;
}
</style>