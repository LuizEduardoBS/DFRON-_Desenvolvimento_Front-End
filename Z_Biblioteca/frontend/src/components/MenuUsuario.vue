<template>
  <header class="bloco-do-menu">
    <div class="top-bar-index">

      <div class="logo">
        <img src="./img/Bliblioteca (1)-Photoroom.png" alt="BBLTC Biblioteca">
      </div>

      <section class="opcoes-logado-adm">
        <a href="./index.html" class="opcao-menu">Home</a>
        <a href="./acervo.html" class="opcao-menu">Acervo</a>
        <a href="./politicas.html" class="opcao-menu">Políticas</a>
        <a href="./sobre.html" class="opcao-menu">Sobre</a>
        <a href="./login.html" class="opcao-menu" id="usuario-menu">"nome-usuario"<img src="./img/person.png"></a>
      </section>
    </div>
  </header>
</template>

<style scoped>
.bloco-do-menu {
  width: 100%;
  height: 90px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
}

.top-bar-index {
  width: 1032px;
  height: 44px;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
}

.bloco-do-menu img {
  width: 150px;
  height: 100%;
  margin-top: 0;
  padding-left: 20px;
}

.opcoes-logado-adm {
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  gap: 20px;
}
.opcoes-logado-adm .opcao-menu {
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

.opcoes-logado-adm .opcao-menu:hover {
  color: #0C8CE9;
  text-decoration: underline;
}

.opcoes-logado-adm .opcao-menu img {
  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 29px;
  margin-left: 5px;
  padding-right: 90px;
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
</style>