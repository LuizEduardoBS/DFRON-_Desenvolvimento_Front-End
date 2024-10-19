<template>
  <main class="main-politicas">
    <h1>POLÍTICAS</h1>
    <div class="bloco-politicas">
      <div class="conteudo-politicas">
        <h2>Horário de funcionamento:</h2>
        <ul>
          <li>De segunda a sexta-feira 08:00 às 18:00 e aos sábados 08:00 às 13:00.</li>
        </ul>
        <h2>Regras gerais:</h2>
        <ul>
          <li>É proibido comer, beber ou fumar nas dependências da Biblioteca; Não é permitido colocar os cotovelos ou escrever sobre o livro; fechá-lo ou marcar a página com lápis; forçar a parte interna para manter o livro aberto, pois isso contribui para a sua deterioração.</li>
        </ul>
        <h2>Termos para empréstimos de livros:</h2>
        <ul>
          <li><strong>Quantidade de livros por vez:</strong> Cada usuário pode ficar em posse de até 3 livros por vez.</li>
          <li><strong>Duração do empréstimo:</strong> O período padrão para o empréstimo de um livro é de 15 dias.</li>
          <li><strong>Renovação do empréstimo:</strong> O usuário pode renovar o empréstimo por mais 10 dias, caso o livro não tenha sido reservado por outro usuário.</li>
          <li><strong>Multa por atraso:</strong> Será aplicada uma multa de R$1,00 por dia de atraso na devolução do livro.</li>
          <li><strong>Reservas de livros:</strong> Um usuário pode reservar até 2 livros que estão atualmente emprestados.</li>
          <li><strong>Devolução antecipada:</strong> Livros podem ser devolvidos antes do prazo sem penalidades.</li>
          <li><strong>Limitação de reservas:</strong> Um livro reservado deve ser retirado em até 3 dias úteis após a notificação de disponibilidade.</li>
          <li><strong>Bloqueio de conta:</strong> O usuário será bloqueado de realizar novos empréstimos se possuir multa em aberto ou se estiver com livros em atraso.</li>
          <li><strong>Cuidados com os livros:</strong> Os livros devem ser devolvidos em bom estado. Danos podem resultar em multa ou reposição do livro.</li>
          <li><strong>Acesso à conta:</strong> Cada usuário terá acesso a uma conta online onde poderá verificar seus empréstimos, renovações, e reservas.</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-politicas {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-politicas h1 {
  font-size: 25px;
  font-weight: bold;
  align-self: center;
  padding: 0;
  margin: 28px;
}

.bloco-politicas {
  width: 1072px;
  height: 626px;
  background-color: #fff;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.conteudo-politicas {
  max-width: 979px;
}

.bloco-politicas h2 {
  align-self: start;
  margin: 0;
  padding: 0;
}

.bloco-politicas ul li {
  line-height: 1.4;
  font-size: 18px;
  padding: 0;
  margin: 0;
}
</style>