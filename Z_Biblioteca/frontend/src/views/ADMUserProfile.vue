<template>
  <main class="main-perfil-usuarios-adm">
    <div class="conteudo-perfil-usuarios-adm">
      <div class="coluna-perfil-usuarios-adm-1">
        <img src="./img/person.png" alt="" class="foto-do-perfil">
        <div class="coluna-identificadores">
          <span><strong>ID: </strong> <span id="id-usuario">user.customId</span></span>
          <span><strong>Usuário: </strong><span id="nome-usuario">user.username</span></span>
          <span><strong>E-mail: </strong><span id="email-usuario">user.email</span></span>
          <span><strong>Permissões: </strong><span id="permissoes-usuario">
              <select name="" id="">
                <option value="">ADM</option>
                <option value="">Bibliotecario(a)</option>
                <option value="">Usuário</option>
              </select></span>
          </span>
          <span><strong>Status:</strong> <span id="status-usuario">
              <select name="" id="">
                <option value="">Ativo</option>
                <option value="">Bloqueado</option>
              </select>
            </span>
          </span>
        </div>
      </div>

      <div class="coluna-perfil-usuarios-adm-2">
        <form action="" class="formulario-notificacao-usuario">
          <div class="titulo-notificar-e-botao">
            <label><strong>Notificar</strong></label>
            <button type="submit">Enviar</button>
          </div>
          <textarea type="text" class="campo-notificar-usuario" placeholder=" O que deseja dizer a esse usuário?"></textarea>
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
        <tr class="linha-historico">
          <td class="coluna-1-historico-usuario">382</td>
          <td class="coluna-2-historico-usuario">George Samuel Cle...</td>
          <td class="coluna-3-historico-usuario">O Homem Mais Rico...</td>
          <td class="coluna-4-historico-usuario">
            <select name="" id="">
              <option value="">Solicitado</option>
              <option value="">Autorizado</option>
              <option value="">Negado</option>
            </select>
          </td>
          <td class="coluna-5-historico-usuario">15/08/2024</td>
          <td class="coluna-6-historico-usuario">30/08/2024</td>
          <td class="coluna-7-historico-usuario">---</td>
        </tr>
        <tr class="linha-historico">
          <td class="coluna-1-historico-usuario">-</td>
          <td class="coluna-2-historico-usuario"></td>
          <td class="coluna-3-historico-usuario"></td>
          <td class="coluna-4-historico-usuario"></td>
          <td class="coluna-5-historico-usuario"></td>
          <td class="coluna-6-historico-usuario"></td>
          <td class="coluna-7-historico-usuario"></td>
        </tr>
        <tr class="linha-historico">
          <td class="coluna-1-historico-usuario">-</td>
          <td class="coluna-2-historico-usuario"></td>
          <td class="coluna-3-historico-usuario"></td>
          <td class="coluna-4-historico-usuario"></td>
          <td class="coluna-5-historico-usuario"></td>
          <td class="coluna-6-historico-usuario"></td>
          <td class="coluna-7-historico-usuario"></td>
        </tr>
        <tr class="linha-historico">
          <td class="coluna-1-historico-usuario">-</td>
          <td class="coluna-2-historico-usuario"></td>
          <td class="coluna-3-historico-usuario"></td>
          <td class="coluna-4-historico-usuario"></td>
          <td class="coluna-5-historico-usuario"></td>
          <td class="coluna-6-historico-usuario"></td>
          <td class="coluna-7-historico-usuario"></td>
        </tr>
        <tr class="linha-historico">
          <td class="coluna-1-historico-usuario">-</td>
          <td class="coluna-2-historico-usuario"></td>
          <td class="coluna-3-historico-usuario"></td>
          <td class="coluna-4-historico-usuario"></td>
          <td class="coluna-5-historico-usuario"></td>
          <td class="coluna-6-historico-usuario"></td>
          <td class="coluna-7-historico-usuario"></td>
        </tr>
      </tbody>
    </table>

    <div class="botao-ver-mais-historico">Ver mais</div>

  </main>
</template>

<script>
import { userService } from '@/services/api';

export default {
  props: ['id'],
  data() {
    return {
      user: null, // Variável para armazenar os dados do usuário
    };
  },
  methods: {
    async fetchUser() {
      try {
        this.user = await userService.getProfileById(this.id);
        console.log('Dados do usuário:', this.user); // Verifique se os dados estão sendo recebidos corretamente
      } catch (error) {
        console.error('Erro ao buscar o perfil do usuário:', error);
      }
    }
  },
  mounted() {
    this.fetchUser(); // Chama o método ao montar o componente
  }
};
</script>



<style scoped>
/* ########################################### */
/* VISUALIZAÇÃO PERFIL DO USUARIO - ADM */
.main-perfil-usuarios-adm {
  width: 1072px;
  height: 593px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
}

.botao-ver-mais-historico:hover {
  background-color: #0C8CE9;
  color: #fff;
}
</style>