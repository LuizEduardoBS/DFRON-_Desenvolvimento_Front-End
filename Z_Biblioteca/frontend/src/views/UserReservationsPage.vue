<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bloco-do-submenu">
    <section class="opcoes-submenu-usuario">
      <router-link to="./perfilusuario" class="opcao-menu">Perfil</router-link>
      <router-link to="./notificacaousuario" class="opcao-menu">Notificações</router-link>
      <router-link to="./carrinho" class="opcao-menu" style="text-align: center;">Carrinho de<br>Empréstimos</router-link>
      <router-link to="./reservas" class="opcao-menu" style="color: #0C8CE9;">Reservas</router-link>
    </section>
  </header>

  <main class=" main-usuario-reservas">
    <div class="conteudo-bloco-reservas">

      <div class="bloco-cards-reservas">

        <div class="card-reserva">
          <div class="icone-excluir-card-reserva">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
          <img src="" alt="">
          <div>
            <span>Nome do livro<br>Aparece aqui</span>
          </div>
          <div>
            <span><strong>Status</strong> <span class="status-livro-reservado" id="">Indisponível</span></span>
          </div>
          <div>
            <span><strong>Previsão</strong> <span id="">03/09/2024</span></span>
          </div>
        </div>

        <div class="card-reserva">
          <div class="icone-excluir-card-reserva">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
          <img src="" alt="">
          <div>
            <span>Nome do livro<br>Aparece aqui</span>
          </div>
          <div>
            <span><strong>Status</strong> <span class="status-livro-reservado" id="">Indisponível</span></span>
          </div>
          <div>
            <span><strong>Previsão</strong> <span id="">03/09/2024</span></span>
          </div>
        </div>

        <div class="card-reserva">
          <div class="icone-excluir-card-reserva">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg>
          </div>
          <img src="" alt="">
          <div>
            <span>Nome do livro<br>Aparece aqui</span>
          </div>
          <div>
            <span><strong>Status</strong> <span class="status-livro-reservado" id="">Indisponível</span></span>
          </div>
          <div>
            <span><strong>Previsão</strong> <span id="">03/09/2024</span></span>
          </div>
        </div>
      </div>

      <div class="bloco-botao-reservas">
        <div class="botao-solicitar-emprestimo-reservas"><span>Solicitar Empréstimo</span></div>
      </div>
    </div>
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
/* RESERVAS DO USUARIO */
.main-usuario-reservas {
  width: 1072px;
  height: 480px;
  margin-top: 20px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.conteudo-bloco-reservas {
  width: 1032px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.bloco-cards-reservas {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
}

.card-reserva {
  width: 320px;
  height: 342px;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 8px;
}

.icone-excluir-card-reserva {
  width: 320px;
  height: 300px;
  position: absolute;
  display: flex;
  justify-content: end;
  margin-top: -25px;
  margin-right: 10px;
}

.icone-excluir-card-reserva svg:hover {
  fill: #ff0000;
}

.card-reserva img {
  width: 132px;
  height: 200px;
}

.status-livro-reservado {
  color: #ff0000;
  font-weight: bold;
}

.bloco-botao-reservas {
  gap: 20px;
  margin-top: 20px;
}

.botao-solicitar-emprestimo-reservas {
  width: 215px;
  height: 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #d9d9d9;
  font-size: 18px;
  font-weight: bold;
  color: #8e8e8e;
  border-radius: 10px;
  box-shadow: 0 2px 8px -2px #989898;
}

.botao-solicitar-emprestimo-reservas:hover {
  background-color: #e7e7e7;
}
</style>