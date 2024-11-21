const express = require('express');
const User = require('../models/user'); // Modelo do livro
const router = express.Router();
const fs = require('fs'); // Módulo para manipulação do sistema de arquivos
const path = require('path');
const bcrypt = require('bcryptjs');

// Rota para atualizar um usuário específico
// *** ATUALIZAÇÃO (PUT) ***
module.exports = (upload) => {
    router.put('/:id', upload.single('imagePerfil'), async (req, res) => {
        try {
            const { username, email, password } = req.body;
            const imagePerfil = req.file ? req.file.path : undefined;

            // Verifica se o usuário existe
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }

            // Verifica se o e-mail já está sendo usado por outro usuário
            if (email && email !== user.email) {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    return res.status(400).json({ error: 'E-mail já cadastrado.' });
                }
            }

            // Criptografa a nova senha, se fornecida
            let hashedPassword = user.password; // Mantém a senha antiga se nenhuma for fornecida
            if (password) {
                hashedPassword = await bcrypt.hash(password, 10);
            }

            // Deleta a imagem antiga, se uma nova foi enviada
            if (user.imagePerfil && imagePerfil) {
                const oldImagePath = path.resolve(user.imagePerfil);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
            }

            // Atualiza os dados do usuário
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    username: username || user.username,
                    email: email || user.email,
                    password: hashedPassword,
                    imagePerfil: imagePerfil || user.imagePerfil, // Nova imagem ou mantém a antiga
                },
                { new: true } // Retorna o documento atualizado
            );

            res.status(200).json(updatedUser);
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            res.status(500).json({ message: 'Erro ao atualizar usuário', error });
        }
    });

    return router;
};