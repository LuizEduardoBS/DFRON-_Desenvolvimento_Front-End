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
        <img :src="user?.data?.imagePerfil ? formatImagePath(user.data.imagePerfil) : defaultImage" alt="Foto do usuário" class="foto-do-perfil">
        <div class="coluna-identificadores">
          <input type="text" :value="user.data?.username || 'Carregando...'" disabled placeholder="Nome do Usuário" style="padding-left: 10px;">
          <input type="text" :value="user.data?.email || 'Carregando...'"  disabled placeholder="email@email.com" style="padding-left: 10px;">
        </div>
      </div>

      <div class="coluna-perfil-usuario-2">
        <router-link to="/editar_perfil_usuario" class="botao-editar-perfil">Editar Perfil</router-link>
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
          <img :src="formatImagePath(book.bookId.coverImage)" alt="">
          <div class="descricoes-coluna-1">
            <span><strong>Título: </strong><span class="titulo-livro">{{ book.bookId.title? book.bookId.title : '---' }}</span></span>
            <span><strong>Status: </strong><span class="status-livro">{{ book.status? book.status : '---' }}</span></span>
            <span><strong>Avaliar: </strong>
              <select id="avaliacao" required v-model="book.bookId.rating" @change="ratingBook(book.bookId._id, $event)">
                  <option value="" disabled selected>Avalie aqui</option>
                  <option value="1">★☆☆☆☆</option>
                  <option value="2">★★☆☆☆</option>
                  <option value="3">★★★☆☆</option>
                  <option value="4">★★★★☆</option>
                  <option value="5">★★★★★</option>
              </select>
              <!-- Ícone de comentário -->
              <svg @click="abrirComentario(book.bookId._id)"  xmlns="http://www.w3.org/2000/svg" width="16" height="16" cursor="pointer" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>

            </span>
          </div>
        </div>

        <div class="coluna-2-gerenciar-livro">
          <div class="descricoes-coluna-2">
            <span><strong>Data empréstimo: </strong><span class="titulo-livro">{{ formatDate(book.dataEmprestimo) || '---' }}</span></span>
            <span><strong>Prazo devolução: </strong><span class="status-livro">{{ formatDate(book.prazoDevolucao) || '---' }}</span></span>
            <span><strong>Data devolução: </strong>{{ formatDate(book.dataDevolucao) || '---' }}</span>
          </div>
        </div>

        <div class="coluna-3-gerenciar-livro">
          <div class="renovar-livro">
            <span><strong>Renovar: </strong></span>
            <button class="botao-renovar"
              @click="isButtonDisabled(book.dataEmprestimo, book.prazoDevolucao) || book.status === 'Devolvido' || book.status === 'Negado' || book.status === 'Checkout Devolução' ? null : renovarPrazo(book._id)"
              :disabled="isButtonDisabled(book.dataEmprestimo, book.prazoDevolucao) || book.status === 'Devolvido' || book.status === 'Negado' || book.status === 'Checkout Devolução'"
              :style="{backgroundColor: isButtonDisabled(book.dataEmprestimo, book.prazoDevolucao) || book.status === 'Devolvido' || book.status === 'Negado' || book.status === 'Checkout Devolução' ? '#D9D9D9' : '',
                cursor: isButtonDisabled(book.dataEmprestimo, book.prazoDevolucao) || book.status === 'Devolvido' || book.status === 'Negado' ? 'not-allowed' : 'pointer',}">
              + 10 dias
            </button>
          </div>
          <div class="finalizar-emprestimo">
            <span><strong>Finalizar: </strong></span>
            <button class="botao-finalizar"
              @click="book.status === 'Devolvido' || book.status === 'Negado' || book.status === 'Checkout Devolução' ? null : confirmarDevolucao(book._id)"
              :disabled="book.status === 'Devolvido' || book.status === 'Negado'"
              :style="{ backgroundColor: book.status === 'Devolvido' || book.status === 'Negado' || book.status === 'Checkout Devolução' ? '#D9D9D9' : '',
                cursor: book.status === 'Devolvido' || book.status === 'Negado' || book.status === 'Checkout Devolução' ? 'not-allowed' : 'pointer' }"
            >
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
import defaultImage from '@/assets/img/person.png'; // Importa a imagem padrão

