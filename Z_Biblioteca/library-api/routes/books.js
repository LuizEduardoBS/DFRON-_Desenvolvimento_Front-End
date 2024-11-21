const express = require('express');
const Book = require('../models/Book'); // Modelo do livro
const router = express.Router();
const fs = require('fs'); // Módulo para manipulação do sistema de arquivos
const path = require('path');


router.get('/:userId/review/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        // Busca o livro pelo ID
        const book = await Book.findById(bookId);

        // Verifica se o livro foi encontrado
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        // Busca o review do usuário dentro da lista de reviews
        const userReview = book.reviews.find((review) => review.userId.toString() === userId);

        // Verifica se o review foi encontrado
        if (!userReview) {
            return res.status(404).json({ message: 'Review não encontrado para este usuário.' });
        }

        // Retorna o review
        res.status(200).json(userReview);
    } catch (error) {
        console.error('Erro ao buscar review:', error);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});

router.post('/:userId/review/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;
    const { rating, comment } = req.body; // Dados do review fornecidos pelo usuário

    try {
        // Busca o livro pelo ID
        const book = await Book.findById(bookId);

        // Verifica se o livro foi encontrado
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }

        // Verifica se o usuário já fez um review
        const existingReview = book.reviews.find((review) => review.userId.toString() === userId);
        if (existingReview) {
            return res.status(400).json({ message: 'O usuário já fez um review para este livro.' });
        }

        // Adiciona o novo review
        const newReview = {
            userId,
            rating,
            comment,
            reviewsDate: new Date(), // Define a data atual como data do review
        };

        book.reviews.push(newReview);

        // Salva o livro atualizado no banco de dados
        await book.save();

        // Retorna o review adicionado
        res.status(201).json({ message: 'Review adicionado com sucesso!', review: newReview });
    } catch (error) {
        console.error('Erro ao adicionar review:', error);
        res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
    }
});







// *** CRIAÇÃO (POST) ***
module.exports = (upload) => {
    router.post('/', upload.single('coverImage'), async (req, res) => { // Corrigido para 'coverImage'
        try {
            const { title, author, year, availability, genre, isbn, copies, description } = req.body;

            // Caminho da imagem (caso tenha sido enviada)
            const coverImage = req.file ? req.file.path : '';

            const newBook = new Book({
                title,
                author,
                year,
                availability,
                genre,
                isbn,
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

    router.get('/:id', async (req, res) => {
        try {
            const book = await Book.findById(req.params.id); // Busca livro pelo id
            if (!book) {
                return res.status(404).json({ message: 'Livro não encontrado' });
            }
            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao buscar livro', error });
        }
    });
    
    // *** ATUALIZAÇÃO (PUT) ***
    router.put('/:id', upload.single('coverImage'), async (req, res) => {
        try {
            const { title, author, year, availability, genre, isbn, copies, description } = req.body;
            const coverImage = req.file ? req.file.path : undefined;
    
            // Encontre o livro a ser atualizado
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Livro não encontrado' });
            }
    
            // Deletar imagem antiga, se uma nova foi enviada
            if (book.coverImage && coverImage) {
                const oldImagePath = path.resolve(book.coverImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }
    
            // Atualizar o livro
            const updatedBook = await Book.findByIdAndUpdate(
                req.params.id,
                {
                    title,
                    author,
                    year,
                    availability,
                    genre,
                    isbn,
                    copies,
                    description,
                    coverImage: coverImage || book.coverImage, // Atualiza nova imagem ou mantém a antiga
                },
                { new: true } // Retorna o documento atualizado
            );
    
            res.status(200).json(updatedBook);
        } catch (error) {
            console.error('Erro ao atualizar livro:', error);
            res.status(500).json({ message: 'Erro ao atualizar livro', error });
        }
    });
   
    

    /// *** EXCLUSÃO (DELETE) ***
    router.delete('/:id', async (req, res) => {
        try {
            // Busca o livro pelo ID antes de deletar
            const book = await Book.findById(req.params.id);
            if (!book) {
                return res.status(404).json({ message: 'Livro não encontrado' });
            }

            // Remove a imagem associada ao livro, se existir
            if (book.coverImage) {
                const filePath = path.join(__dirname, '..', book.coverImage);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Erro ao deletar a imagem:', err);
                        return res.status(500).json({ message: 'Erro ao deletar a imagem do livro', error: err });
                    }
                });
            }

            // Deleta o livro do banco de dados
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'Livro deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar livro', error });
        }
    });

    return router;
};
