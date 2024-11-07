const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    customId: { type: Number, unique: true },  // Campo para o ID customizado
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    availability: { type: String, required: true }, 
    genre: { type: String, required: true }, 
    copies: { type: Number, required: true }, 
    description: { type: String, required: true }, 
    coverImage: { type: String },
});

// Hook 'pre-save' para calcular o ID customizado
BookSchema.pre('save', async function(next) {
    if (this.isNew) {
        const count = await mongoose.model('Book').countDocuments();
        this.customId = count + 1; // Define o customId com base no número atual de livros + 1
    }
    next();
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
