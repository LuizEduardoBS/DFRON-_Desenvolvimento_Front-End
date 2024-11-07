<template>
<main class="main-descricao-livro">
  <div class="conteudo-descricao-livro">
    <span>Gênero: </span>
    <span v-if="book">{{ book.genre }}</span>
    <span v-else>Carregando gênero do livro</span>
  </div>

  <div class="capa-titulo-descricao">
    <div>
      <img :src="formatImagePath(book.coverImage)" alt="" class="capa-livro-descricao" v-if="book">
      <img src="#" alt="" class="capa-livro-descricao" v-else>
    </div>
    <div class="titulo-descriçao-botoes">
      <div>
        <div>
          <h1 class="titulo-livro-descricao" v-if="book">{{ book.title }}</h1>
          <h1 class="titulo-livro-descricao" v-else>Carregando título do livro...</h1>
        </div>
        <div class="nota-numero-leitores">
          <div><span>Nota: </span><span>0,0</span></div>
          <div><span>0</span><span> avaliações</span></div>
          <div><span>0</span><span> pessoas leram esse título</span></div>
        </div>
        <div class="texto-descricao-livro">
          <p v-if="book">{{ book.description }}</p>
          <p v-else>Carregando descrição...</p>
        </div>
        <div class="qtde-autor-publicacao">
          <div class="info-card">
            <div><span>Qnt Disponível</span></div>
            <div>
              <span v-if="book">{{ book.copies }}</span>
              <span v-else>Carregando info...</span>
            </div>
          </div>
          <div class="info-card">
            <div><span>Autor(a)</span></div>
            <div>
              <span v-if="book">{{ book.author }}</span>
              <span v-else>Carregando info...</span>
            </div>
          </div>
          <div class="info-card">
            <div><span>Publicação</span></div>
            <div>
              <span v-if="book">{{ book.year }}</span>
              <span v-else>Carregando info...</span>
            </div>
          </div>
        </div>
      </div>
      <div class="botoes-da-descricao">
        <button class="botao-adicionar-da-descricao">Adicionar ao carrinho</button>
        <button class="botao-reservar-da-descricao">Reservar</button>
      </div>
    </div>
  </div>
  <div><span class="comentarios-e-avaliacoes">Comentarios e avaliações</span></div>
  <hr class="linha-vertical-descricao">
  <div class="avaliacoes-descricao">
    <div class="notas-descricao">
      <div>
        <span id="nota-grande">0,0</span>
        <span>0</span><span> avaliações</span>
      </div>
      <div class="percentual-avaliacoes">
        <div><span>5 estrelas: </span><span>-</span><span> %</span></div>
        <div><span>4 estrelas: </span><span>-</span><span> %</span></div>
        <div><span>3 estrelas: </span><span>-</span><span> %</span></div>
        <div><span>2 estrelas: </span><span>-</span><span> %</span></div>
        <div><span>1 estrelas: </span><span>-</span><span> %</span></div>
      </div>
    </div>
    <div class="textos-avaliacoes">
      <div class="card-avaliacao-descricao">
        <div class="identificacao-avaliacao">
          <div>
            <span class="username-descricao">Username</span>
            <span> Nota: </span><span>0,0</span>
          </div>
          <div>
            <span id="date">00 mês 0000</span>
          </div>
        </div>
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam blandit nec nisi quis congue. Phasellus suscipit sed ex in sodales. In eu ipsum vitae justo elementum tincidunt sagittis id mi. Duis ac eros ornare, convallis enim sodales, feugiat arcu. Nullam eu sollicitudin ipsum. Quisque diam sem, bibendum in vestibulum vel, pellentesque non justo. Fusce cursus, magna sit amet maximus ultrices, ipsum elit ultricies felis, id maximus nulla magna vel lectus. Nam massa orci, luctus a blandit quis, cursus vel sem.</p>
        </div>
        <hr>
      </div>
      <div class="botao-ver-mais-descricao"><span>Ver mais</span></div>
    </div>
  </div>
</main>
</template>

<script>
import { booksService } from '@/services/api'; // Importa o serviço de livros

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      book: null,
    };
  },
  watch: {
    // Quando a prop 'id' mudar, a função fetchBook será chamada para atualizar os dados
    id: 'fetchBook'
  },
  mounted() {
    this.fetchBook();  // Chama a função fetchBook ao montar
  },
  methods: {
    fetchBook() {
      booksService.fetchBookById(this.id)
        .then(data => {
          this.book = data;
        })
        .catch(error => console.error("Erro ao buscar dados do livro:", error));
    },
    formatImagePath(path) {
      // Corrige as barras e adiciona o caminho completo da URL
      return `http://localhost:3000/${path.replace(/\\/g, '/')}`;
    }
  }
};
</script>


<style scoped>
/* ########################################### */
/* DESCRIÇÃO DO LIVRO */
.main-descricao-livro {
  width: 1072px;
  height: 1150px;
  background-color: #fff;
  box-shadow: 0 2px 8px -2px #989898;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.conteudo-descricao-livro {
  width: 1022px;
  height: 25px;
  margin-top: 10px;
}

.capa-titulo-descricao {
  display: flex;
  flex-direction: row;
  gap: 22px;
  margin-bottom: 20px;
}

.capa-livro-descricao {
  width: 407px;
  height: 586px;
}

.titulo-descriçao-botoes {
  width: 593px;
  height: 586;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.titulo-livro-descricao {
  font-size: 50px;
  margin: 0;
  margin-bottom: 10px;
}

.nota-numero-leitores {
  width: 593px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.texto-descricao-livro {
  font-size: 18px;
}

.qtde-autor-publicacao {
  height: 54px;
  width: 593px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.info-card {
  width: 120px;
  height: 80px;
  flex-direction: column;
  justify-items: center;
  column-gap: 10px;
  text-align: center;
}

.botoes-da-descricao {
  width: 593px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
}

.botao-adicionar-da-descricao {
  width: 280px;
  height: 47px;
  background-color: #00A65A;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  box-shadow: 0 2px 8px -2px #989898;
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
}

.botao-adicionar-da-descricao:hover {
  background-color: #00cc70;
}

.botao-reservar-da-descricao {
  width: 280px;
  height: 47px;
  background-color: #F39C11;
  color: #fff;
  border-radius: 10px;
  border: none;
  font-weight: bold;
  box-shadow: 0 2px 8px -2px #989898;
  font-family: 'Times New Roman', Times, serif;
  font-size: 18px;
}

.botao-reservar-da-descricao:hover {
  background-color: #ffb339;
}

.comentarios-e-avaliacoes {
  font-size: 20px;
  font-weight: bold;
  text-decoration: underline;
}

.linha-vertical-descricao {
  width: 1019px;
  opacity: 60%;
  margin-top: 10px;
  margin-bottom: 10px;
}

.avaliacoes-descricao {
  display: flex;
  flex-direction: row;
  
}

.notas-descricao {
  width: 228px;
  display: flex;
  flex-direction: column;
}

#nota-grande {
  font-size: 60px;
  font-weight: bold;
  color: #0C8CE9;
}

.percentual-avaliacoes {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  margin-top: 10px;
}

.main-descricao-livro span {
  font-size: 18px;
}

.textos-avaliacoes {
  width: 722px;
}



.identificacao-avaliacao {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.username-descricao {
  font-weight: bold;
  margin-right: 10px;
}

#date {
  font-size: 14px;
}

.botao-ver-mais-descricao {
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
  justify-self: center;
}

.botao-ver-mais-descricao:hover {
  background-color: #0C8CE9;
  color: #FFF;
}
</style>