<template>
  <header class="bloco-do-submenu">
    <section class="opcoes-submenu-adm">
      <router-link to="./perfiladm" class="opcao-menu">Dashboard</router-link>
      <router-link to="./admusers" class="opcao-menu">Usuários</router-link>
      <router-link to="./admlivros" class="opcao-menu">Livros</router-link>
      <router-link to="./admnotificacoes" class="opcao-menu" style="text-align: center;  color: #0C8CE9;">Notificação<br>Geral</router-link>
    </section>
  </header>

  <main class="main-notificacoes-gerais">
    <div class="conteudo-notificacao-geral">
      <div class="aviso-notificacao-geral"><span>*Observação: essa notificação aparecerá para todos os usuário. Para um usuário específico notifique-o através de seu perfil privado.</span></div>
      <form @submit.prevent="NotifGeneral">
        <div class="coluna-notificacoes-gerais">
          <div class="titulo-e-botao-enviar-geral">
            <div class="titulo-e-campo-titulo">
              <label class="titulo-dos-campos">Título da notificação *</label>
              <input v-model="title" type="text" placeholder=" Ex: Novidades: 20 cópias do livro: Manual de Javascript " class="campo-titulo-notificacao">
            </div>
            <div id="bloco-posicao-botao-notificacao">
              <button class="botao-enviar-notificacao-geral">Enviar</button>
            </div>
          </div>
          <textarea v-model="textNotifGeneral" class="campo-texto-notificacao-geral" placeholder=" Texto da notificação"></textarea>
        </div>
      </form>
    </div>

  </main>
</template>

<script>
import { generalNotif } from '@/services/api';

export default {
  data() {
    return {
      title: '', // Define o título como uma string vazia
      textNotifGeneral: '', // Define o texto como uma string vazia
    };
  },
  methods: {
    async NotifGeneral() {
      try {
        const response = await generalNotif.notifgeralPost({
          title: this.title,
          textNotifGeneral: this.textNotifGeneral,
        });
        console.log('Notificação enviada com sucesso:', response.data);
      } catch (error) {
        console.error('Erro ao enviar notificações:', error);
      }
    }
  }
}
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
/* NOTIFICAÇÕES GERAIS - ADM */
.main-notificacoes-gerais {
  width: 1072px;
  height: 615px;
  background-color: #fff;
  margin-top: 20px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-notificacao-geral {
  width: 1032px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aviso-notificacao-geral {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #F39C11;
  margin-top: 20px;
  width: 1032px;
  height: 40px;
  border-radius: 10px;
}

.aviso-notificacao-geral span {
  font-size: 18px;
}

.coluna-notificacoes-gerais {
  width: 1012px;
  display: flex;
  flex-direction: column;
}

.campo-titulo-notificacao {
  width: 492px;
  height: 47px;
  background-color: #E7E7E7;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  font-size: 18px;
  font-family: 'Times New Roman';
  padding-left: 10px;
}

.campo-texto-notificacao-geral{
  width: 1000px;
  height: 392px;
  border: none;
  background-color: #E7E7E7;
  box-shadow: 0 2px 8px -2px #989898;
  font-size: 18px;
  font-family: 'Times New Roman';
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 3px; 
  resize: none; /* Impede o redimensionamento do campo */
  overflow-y: auto; /* Permite rolagem vertical caso o texto ultrapasse o espaço */
  margin-top: 25px;
}

.titulo-e-botao-enviar-geral {
  display: flex;
  flex-direction: row;
}

.titulo-e-campo-titulo {
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-right: 20px;
}

.titulo-dos-campos {
  font-size: 18px;
  font-family: 'Times New Roman';
  margin: 16px 0 5px 0;
}

#bloco-posicao-botao-notificacao {
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
}

.botao-enviar-notificacao-geral {
  width: 173px;
  height: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0C8CE9;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 2px 8px -2px #989898;
}

.botao-enviar-notificacao-geral:hover {
  background-color: #fff;
  color: #0C8CE9;
  border: 1px solid #0C8CE9;
}
</style>