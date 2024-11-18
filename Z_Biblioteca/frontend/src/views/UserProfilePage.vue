<template>
  <header class="bloco-do-submenu">
    <section class="opcoes-submenu-usuario">
      <router-link to="./perfilusuario" class="opcao-menu" style="text-align: center;  color: #0C8CE9;">Perfil</router-link>
      <router-link to="./notificacaousuario" class="opcao-menu">Notificações</router-link>
      <router-link to="./carrinho" class="opcao-menu" style="text-align: center;">Carrinho de<br>Empréstimos</router-link>
      <router-link to="./reservas" class="opcao-menu">Reservas</router-link>
    </section>
    <router-link to="/acervo" class="botao-escolher-livro">Escolher um livro</router-link>
  </header>

  <main class="main-perfil-usuario">
    <div class="conteudo-perfil-usuario">
      <div class="coluna-perfil-usuario-1">
        <img src="../assets/img/person.png" alt="" class="foto-do-perfil">
        <div class="coluna-identificadores">
          <input type="text" :value="user.username" disabled placeholder="Nome do Usuário">
          <input type="text" disabled placeholder="email@email.com">
        </div>
      </div>

      <div class="coluna-perfil-usuario-2">
        <a href="" class="botao-editar-perfil">Editar Perfil</a>
      </div>
    </div>

    <hr>

    <h1>Gerenciar Livros</h1>

    <div class="linha-gerenciar-livro" 
    v-for="book in visibleUserLoans" 
    :key="book.bookId._id"
    :class="{'linha-devolvido-negado': book.status === 'Devolvido' || book.status === 'Negado'}">
      <div class="grid-colunas-da-linha">

        <div class="coluna-1-gerenciar-livro">
          <img src="" alt="">
          <div class="descricoes-coluna-1">
            <span><strong>Título: </strong><span class="titulo-livro">{{ book.bookId.title? book.bookId.title : '---' }}</span></span>
            <span><strong>Status: </strong><span class="status-livro">{{ book.status? book.status : '---' }}</span></span>
            <span><strong>Avaliar: </strong></span>
          </div>
        </div>

        <div class="coluna-2-gerenciar-livro">
          <div class="descricoes-coluna-2">
            <span><strong>Data empréstimo: </strong><span class="titulo-livro">{{ formatDate(book.dataEmprestimo) || '---' }}</span></span>
            <span><strong>Prazo devolução: </strong><span class="status-livro">{{ formatDate(book.prazoDevolucao) || '---' }}</span></span>
            <span><strong>Data devolução: </strong> - - -</span>
          </div>
        </div>

        <div class="coluna-3-gerenciar-livro">
          <div class="renovar-livro">
            <span><strong>Renovar: </strong></span>
            <button class="botao-renovar">+ 10 dias</button>
          </div>
          <div class="finalizar-emprestimo">
            <span><strong>Finalizar: </strong></span>
            <button class="botao-finalizar">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="botao-ver-mais-historico" @click="loadMore">Ver mais</div>

  </main>
</template>

<script>
import axios from 'axios';
import { userService } from '@/services/api';

