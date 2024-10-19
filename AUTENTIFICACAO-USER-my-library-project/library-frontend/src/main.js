  // main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router'; // Importa o roteador

const app = createApp(App);

app.use(router); // Registra o roteador na aplicação
app.mount('#app');
