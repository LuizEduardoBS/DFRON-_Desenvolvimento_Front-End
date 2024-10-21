<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

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

    <div class="card-notificacoes-usuario">
      <div class="tipo-da-notificacao">
        <span><strong>Notificação</strong></span>
        <span><strong>PRIVADA</strong></span>
      </div>
      <div class="texto-da-notificacao">
        <P>Caro usuário, notamos que possui livros com prazos de devolução vencidos. Por gentileza compareça a biblioteca e regularize sua situação para continuar aproveitando nossos livros.</P>
      </div>
    </div>

    <div class="card-notificacoes-usuario">

    </div>

    <div class="card-notificacoes-usuario">

    </div>

    <div class="card-notificacoes-usuario">

    </div>

    <div class="card-notificacoes-usuario">

    </div>

    <div class="card-notificacoes-usuario">

    </div>

    <div class="botao-ver-mais-historico-notificacoes">Ver mais</div>

  </main>
</template>

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
/* NOTIFICAÇÕES DO USUARIO */

.main-usuario-notificacoes {
  width: 1072px;
  height: 756px;
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
  height: 100px;
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
  max-width: 850px;
  max-height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
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
  
}

.botao-ver-mais-historico-notificacoes:hover {
  background-color: #0C8CE9;
  color: #fff;
}

</style>