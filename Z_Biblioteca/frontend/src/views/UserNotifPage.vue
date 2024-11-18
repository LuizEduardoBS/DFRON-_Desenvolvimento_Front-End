<template>
  <header class="bloco-do-submenu">
    <section class="opcoes-submenu-usuario">
      <router-link to="./perfilusuario" class="opcao-menu">Perfil</router-link>
      <router-link to="./notificacaousuario" class="opcao-menu" style="text-align: center;  color: #0C8CE9;">Notificações</router-link>
      <router-link to="./carrinho" class="opcao-menu" style="text-align: center;">Carrinho de<br>Empréstimos</router-link>
      <router-link to="./reservas" class="opcao-menu">Reservas</router-link>
    </section>
  </header>

  <main class="main-usuario-notificacoes">
    <h1>Notificações</h1>

    <div class="card-notificacoes-usuario" v-for="notificacao in notificacoes" :key="notificacao._id">
      <div class="tipo-da-notificacao">
        <span><strong>Notificação</strong></span>
        <span><strong>{{ notificacao.status || notificacao.status }}</strong></span>
      </div>
      <div class="texto-da-notificacao">
        <h2><strong>{{ notificacao.title || "Atenção" }} - {{ formatDate(notificacao.dataNotif) }}</strong></h2>
        <p>{{ notificacao.textNotifGeneral || notificacao.textNotif }}</p>
      </div>
    </div>


    <div class="botao-ver-mais-historico-notificacoes">Ver mais</div>

  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { generalNotif, userService } from '@/services/api';

const notificacoes = ref([]); // Define o estado das notificações como um array reativo

// Função para formatar a data
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24h format
  };

  return new Intl.DateTimeFormat('pt-BR', options).format(date);
};

// Função para buscar notificações públicas
const fetchGeneralNotifications = async () => {
  try {
    const response = await generalNotif.getNotifGeral();
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar notificações gerais:', error);
    return [];
  }
};

// Função para buscar notificações privadas do usuário
const fetchPrivateNotifications = async (userId) => {
  try {
    const response = await userService.getNotifPrivate(userId);
    console.log(response); // Log para verificar a resposta antes de mesclar
    return response; // Retorna a lista de notificações privadas
  } catch (error) {
    console.error('Erro ao buscar notificações privadas:', error);
    return [];
  }
};


// Carrega as notificações quando o componente é montado
onMounted(async () => {
  const userId = localStorage.getItem("userId");

  const publicNotifications = await fetchGeneralNotifications();
  const privateNotifications = await fetchPrivateNotifications(userId);

  notificacoes.value = [...publicNotifications, ...privateNotifications];

  notificacoes.value.sort((a, b) => new Date(b.dataNotif) - new Date(a.dataNotif));
});

</script>



<style scoped>
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
/* NOTIFICAÇÕES DO USUARIO */

.main-usuario-notificacoes {
  width: 1072px;
  height: 100%;
  background-color: #fff;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.main-usuario-notificacoes h1 {
  font-size: 20px;
  margin: 10px 0 0 0;
}

.card-notificacoes-usuario {
  width: 1012px;
  min-height: 100px;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.tipo-da-notificacao {
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
}

.texto-da-notificacao {
  width: 850px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  font-size: 18px;
  
}

.texto-da-notificacao h2 {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 20px;
}


.botao-ver-mais-historico-notificacoes {
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

.botao-ver-mais-historico-notificacoes:hover {
  background-color: #0C8CE9;
  color: #fff;
}

</style>