export default {
  props: ['id'],
  data() {
    return {
      user: '', // Variável para armazenar os dados do usuário
      textNotif: '',
      userLoans: [],
      userId: '',
      visibleLoans: 5 // Número inicial de linhas visíveis
    };
  },
  computed: {
    visibleUserLoans() {
      return this.userLoans
        .slice() // Cria uma cópia para evitar mutações no array original
        .sort((a, b) => {
          // Prioriza status "Solicitado"
          if (a.status === "Solicitado" && b.status !== "Solicitado") return -1;
          if (b.status === "Solicitado" && a.status !== "Solicitado") return 1;

          // Caso ambos não sejam "Solicitado", ordena por dataEmprestimo (mais recente primeiro)
          const dateA = new Date(a.dataEmprestimo);
          const dateB = new Date(b.dataEmprestimo);
          return dateB - dateA; // Decrescente (mais recente no topo)
        })
        .slice(0, this.visibleLoans); // Aplica a paginação
    },
  },

  methods: {
    async fetchUser() {
      const userId = localStorage.getItem("userId");
      try {
        this.user = await userService.getProfileById(userId);
        console.log('Dados do usuário:', this.user); // Verifique se os dados estão sendo recebidos corretamente
      } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
      }
    },
    
    
    async fetchBooksLend() {
      const userId = localStorage.getItem("userId");

      this.user = await userService.getProfileById(userId)
      
      if (!userId) {
        console.error("Usuário não encontrado ou ainda não carregado");
        return;
      }

      try {
        const response = await userService.getLend(userId);
        // console.log("Dados retornados:", response.data); // Verifica o formato dos dados
        if (response.data && response.data.emprestimos) {
          this.userLoans = response.data.emprestimos; // Salva os dados no estado
        } else {
          console.error("Emprestimos vazio ou dados inválidos:", response);
        }
      } catch (error) {
        console.error("Erro ao carregar os empréstimos:", error);
      }
    },
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
    // Método para carregar mais linhas
    loadMore() {
      this.visibleLoans += 5; // Incrementa mais 5 linhas
    },


  },
  mounted() {
    this.fetchUser(); // Chama o método ao montar o componente

    this.fetchBooksLend();

    this.formatDate();
  }
};
</script>

<style scoped>
.linha-devolvido-negado {
  background-color: #D9D9D9;
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
/* PERFIL DO USUARIO */

.main-perfil-usuario {
  width: 1072px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-perfil-usuario {
  width: 1012px;
  height: 168px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 20px;
}

.foto-do-perfil {
  border-radius: 50%;
  width: 150px; 
  height: 150px;
}

.coluna-perfil-usuario-1 {
  height: 168px;
  width: 506px;
  display: flex;
  flex-direction: row;
}

.coluna-identificadores {
  height: 168px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  margin-left: 30px;
}

.coluna-identificadores input {
  width: 300px;
  height: 47px;
  font-size: 18px;
  box-shadow: 0 2px 8px -2px #989898;
  border: none;
  border-radius: 5px;
}

.coluna-perfil-usuario-2 {
  height: 168px;
  width: 506px;
  display: flex;
  flex-direction: column;
  align-items: end;
}

.botao-editar-perfil {
  color: #0C8CE9;
  font-size: 18px;
  font-weight: bold;
}

.main-perfil-usuario hr {
  width: 1012px;
  height: 2px;
  margin: 10px 0 10px 0;
}

.main-perfil-usuario h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 5px 0;
  padding: 0;
}

.linha-gerenciar-livro {
  width: 1012px;
  height: 100px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}

.grid-colunas-da-linha {
  display: grid;
  grid-template-columns: 337px 337px 337px;
  grid-template-rows: 100px; 
  align-items: center;
}

.linha-gerenciar-livro span {
  font-size: 18px;
}

.coluna-1-gerenciar-livro {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
}

.coluna-1-gerenciar-livro img {
  width: 61px;
  height: 94px;
  margin-left: 10px;
}

.descricoes-coluna-1 {
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: space-between;
  margin-left: 20px;
}

.coluna-2-gerenciar-livro {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.descricoes-coluna-2 {
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: space-between;
}

.coluna-3-gerenciar-livro {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
  gap: 10px;
}

.renovar-livro {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}

.finalizar-emprestimo {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
}

.botao-renovar {
  width: 213px;
  height: 35px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  background-color: #fff;
  margin-left: 10px;
  font-size: 18px;
  font-family: 'Times New Roman';
}

.botao-renovar:hover {
  color: #0C8CE9;
  border: 1px solid #0C8CE9;
}

.botao-finalizar {
  width: 213px;
  height: 35px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  background-color: #00A65A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-left: 10px;
}

.botao-finalizar:hover {
  background-color: #00cc70;
  border: 1px solid #00A65A;
}

.botao-ver-mais-historico {
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
  margin-bottom: 10px;
}

.botao-ver-mais-historico:hover {
  background-color: #0C8CE9;
  color: #fff;
}

.emprestimo-finalizado {
  background-color: #d9d9d9;
}

.emprestimo-finalizado .botao-renovar {
  background-color: #d7d7d7;
}

.emprestimo-finalizado .botao-finalizar {
  background-color: #d7d7d7;
  color: #989898;
}
</style>
