<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
<header class="bloco-do-submenu">
  <section class="opcoes-submenu-adm">
    <router-link to="./perfiladm" class="opcao-menu">Dashboard</router-link>
    <router-link to="./admusers" class="opcao-menu" style="color: #0C8CE9;">Usuários</router-link>
    <router-link to="./admlivros" class="opcao-menu">Livros</router-link>
    <router-link to="./admnotificacoes" class="opcao-menu" style="text-align: center;">Notificação<br>Geral</router-link>
  </section>
  <form action="" id="formulario-buscar-usuario">
    <input type="text" placeholder="   Pesquisar por ID, nome, e-mail, hierarquia ou status">
    <button class="botao-busca">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
    </button>
  </form>
</header>


<main class="main-usuarios-adm">
  <div class="bloco-adm-usuarios">
    <div class="cabecalho-tabela-usuarios">
      <table class="texto-cabeçalho-usuarios">
        <thead>
          <tr>
            <th id="coluna-1">ID</th>
            <th id="coluna-2">Usuário</th>
            <th id="coluna-3">E-mail</th>
            <th id="coluna-4">Permissões</th>
            <th id="coluna-5">Equipe</th>
            <th id="coluna-6">Perfil</th>
            <th id="coluna-7">Status</th>
            <th id="coluna-8">Excluir</th>
          </tr>
        </thead>
      </table>
    </div>

    <table class="tabela-principal">
      <tbody>
        <tr>
          <td id="coluna-1">1</td>
          <td id="coluna-2">Luíz Eduardo</td>
          <td id="coluna-3">administrador@adm.com</td>
          <td id="coluna-4">
            <select name="" id="">
              <option value="">ADM</option>
              <option value="">Bibliotecario(a)</option>
              <option value="">Usuário</option>
            </select>
          </td>
          <td id="coluna-5">Verde</td>
          <td id="coluna-6">
            <a href="./perfil_usuarios_adm.html" class="icone-acessar-perfil">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
              </svg>
            </a>
          </td>
          <td id="coluna-7">
            <select name="" id="">
              <option value="">Ativo</option>
              <option value="">Bloqueado</option>
            </select>
          </td>
          <td id="coluna-8">
            <a href="" class="deletar-usuario">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </a>
          </td>
        </tr>

        <tr>
          <td id="coluna-1">2</td>
          <td id="coluna-2">Bibliotecario(a)</td>
          <td id="coluna-3">adm.blog@blog.com</td>
          <td id="coluna-4">
            <select name="" id="">
              <option value="">ADM</option>
              <option value="" selected>Bibliotecario(a)</option>
              <option value="">Usuário</option>
            </select>
          </td>
          <td id="coluna-5">Verde</td>
          <td id="coluna-6">
            <a href="./perfil_usuarios_adm.html" class="icone-acessar-perfil">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
              </svg>
            </a>
          </td>
          <td id="coluna-7">
            <select name="" id="">
              <option value="">Ativo</option>
              <option value="">Bloqueado</option>
            </select>
          </td>
          <td id="coluna-8">
            <a href="#" class="deletar-usuario">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </a>
          </td>
        </tr>

        <tr>
          <td id="coluna-1">3</td>
          <td id="coluna-2">Usuário comum</td>
          <td id="coluna-3">usuario.leior@gmail.com</td>
          <td id="coluna-4">
            <select name="" id="">
              <option value="">ADM</option>
              <option value="">Bibliotecario(a)</option>
              <option value="" selected>Usuário</option>
            </select>
          </td>
          <td id="coluna-5"></td>
          <td id="coluna-6">
            <a href="./perfil_usuarios_adm.html" class="icone-acessar-perfil">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
                <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4m4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5M9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8m1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5" />
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96q.04-.245.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1 1 0 0 1 1 12z" />
              </svg>
            </a>
          </td>
          <td id="coluna-7">
            <select name="" id="">
              <option value="">Ativo</option>
              <option value="">Bloqueado</option>
            </select>
          </td>
          <td id="coluna-8">
            <a href="#" class="deletar-usuario">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
              </svg>
            </a>
          </td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

        <tr>
          <td id="coluna-1">-</td>
          <td id="coluna-2"></td>
          <td id="coluna-3"></td>
          <td id="coluna-4"></td>
          <td id="coluna-5"></td>
          <td id="coluna-6"></td>
          <td id="coluna-7"></td>
          <td id="coluna-8"></td>
        </tr>

      </tbody>
    </table>

    <div class="paginas-tabela">
      <a href="" class="passador-paginas">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left-circle-fill sgv" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
        <p>Anterior</p>
      </a>
      <p>1 / 643</p>
      <a href="" class="passador-paginas">
        <p>Próximo</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-circle-fill sgv" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
        </svg>
      </a>
    </div>
  </div>
</main>  
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
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
/* USUÁRIOS - ADM */
#formulario-buscar-usuario {
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 8px -2px #989898;
  margin-right: 35px;
  border-radius: 5px;
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

.main-usuarios-adm {
  height: calc(100% - 170px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bloco-adm-usuarios {
  width: 1071px;
  height: 593px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cabecalho-tabela-usuarios {
  width: 1071px;
  height: 48px;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.texto-cabeçalho-usuarios {
  display: flex;
  flex-direction: row;
  margin: 10px 35px;
  border: none;
  text-align: center;
  font-size: 18px;
}

.bloco-adm-usuarios .tabela-principal {
  margin: 10px 35px;
  border: 1px solid black;
  text-align: center;
  background-color: #E7E7E7;
  font-size: 18px;
}

.bloco-adm-usuarios .tabela-principal td {
  border: 1px solid black;
  height: 30px; 
}

#coluna-1 {
  width: 58px;
}

#coluna-2 {
  width: 193px;
}

#coluna-3 {
  width: 240px;
}

#coluna-4 {
  width: 152px;
}

#coluna-5 {
  width: 74px;
}

#coluna-6 {
  width: 104px;
}

#coluna-7 {
  width: 92px;
}

#coluna-8 {
  width: 87px;
}

.tabela-principal select {
  border: none;
  text-align: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-family: 'Times New Roman';
}

.icone-acessar-perfil .svg {
  fill: #0C8CE9; 
  width: 20px;
  height: 20px;
  margin: 0;
  padding: 0;
}

.icone-acessar-perfil svg:hover {
  fill: #000; 
}

.deletar-usuario svg {
    fill: #ff1e00;
}

.deletar-usuario svg:hover {
    fill: #000;
}

.paginas-tabela {
  width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
}

.paginas-tabela p {
  margin: 0;
  padding: 0;
  font-size: 18px;
}

.bloco-adm-usuarios .passador-paginas {
  text-decoration: none;
  font-size: 18px;
  color: #0C8CE9;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.bloco-adm-usuarios .passador-paginas p {
  margin: 0;
  padding: 0;
}

.bloco-adm-usuarios .passador-paginas:hover {
  text-decoration: underline;
}

.svg {
    fill: #fff;
    stroke: #0C8CE9;
  }
</style>