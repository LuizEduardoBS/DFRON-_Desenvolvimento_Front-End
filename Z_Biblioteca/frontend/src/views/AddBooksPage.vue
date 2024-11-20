<template>
  <header class="bloco-do-submenu">
    <section class="opcoes-submenu-adm">
      <router-link to="./perfiladm" class="opcao-menu" >Dashboard</router-link>
      <router-link to="./admusers" class="opcao-menu">Usuários</router-link>
      <router-link to="./admlivros" class="opcao-menu">Livros</router-link>
    </section>
  </header>

  <main class="main-adicionar-livro">
    <div class="conteudo-add-livro">
      <div class="título-pagina-disponibilidade">
        <h1>Adicionar livro:</h1>

        <form id="form-livro" class="form-add-livro" @submit.prevent="enviarFormulario">
          <select v-model="availability" required>
            <option value="" disabled selected>Disponibilidade *</option>
            <option value="Indisponível">Indisponível</option>
            <option value="Disponível">Disponível</option>
          </select>
        </form>
      </div>

      <form id="form-livro" class="form-add-livro" @submit.prevent="enviarFormulario">
        <div class="coluna-add-livro">
          <label class="titulo-dos-campos">Título *</label>
          <input type="text" v-model="title" placeholder="Nome do livro" class="campo-tamanho-comum" required />

          <label class="titulo-dos-campos">Autor *</label>
          <input type="text" v-model="author" placeholder="Nome do autor" class="campo-tamanho-comum" required>

          <label class="titulo-dos-campos">Gênero *</label>
          <select v-model="genre" class="campo-tamanho-comum-select" required>
            <option value="" selected disabled>Selecione o gênero do livro:</option>
            <option value="Literatura e Ficção">Literatura e Ficção</option>
            <option value="Infantil e HQ">Infantil e HQ</option>
            <option value="Informática e Tecnologia">Informática e Tecnologia</option>
            <option value="Técnicos e Acadêmicos">Técnicos e Acadêmicos</option>
            <option value="Saúde e Bem Estar">Saúde e Bem Estar</option>
            <option value="Autoajuda e Espiritualidade">Autoajuda e Espiritualidade</option>
          </select>

          <label class="titulo-dos-campos">Data da publicação *</label>
          <input type="number" v-model="year" min="1000" max="2030" placeholder="Ano da publicação" class="campo-tamanho-comum" required />

          <label class="titulo-dos-campos">ISBN *</label>
          <input type="text" v-model="isbn" placeholder="978-65-89xxx-xx-x" class="campo-tamanho-comum" required />

          <label class="titulo-dos-campos" for="imagem">Capa *</label>
          <input type="file" @change="handleFileUpload" accept="image/*" class="campo-tamanho-comum" required />
        </div>

        <div class="coluna-add-livro">
          <label class="titulo-dos-campos">Número de cópias *</label>
          <input type="number" v-model="copies" min="1" placeholder="Número de cópias" class="campo-tamanho-comum" required />

          <label class="titulo-dos-campos">Descrição *</label>
          <textarea v-model="description" class="campo-descricao" placeholder="Breve resumo do livro" required></textarea>
        </div>
      </form>

      <div class="botoes-add-livro">
        <button type="submit" class="botao-salvar texto-botao" @click="enviarFormulario">Salvar</button>
        <button type="reset" class="botao-cancelar texto-botao" @click="cancelarEnvio">Cancelar</button>
      </div>
      
    </div>
  </main>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      title: '',
      author: '',
      year: '',
      availability: '',
      genre: '',
      isbn: '',
      copies: '',
      description: '',
      coverImage: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.coverImage = event.target.files[0];
    },
    async enviarFormulario() {
      const formData = new FormData();
      formData.append('availability', this.availability);
      formData.append('title', this.title);
      formData.append('author', this.author);
      formData.append('year', this.year);
      formData.append('genre', this.genre);
      formData.append('isbn', this.isbn);
      formData.append('copies', this.copies);
      formData.append('description', this.description);
      if (this.coverImage) {
        formData.append('coverImage', this.coverImage);
      }

      try {
        const response = await axios.post('http://localhost:3000/api/books', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Livro adicionado:', response.data);
        alert('Livro cadastrado com sucesso!');
        this.$router.push('/admlivros');
      } catch (error) {
        console.error('Erro ao adicionar livro:', error);
        alert('Erro ao cadastrar o livro.');
      }
    },
    cancelarEnvio() {
      this.$router.push('/admlivros');
    }
  },
};
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

/* ########################################### */
/* ADICIONAR LIVROS - ADM */
.main-adicionar-livro {
  width: 1072px;
  height: 686px;
  background-color: #fff;
  margin-top: 20px;
  box-shadow: 0 2px 8px -2px #989898;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
}

.conteudo-add-livro {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 10px;
  width: 1012px;
}

.título-pagina-disponibilidade {
  display: flex;
  flex-direction: row;
  width: 1012px;
  height: 25px;
  padding: 0;
  margin: 25px 0 0 0;
}

.título-pagina-disponibilidade h1 {
  font-size: 20px;
  font-weight: 18px;
  font-family: 'Times New Roman';
  padding: 0;
  margin: 0 50px 0 0;
  text-decoration: underline;
}

.título-pagina-disponibilidade select {
  width: 170px;
  height: 25px;
  font-size: 18px;
  text-align: center;
  background-color: #E7E7E7;
  border-radius: 5px;
  margin: 0;
  padding: 0;  
}

.título-pagina-disponibilidade form {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

form {
  display: flex;
}

.coluna-add-livro {
  width: 506px;
  display: flex;
  flex-direction: column;  
}

.campo-tamanho-comum {
  width: 480px;
  height: 47px;
  background-color: #E7E7E7;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  font-size: 18px;
  font-family: 'Times New Roman';
  padding-left: 10px;
}

.campo-descricao {
  width: 480px;
  height: 392px;
  border: none;
  background-color: #E7E7E7;
  box-shadow: 0 2px 8px -2px #989898;
  font-size: 18px;
  font-family: 'Times New Roman';
  display: flex;
  flex-direction: column;
  text-align: start;
  padding: 8px; 
  resize: none; /* Impede o redimensionamento do campo */
  overflow-y: auto; /* Permite rolagem vertical caso o texto ultrapasse o espaço */
}

.campo-tamanho-comum-select {
  width: 493px;
  height: 47px;
  background-color: #E7E7E7;
  border-radius: 5px;
  border: none;
  box-shadow: 0 2px 8px -2px #989898;
  font-size: 18px;
  font-family: 'Times New Roman';
  padding-left: 10px;
}

.titulo-dos-campos {
  font-size: 18px;
  font-family: 'Times New Roman';
  margin: 16px 0 5px 0;
}

.botoes-add-livro {
  width: 1025px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 20px;
}

.botao-salvar {
  width: 173px;
  height: 47px;
  background-color: #0C8CE9;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px -2px #989898;
  border: none;
}

.botao-salvar-e-adicionar-outro {
  width: 226px;
  height: 47px;
  background-color: #0C8CE9;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px -2px #989898;
  border: none;
}

.botao-cancelar {
  width: 173px;
  height: 47px;
  background-color: #666666;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px -2px #989898;
  border: none;
}

.texto-botao {
  font-size: 18px;
  color: #fff;
  font-weight: bold;
}

.botao-salvar:hover, .botao-salvar-e-adicionar-outro:hover {
  background-color: #fff;
  border: 1px solid #0C8CE9;
  color: #0C8CE9;
}

.botao-cancelar:hover {
  background-color: #fff;
  color: #666666;
  border: 1px solid #666666;
}
</style>