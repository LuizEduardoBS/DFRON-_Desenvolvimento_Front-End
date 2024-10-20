require('dotenv').config(); // Carrega variáveis de ambiente do arquivo .env

const express = require('express');
const mongoose =  require('mongoose');
const cors = require('cors')

// Inicialização do app
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Permite requisições apenas do seu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use(express.json());

// Conexão ao MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Erro ao conectar ao MongoDB:', err));

//Importação das rotas
const booksRoutes = require('./routes/books');
app.use('/api/books', booksRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000

// Definir a porta do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})