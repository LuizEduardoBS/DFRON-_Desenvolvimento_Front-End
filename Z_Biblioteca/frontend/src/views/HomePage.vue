<template>
  <main class="main-index">
    <div class="bloco-index-busca">
      <span class="texto-bem-vindo">Bem-vindo!</span>
      <p>Faça login para ter acesso a empréstimos de livros ou Cadastre-se aqui.</p>
      <form>
        <input type="text" placeholder="  Digite aqui o livro que você procura">
        <button>Buscar</button>
      </form>
    </div>

    <div class="bloco-destaques-index">
      <p class="titulo-livros-destaque">Livros em destaque:</p>
      <div class="bloco-cards-destaques">
        <div class="card-livro-destaque">
          <img src="" alt="">
          <span class="titulo-livros-index">Aqui aparecerá o título do livro!!!</span>
          <button class="botao-adicionar-index">Adicionar</button>
        </div>
        <div class="card-livro-destaque">
          <img src="" alt="">
          <span class="titulo-livros-index">Aqui aparecerá o título do livro!!!</span>
          <button class="botao-adicionar-index">Adicionar</button>
        </div>
        <div class="card-livro-destaque">
          <img src="" alt="">
          <span class="titulo-livros-index">Aqui aparecerá o título do livro!!!</span>
          <button class="botao-adicionar-index">Adicionar</button>
        </div>
        <div class="card-livro-destaque">
          <img src="" alt="">
          <span class="titulo-livros-index">Aqui aparecerá o título do livro!!!</span>
          <button class="botao-adicionar-index">Adicionar</button>
        </div>
        <div class="card-livro-destaque">
          <img src="" alt="">
          <span class="titulo-livros-index">Aqui aparecerá o título do livro!!!</span>
          <button class="botao-adicionar-index">Adicionar</button>
        </div>
        <div class="card-livro-destaque">
          <img src="" alt="">
          <span class="titulo-livros-index">Aqui aparecerá o título do livro!!!</span>
          <button class="botao-adicionar-index">Adicionar</button>
        </div>
      </div>
    </div>

    <div class="bloco-categoria">
      <div class="texto-categoria-index">
        <span>Categorias</span>
      </div>
      <div class="lista-categorias">
        <a href="#">Literatura e Ficção</a>
        <a href="#">Infantil e HQ’s</a>
        <a href="#" class="textos-cada-categoria">Informática e Técnologia</a>

        <a href="#">Técnicos e Acadêmicos</a>
        <a href="#">Saúde e Bem Estar</a>
        <a href="#">Autoajuda e Espiritualidade</a>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-index {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bloco-index-busca {
  background-color: #fff;
  width: 1072px;
  height: 300px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.texto-bem-vindo {
  font-size: 30px;
  text-decoration: underline;
  font-weight: bold;
  padding: 0;
  margin: 0;
}

.bloco-index-busca input {
  width: 578px;
  height: 47px;
  font-size: 18px;
  border-radius: 10px;
  border: none;
  background-color: #E7E7E7; 
  box-shadow: 0 2px 8px 0px #989898;
}

form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
}

.bloco-index-busca button {
  width: 173px;
  height: 47px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #0C8CE9;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  cursor: pointer;
}

.bloco-index-busca button:hover {
  border: 1px solid #0C8CE9;
  background-color: #fff;
  color: #0C8CE9;
}

.bloco-index-busca p {
  font-size: 18px;
}

/* DESTAQUES - INDEX */
.bloco-destaques-index {
  width: 1072PX;
  height: 316PX;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #FFF;
  box-shadow: 0 2px 8px -2px #989898;
}

.titulo-livros-destaque {
  padding: 0;
  margin: 0;
  height: 47px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
}

.bloco-cards-destaques {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.bloco-cards-destaques:hover > :not(:hover) {
  opacity: .4;
  transform: scale(0.9);
}

.card-livro-destaque {
  width: 143px;
  height: 248px;
  border-radius: 10px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 5px;
  transition: .35s;
  cursor: pointer;
}

.card-livro-destaque img {
  height: 163px;
  width: 106px;
  margin: 0;
  padding: 0;
  margin-top: 6px;
}

.titulo-livros-index {
  text-align: center;
  font-size: 18px;
  padding: 0;
  margin: 0;
}

.botao-adicionar-index {
  width: 120px;
  height: 23px;
  background-color: #0C8CE9;
  font-size: 15px;
  font-weight: bold;
  color: #FFF;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.botao-adicionar-index:hover {
  border: 1px solid #0C8CE9;
  background-color: #fff;
  color: #0C8CE9;
}

/* CATEGORIAS */
.bloco-categoria {
  width: 1072PX;
  height: 316PX; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #FFF;
  margin-top: 20px;
  box-shadow: 0 2px 8px -2px #989898;
}

.lista-categorias {
  width: 700px;
  height: 150px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 16px;
  column-gap: 16px;
  justify-content: center;
}

.texto-categoria-index {
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 20px;
  padding-top: 0;
}

.lista-categorias a {
  width: 231px;
  height: 34px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
  padding-bottom: 0;
  font-size: 18px;
  text-decoration: none;
  color: #000;
}

.lista-categorias a:hover {
  background-color: #0C8CE9;
  color: #fff;
  font-weight: 700;
}
</style>