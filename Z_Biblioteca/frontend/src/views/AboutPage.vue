<template>
  <main class="main-sobre">
    <h1>SOBRE NÓS</h1>
    <div class="bloco-sobre">

      <img src="@/assets/img/img-1-sobre.png" alt="">

      <div class="texto-sobre">
        <p>
          <strong>Etiam nec mi urna</strong><br>
          Ut id placerat enim. Ut aliquet magna et leo facilisis interdum. Nullam ut ipsum sed neque lacinia laoreet. Fusce finibus libero sed orci feugiat, sed ultricies urna sagittis. Cras diam risus, scelerisque eu volutpat sit amet, ornare vestibulum quam. Mauris scelerisque orci dui, et sagittis risus egestas eleifend. Etiam nec mi urna. Aenean tincidunt neque nec odio porta, id pulvinar eros luctus. Sed venenatis dictum nulla ut posuere.
        </p>
      </div>

      <div class="texto-sobre">
        <p>
          <strong>Pellentesque eget dui scelerisque</strong><br>
          Sed feugiat nulla ipsum, ut sagittis ligula dapibus at. Curabitur vehicula tellus at tortor scelerisque consequat. Sed mattis velit faucibus est consectetur, id elementum magna pulvinar. Pellentesque eget dui scelerisque, dignissim velit eget, tempor lacus. Aenean auctor elementum velit, non venenatis ligula feugiat in. Donec rhoncus, quam a mollis ullamcorper, enim ipsum euismod orci, ac tincidunt lorem mi et mi. Suspendisse facilisis aliquam neque quis tristique. Nullam vitae quam posuere, iaculis metus ac, bibendum lectus. Nullam ultrices sed ex hendrerit dapibus.
        </p>
      </div>

      <img src="@/assets/img/img-2-sobre.png" alt="">
      <img src="@/assets/img/img-3-sobre.png" alt="">

      <div class="texto-sobre">
        <p>
          <strong>Pellentesque eget dui scelerisque</strong><br>
          Cras rhoncus scelerisque dui. Morbi varius vulputate turpis, ac venenatis diam iaculis a. Nam nibh ligula, suscipit et aliquet ut, suscipit ut risus. Sed ornare, nisi id tempor sodales, ipsum dui elementum leo, vitae convallis purus urna volutpat neque. Suspendisse scelerisque enim et ante molestie, et volutpat purus molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut interdum urna neque, sed pharetra sem maximus sit amet. Fusce justo nulla, tincidunt in iaculis quis, pretium non nunc. Donec accumsan elit dignissim nunc interdum consectetur. Nullam dictum enim at mi facilisis, id volutpat nisi ultrices.
        </p>
      </div>

    </div>
  </main>
</template>

<style scoped>
.main-sobre {
  height: calc(100% - 90px);
  max-width: 1072px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-sobre h1 {
  font-size: 25px;
  font-weight: bold;
  align-self: center;
  padding: 0;
  margin: 28px;
}

.bloco-sobre {
  width: 1072px;
  height: 1059px;
  background-color: #fff;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  box-shadow: 0 2px 8px -2px #989898;
}

.bloco-sobre img {
  max-width: 536px; 
}

.texto-sobre {
  max-width: 536px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.texto-sobre strong {
  font-size: 20px;
}

.texto-sobre p {
  font-size: 18px;
  width: 500px;
  line-height: 1.4;
}
</style>