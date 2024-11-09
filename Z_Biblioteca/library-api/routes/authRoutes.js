const express = require('express'); 
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user'); // Importa o modelo User

// Rota para registrar novos usuários
router.post('/register', authController.register);

// Rota para login
router.post('/login', authController.login);

// Rota para perfil do usuário
router.get('/profile', authController.getProfile);

// Rota para buscar todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await User.find(); // Usa o modelo User para buscar todos os usuários
        res.status(200).json(users); // Retorna a lista de usuários
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
});

// Rota para atualizar um usuário específico
router.put('/:userId', async (req, res) => {
    const { userId } = req.params; // Obtém o ID do usuário dos parâmetros da URL
    const updateData = req.body;   // Dados que serão atualizados

    try {
        // Atualiza o usuário com os dados fornecidos
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        // Verifica se o usuário foi encontrado e atualizado
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar usuário', error });
    }
});

// Rota para atualizar as permissões de um usuário
router.put('/:userId/permissions', async (req, res) => {
    const { userId } = req.params;
    const { permissions } = req.body; // Nova permissão

    try {
        // Atualiza as permissões do usuário
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { permissions },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Permissão atualizada com sucesso', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar permissão', error });
    }
});

// Rota para deletar um usuário
router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId); // Deleta o usuário pelo ID

        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar usuário', error });
    }
});

module.exports = router;
