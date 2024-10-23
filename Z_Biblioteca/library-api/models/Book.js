const mongoose = require('mongoose');

// Definindo o esquema do livro
const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number },
    availability: { type: String, required: true }, 
    genre: { type: String, required: true }, 
    copies: { type: Number, required: true }, 
    description: { type: String, required: true }, 
    coverImage: { type: String }, 
});

// Exportando o modelo
module.exports = mongoose.model('Book', BookSchema);
