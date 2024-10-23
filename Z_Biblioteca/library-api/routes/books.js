const express = require('express');
const Book = require('../models/Book'); // Modelo do livro
const router = express.Router();

// *** CRIAÇÃO (POST) ***
module.exports = (upload) => {
    router.post('/', upload.single('coverImage'), async (req, res) => { // Corrigido para 'coverImage'
        try {
            const { title, author, year, availability, genre, copies, description } = req.body;

            // Caminho da imagem (caso tenha sido enviada)
            const coverImage = req.file ? req.file.path : '';

            const newBook = new Book({
                title,
                author,
                year,
                availability,
                genre,
                copies,
                description,
                coverImage,
            });

            await newBook.save();
            res.status(201).json(newBook);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao criar livro', error });
        }
    });

    // *** LEITURA (GET) ***
    router.get('/', async (req, res) => {
        try {
            const books = await Book.find(); // Busca todos os livros
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar livros', error });
        }
    });

    // *** ATUALIZAÇÃO (PUT) ***
    router.put('/:id', async (req, res) => {
        const { title, author, year, availability, genre, copies, description } = req.body;
        try {
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                { title, author, year, availability, genre, copies, description },
                { new: true }
            );
            res.status(200).json(updatedBook);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar livro', error });
        }
    });

    // *** EXCLUSÃO (DELETE) ***
    router.delete('/:id', async (req, res) => {
        try {
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Livro deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar livro', error });
        }
    });

    return router;
};