export default {
  props: ['id'],
  data() {
    return {
      user: '', // Variável para armazenar os dados do usuário
      textNotif: '',
      userLoans: [],
      userId: '',
      visibleLoans: 5, // Número inicial de linhas visíveis
      defaultImage, // Define a imagem padrã
    };
  },
  computed: {
    visibleUserLoans() {
      return this.userLoans
        .slice() // Cria uma cópia para evitar mutações no array original
        .sort((a, b) => {
          // Define os grupos de prioridade
          const prioridadeAlta = ["Solicitado", "Autorizado", "Checkout Devolução"];
          const prioridadeBaixa = ["Negado", "Devolvido"];

          // Verifica a qual grupo cada status pertence
          const grupoA = prioridadeAlta.includes(a.status) ? 1 : 2; // 1 = Alta, 2 = Baixa
          const grupoB = prioridadeAlta.includes(b.status) ? 1 : 2;

          // Coloca os grupos de prioridade alta acima dos de baixa
          if (grupoA !== grupoB) return grupoA - grupoB;

          // Dentro do mesmo grupo (prioridade alta ou baixa), ordena por dataEmprestimo
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
    async renovarPrazo(emprestimoId) {
      const userId = localStorage.getItem('userId'); 
      try {
        const response = await axios.put(`http://localhost:3000/api/auth/${userId}/emprestimos/${emprestimoId}/prazo_devolucao`);
        const novoPrazo = response.data.novoPrazo;

        const emprestimoAtualizado = this.userLoans.find(loan => loan._id === emprestimoId);
        if (emprestimoAtualizado) {
          emprestimoAtualizado.prazoDevolucao = novoPrazo;
        }
        alert(`Prazo de devolução atualizado com sucesso para: ${this.formatDate(novoPrazo)}`);
      } catch (error) {
        console.error('Erro ao renovar prazo:', error);
        alert('Não foi possível renovar o prazo. Tente novamente mais tarde.');
      }
    },
    async confirmarDevolucao(emprestimoId) {
      const confirmar = confirm("Você tem certeza que deseja informar a devolução?");
      if (confirmar) {
        // Se o usuário confirmar, chama a função informarDevolução
        await this.informarDevolucao(emprestimoId);
      }
      // Caso o usuário cancele, nada acontece
    },
    async informarDevolucao(emprestimoId) {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("ID do usuário não encontrado no localStorage.");
        return;
      }

      try {
        const response = await axios.put(`http://localhost:3000/api/auth/${userId}/emprestimos/${emprestimoId}/informar_devolucao`, {
          status: "Checkout Devolução" // Aqui você pode ajustar para o status desejado
        });

        console.log("Status atualizado:", response.data);

        // Atualizar o status no array userLoans local
        const emprestimoAtualizado = this.userLoans.find(loan => loan._id === emprestimoId);
        if (emprestimoAtualizado) {
          emprestimoAtualizado.status = "Checkout Devolução";
        }

        alert("Devolução informada com sucesso!");
      } catch (error) {
        console.error("Erro ao atualizar status:", error);
        alert("Erro ao informar a devolução. Tente novamente.");
      }
    },
    async atualizarStatus(userId, emprestimoId, event) {
      const novoStatus = event.target.value;

      if (novoStatus === 'Checkout Devolução') {
        // Exibe a confirmação para o usuário
        const confirmar = confirm("Você deseja confirmar a devolução deste livro?");
        if (!confirmar) {
          // Se o usuário cancelar, não altera o status no frontend
          event.target.value = this.userLoans.find(loan => loan._id === emprestimoId).status;
          return;
        }

        try {
          // Chama a rota para processar a devolução no backend
          const response = await axios.put(
            `http://localhost:3000/api/auth/${userId}/emprestimos/${emprestimoId}/devolver`
          );

          // Atualiza os dados localmente após o sucesso
          console.log('Devolução processada com sucesso:', response.data);
          this.fetchBooksLend(); // Atualiza a lista de empréstimos no frontend
        } catch (error) {
          console.error('Erro ao processar devolução:', error);
        }
      } else {
        try {
          // Atualiza o status no backend se não for "Checkout Devolução"
          const response = await axios.put(
            `http://localhost:3000/api/auth/${userId}/emprestimos/${emprestimoId}/status`,
            { status: novoStatus }
          );

          console.log('Status atualizado:', response.data);
        } catch (error) {
          console.error('Erro ao atualizar status:', error);
        }
      }
    },
    
    isButtonDisabled(dataEmprestimo, prazoDevolucao) {
      if (!dataEmprestimo || !prazoDevolucao) return true; // Caso falte alguma data, desabilita o botão
      const emprestimo = new Date(dataEmprestimo);
      const prazo = new Date(prazoDevolucao);

      // Calcula a diferença em milissegundos e converte para dias
      const diffInTime = prazo.getTime() - emprestimo.getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);

      return diffInDays > 15; // Retorna true se a diferença for maior que 10 dias
    },
    formatImagePath(path) {
      return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
    },
    async ratingBook(bookId, event) {
      const rating = event.target.value; // Obtém o valor selecionado no dropdown
      try {
        const userId = localStorage.getItem("userId"); // Identificador do usuário
        if (!userId) {
          console.error("Usuário não encontrado.");
          return;
        }
        // Faz uma requisição PUT para atualizar ou criar a avaliação
        const response = await axios.put(
          `http://localhost:3000/api/books/${bookId}/rating`, 
          { rating, userId } // Envia o rating e o userId no corpo da requisição
        );

        console.log("Avaliação atualizada com sucesso:", response.data);

        // Atualiza a avaliação no frontend (se necessário)
        const livroAtualizado = this.userLoans.find(book => book.bookId._id === bookId);
        if (livroAtualizado) {
          livroAtualizado.bookId.rating = rating; // Atualiza localmente a avaliação
        }
      } catch (error) {
        console.error("Erro ao atualizar a avaliação:", error);
      }
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
