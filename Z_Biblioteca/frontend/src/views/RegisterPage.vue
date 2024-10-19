<template>
  <main class="main-cadastro">
    <div class="bloco-cadastro">
      <div class="bloco-cadastro-interno">
        <h1>Cadastro</h1>
        <!-- <div> -->
        <form action="/cadastro" method="POST">
          <span>Nome de usuário *</span>
          <input type="text" placeholder="  exemplo@exemplo.com">
          <span>E-mail *</span>
          <input type="text" placeholder="  exemplo@exemplo.com">
          <span>Senha *</span>
          <input type="text" placeholder="  senha@123">
          <span>Confirme a senha *</span>
          <input type="text" placeholder="  senha@123">
          <button>Logar</button>
        </form>
        <!-- </div> -->
      </div>
      <div class="ja-possui-conta">
        <span>Já possui uma conta?</span>
        <a href="./login.html">Logar</a>
      </div>

    </div>
  </main>
</template>

<style scoped>
.main-cadastro {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bloco-cadastro {
  width: 1072px;
  height: 626px;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
} 

.bloco-cadastro-interno {
  width: 392px;
  height: 521px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
}

.bloco-cadastro-interno h1 {
  font-size: 30px;
  font-weight: bold;
  color: #0C8CE9;
  padding: 0;
  margin: 0;
  margin-bottom: 30px;
}

.bloco-cadastro-interno form {
  width: 100%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bloco-cadastro-interno span {
  font-size: 18px;
  margin: 0;
  padding: 0;
  display: block;
  width: 324px;
}

.bloco-cadastro-interno input {
  width: 324px;
  height: 47px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  border-radius: 5px;
  background-color: #E7E7E7;
  padding: 0;
  margin: 0;
}

.bloco-cadastro-interno button {
  width: 325px;
  height: 47px;
  font-size: 18px;
  font-weight: bold;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  background-color: #0C8CE9;
  color: #fff;
  border-radius: 5px;
  margin: 0;
  padding: 0;
  margin-top: 15px;
}

.bloco-cadastro-interno button:hover {
  background-color: #fff;
  color: #0C8CE9;
  border: 1px solid #0C8CE9;
}

.ja-possui-conta {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 21px;
  align-items: center;
  gap: 21px;
}

.ja-possui-conta a {
  width: 127px;
  height: 30px;
  background-color: #fff;
  color: #0C8CE9;
  text-decoration: none;
  font-weight: bold;
  font-size: 18px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.ja-possui-conta a:hover {
  background-color: #0C8CE9;
  color: #fff;
}
</style>