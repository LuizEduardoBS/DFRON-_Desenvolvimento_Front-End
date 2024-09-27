const express = require('express');
const mongoose =  require('mongoose');
const cors = require('cors')

// Inicialização do app
const app = express();
app.use(cors());
app.use(express.json());

// mongoose.connect('mongodb+srv://luized:Luiz123@cluster0.u7srm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

// Conexão ao MongoDB
mongoose.connect('mongodb+srv://luized:Luiz123@cluster0.u7srm.mongodb.net/library', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB conectado'))
.catch(err => console.log('Erro ao conectar ao MongoDB:', err));

//Importação das rotas
const booksRoutes = require('./routes/books');
app.use('/api/books', booksRoutes);

// Definir a porta do servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})