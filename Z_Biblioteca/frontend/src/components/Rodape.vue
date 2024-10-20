<template>
  <footer>
    <p>Redes Sociais:</p>
    <div class="footer-contatos">
      <a href="https://www.instagram.com/">
        <img src="@/assets/img/instagram.svg" alt="">
      </a>
      <a href="">
        <img src="@/assets/img/twitter-x.svg" alt="">
      </a>
      <a href="">
        <img src="@/assets/img/github.svg" alt="">
      </a>
         
    </div>
    <p>Alguns direitos resercados 2024.</p>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  row-gap: 20px;
  padding: 0;
  margin: 0;
}
.footer-contatos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 21px;
}
.footer-contatos img {
  width: 27px;
  height: 27px;
  padding: 0;
}
footer p {
  padding: 0;
  margin: 3px;
  font-size: 15px;
}
</style>