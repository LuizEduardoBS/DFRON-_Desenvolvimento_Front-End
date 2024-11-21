const { type } = require('express/lib/response');
const mongoose = require('mongoose');

// Define o esquema de usuários

const userSchema = new mongoose.Schema({
    customId: { type: Number, unique: true },  // Campo para o ID customizado
    username: { type: String, required: true }, // Nome de usuário obrigatório e único
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Senha obrigatória
    permissions: { 
        type: String,
        enum: ['ADM', 'Usuário', 'Bibliotecario(a)'], // Define as permissões possíveis
        default: 'Usuário' }, 
    status: { type: String, default: 'Ativo' },
    privateNotif: [
        {
        textNotif: { type: String },
        dataNotif: { type: Date, default: Date.now },
        status: { type: String, default: 'PRIVADO' }
        }
    ],
    emprestimos: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, // Referência para o livro
            title: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
            status: { type: String, enum: ['Solicitado', 'Autorizado', 'Checkout Devolução', 'Devolvido', 'Negado'] },
            dataEmprestimo: { type: Date },
            prazoDevolucao: { type: Date },
            dataDevolucao: { type: Date },
            qtdeBook: { type: Number },
        }, 
    ],
    reservas: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, // Referência para o livro
        },
    ],
    carrinho: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }, // Referência para o livro
        },
    ],
    imagePerfil: { type: String },
});

// Hook 'pre-save' para calcular o ID customizado
userSchema.pre('save', async function(next) {
    if (this.isNew) {
        const count = await mongoose.model('User').countDocuments();
        this.customId = count + 1; // Define o customId com base no número atual de usuários + 1
    }
    next();
});

// Exporta o modelo de usuário

module.exports = mongoose.model('User', userSchema);