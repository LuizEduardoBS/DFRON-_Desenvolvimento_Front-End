<template>
  <main class="main-perfil-usuarios-adm">
    <router-link to="/admusers" class="botao-voltar-pagina-anterior">Voltar</router-link>
    <div class="conteudo-perfil-usuarios-adm">
      <div class="coluna-perfil-usuarios-adm-1">
        <img :src="user?.data?.imagePerfil ? formatImagePath(user.data.imagePerfil) : defaultImage" alt="Foto do usuário" class="foto-do-perfil">
        <div v-if="user" class="coluna-identificadores">
          <span><strong>ID: </strong><span id="id-usuario">{{ user.data.customId }}</span></span>       
          <span><strong>Usuário: </strong><span id="nome-usuario">{{ user.data.username }}</span></span>
          <span><strong>E-mail: </strong><span id="email-usuario">{{ user.data.email }}</span></span>
          <span><strong>Permissões: </strong><span id="permissoes-usuario">
            <select name="" id="" v-model="user.data.permissions" @change="atualizarPermissao(user.data._id, $event)" :disabled="user.data.permissions === 'ADM'">
              <option value="ADM" disabled :selected="user.data.permissions === 'ADM'">ADM</option>
              <option value="Bibliotecario(a)" :selected="user.data.permissions === 'Bibliotecario(a)'">Bibliotecario(a)</option>
              <option value="Usuário" :selected="user.data.permissions === 'Usuário'">Usuário</option>
            </select></span>
          </span>
          <span><strong>Status:</strong> <span id="status-usuario">
            <select name="" id="" v-model="user.data.status" @change="atualizarStatus(user.data._id, $event)" :disabled="user.data.permissions === 'ADM'">
              <option value="Ativo" :selected="user.data.status === 'Ativo'">Ativo</option>
              <option value="Bloqueado" :selected="user.data.status === 'Bloqueado'">Bloqueado</option>
            </select>
            </span>
          </span>
        </div>

        <div v-else class="coluna-identificadores">
          <span><strong>ID: </strong><span id="id-usuario">...</span></span>       
          <span><strong>Usuário: </strong><span id="nome-usuario">...</span></span>
          <span><strong>E-mail: </strong><span id="email-usuario">...</span></span>
          <span><strong>Permissões: </strong><span id="permissoes-usuario">
              <select name="" id="">
                <option value="" selected disabled>...</option>
              </select></span>
          </span>
          <span><strong>Status:</strong> <span id="status-usuario">
              <select name="" id="">
                <option value="" selected disabled>...</option>
              </select>
            </span>
          </span>
        </div>
      </div>

      <div class="coluna-perfil-usuarios-adm-2">
        <form @submit.prevent="sendNotif()" class="formulario-notificacao-usuario">
          <div class="titulo-notificar-e-botao">
            <label><strong>Notificar</strong></label>
            <button type="submit">Enviar</button>
          </div>
          <textarea v-model="textNotif" type="text" class="campo-notificar-usuario" placeholder=" O que deseja dizer a esse usuário?"></textarea>
        </form>
      </div>
    </div>

    <hr>

    <h1>Histórico</h1>

    <table class="tabela-historico-usuario">
      <thead>
        <tr>
          <th class="coluna-1-historico-usuario">ID</th>
          <th class="coluna-2-historico-usuario">Autor</th>
          <th class="coluna-3-historico-usuario">Título</th>
          <th class="coluna-4-historico-usuario">Status</th>
          <th class="coluna-5-historico-usuario">Data empréstimo</th>
          <th class="coluna-6-historico-usuario">Prazo devolução</th>
          <th class="coluna-7-historico-usuario">Data devolução</th>
        </tr>
      </thead>
    </table>

    <table class="tabela-historico-usuario">
      <tbody>
        <tr 
          class="linha-historico" 
          v-for="book in visibleUserLoans" 
          :key="book.bookId._id"
          :class="{'linha-devolvido-negado': book.status === 'Devolvido' || book.status === 'Negado'}"
        >
          <td class="coluna-1-historico-usuario">{{ book.bookId.customId || '---' }}</td>
          <td class="coluna-2-historico-usuario">{{ book.bookId.author || '---' }}</td>
          <td class="coluna-3-historico-usuario">{{ book.bookId.title || '---' }}</td>
          <td class="coluna-4-historico-usuario">
            <select 
              v-model="book.status" 
              @change="atualizarStatusEmprestimo(user.data._id, book._id, $event)"
              :class="{'linha-devolvido-negado': book.status === 'Devolvido' || book.status === 'Negado'}"
            >
              <option value="Solicitado" :selected="book.status === 'Solicitado'">Solicitado</option>
              <option value="Autorizado" :selected="book.status === 'Autorizado'">Autorizado</option>
              <option value="Checkout Devolução" :selected="book.status === 'Checkout Devolução'">Checkout Devolução</option>
              <option value="Devolvido" :selected="book.status === 'Devolvido'">Devolvido</option>
              <option value="Negado" :selected="book.status === 'Negado'">Negado</option>
            </select>
          </td>
          <td class="coluna-5-historico-usuario">{{ formatDate(book.dataEmprestimo) || '---' }}</td>
          <td class="coluna-6-historico-usuario">{{ formatDate(book.prazoDevolucao) || '---' }}</td>
          <td class="coluna-7-historico-usuario">{{ formatDate(book.dataDevolucao) || '---' }}</td>
        </tr>
        
      </tbody>
    </table>

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
    formatImagePath(path) {
      // Corrige as barras e adiciona o caminho completo da URL
      return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
    },
    async fetchUser() {
      try {
        this.user = await userService.getProfileById(this.id);
        
        console.log('Dados do usuário:', this.user.data.imagePerfil); // Verifique se os dados estão sendo recebidos corretamente
      } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
      }
    },
    async atualizarPermissao(userId, event) {
      const novaPermissao = event.target.value;
      try {
        const response = await axios.put(`http://localhost:3000/api/auth/${userId}/permissions`, {
          permissions: novaPermissao
        });
        console.log('Permissão atualizada:', response.data);
      } catch (error) {
        console.error('Erro ao atualizar permissão:', error);
      }
    },
    async atualizarStatus(userId, event) {
      const novoStatus = event.target.value;
      try {
        const response = await axios.put(`http://localhost:3000/api/auth/${userId}/status`, {
          status: novoStatus
        });
        console.log('Status atualizado:', response.data);
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
      }
    },
    async sendNotif() {
      try {
        const response = await userService.postNotifPrivate(this.user.data._id, { textNotif: this.textNotif });
        console.log('Notificação enviada com sucesso:', response.data);
        this.textNotif = ''; // Limpa o campo de texto após o envio
      } catch (error) {
        console.error('Erro ao enviar notificações:', error);
      }
    },
    async fetchBooksLend() {
      this.user = await userService.getProfileById(this.id)
      const userId = this.user.data._id;
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
    async atualizarStatusEmprestimo(userId, emprestimoId, event) {
      const novoStatus = event.target.value;

      if (novoStatus === 'Devolvido') {
        // Exibe a confirmação para o usuário
        const confirmar = confirm("Você deseja confirmar a devolução deste livro?");
        if (!confirmar) {
          // Se o usuário cancelar, não altera o status no frontend
          event.target.value = this.userLoans.find(loan => loan._id === emprestimoId).status;
          return;
        }

        try {
          // Atualiza o status no backend antes de processar a devolução
          const response = await axios.put(
            `http://localhost:3000/api/auth/${userId}/emprestimos/${emprestimoId}/status`, 
            { status: 'Devolvido' }
          );

          // Após a confirmação, processa a devolução
          const devolucaoResponse = await axios.put(
            `http://localhost:3000/api/auth/${userId}/emprestimos/${emprestimoId}/devolver`
          );

          // Atualiza os dados localmente após o sucesso
          console.log('Devolução processada com sucesso:', devolucaoResponse.data);
          this.fetchBooksLend(); // Atualiza a lista de empréstimos no frontend
        } catch (error) {
          console.error('Erro ao processar devolução:', error);
        }
      } else {
        try {
          // Atualiza o status no backend para outros casos
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

.botao-voltar-pagina-anterior {
  align-self: flex-start;
  justify-self: flex-start;
  margin: 10px;
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  padding: 2px 5px 2px 5px;
  border-radius: 5px;
  background-color: #0C8CE9;
}
/* ########################################### */
/* VISUALIZAÇÃO PERFIL DO USUARIO - ADM */
.main-perfil-usuarios-adm {
  width: 1072px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

}

.conteudo-perfil-usuarios-adm {
  width: 1012px;
  height: 168px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  
}

.foto-do-perfil {
  border-radius: 50%;
  width: 150px; 
  height: 150px;
}

.coluna-perfil-usuarios-adm-1 {
  height: 168px;
  width: 506px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.coluna-identificadores {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  height: 168px;
  justify-content: space-between;
  margin-left: 30px;
}

.coluna-perfil-usuarios-adm-1 select {
  text-align: center;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  width: 150px;
}

.coluna-perfil-usuarios-adm-2 {
  height: 168px;
  width: 506px;
  display: flex;
  flex-direction: column;
}

.titulo-notificar-e-botao {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.titulo-notificar-e-botao button {
  width: 124px;
  height: 30px;
  background-color: #0C8CE9;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  font-family: 'Times New Roman';
}

.titulo-notificar-e-botao button:hover {
  background-color: #fff;
  color: #0C8CE9;
  border: 1px solid #0C8CE9;
}

.coluna-perfil-usuarios-adm-2 .formulario-notificacao-usuario {
  display: flex;
  flex-direction: column;
  font-size: 18px;
}

.formulario-notificacao-usuario .campo-notificar-usuario {
  font-size: 18px;
  font-family: 'Times New Roman';
  height: 130px;
  width: 500px;
  background-color: #E7E7E7;
  border-radius: 5px;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 10px;
}

.main-perfil-usuarios-adm hr {
  width: 1012px;
  height: 2px;
  margin: 20px 0 10px 0;
}

.main-perfil-usuarios-adm h1 {
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
  padding: 0;
}

.tabela-historico-usuario table {
  border-collapse: collapse;
}

.tabela-historico-usuario td {
  border: none;
}

.tabela-historico-usuario {
  border: none;
  
}

.tabela-historico-usuario {
  width: 1012px;
  text-align: center;
}

.coluna-1-historico-usuario {
  width: 62px;
}

.coluna-2-historico-usuario {
  width: 192px;
}

.coluna-3-historico-usuario {
  width: 192px;
}

.coluna-4-historico-usuario {
  width: 146px;
}

.coluna-4-historico-usuario select {
  font-size: 18px;
  font-family: 'Times New Roman';
  text-align: center;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  padding: 0;
  margin: 0;
}

.coluna-5-historico-usuario {
  width: 149px;
}

.coluna-6-historico-usuario {
  width: 140px;
}

.coluna-7-historico-usuario {
  width: 131px;
}

.linha-historico {
  height: 47px;
  width: 1000px;
  box-shadow: 0 2px 8px -2px #989898;
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
</style>