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

// Rota para buscar um usuário específico pelo ID
router.get('/:userId', async (req, res) => {
    const { userId } = req.params; // Obtém o ID do usuário dos parâmetros da URL

    try {
        const user = await User.findById(userId); // Busca um usuário específico pelo ID
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        res.status(200).json(user); // Retorna o usuário encontrado
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar o usuário', error });
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

// Rota para atualizar o status de um usuário
router.put('/:userId/status', async (req, res) => {
    const { userId } = req.params;
    const { status } = req.body; // Nova permissão

    try {
        // Atualiza as permissões do usuário
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { status },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Status atualizada com sucesso', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar status', error });
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

// Rota para adicionar um livro ao carrinho do usuário
router.post('/:userId/carrinho', async (req, res) => {
    const { userId } = req.params;
    const { bookId } = req.body; // ID do livro que será adicionado ao carrinho

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        // Adiciona o livro ao carrinho do usuário
        user.carrinho.push({ bookId });
        await user.save();

        res.status(200).json({ message: 'Livro adicionado ao carrinho', carrinho: user.carrinho });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar livro ao carrinho', error });
    }
});

// Rota para adicionar um livro às reservas do usuário
router.post('/:userId/reservas', async (req, res) => {
    const { userId } = req.params;
    const { bookId } = req.body; // ID do livro que será adicionado às reservas

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        // Adiciona o livro às reservas do usuário
        user.reservas.push({ bookId });
        await user.save();

        res.status(200).json({ message: 'Livro adicionado às reservas', reservas: user.reservas });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar livro às reservas', error });
    }
});

// Rota para adicionar uma notificação privada
router.post('/:userId/notificacao_privada', async (req, res) => {
    const { userId } = req.params;
    const { textNotif } = req.body;

    try {
        // Encontra o usuário pelo ID e adiciona a nova notificação
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Adiciona a notificação
        user.privateNotif.push({ textNotif });
        await user.save();

        res.status(200).json({ message: 'Notificação adicionada com sucesso', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar notificação', error });
    }
});

// Rota para obter notificações privadas de um usuário
router.get('/:userId/notificacoes_privadas', async (req, res) => {
    const { userId } = req.params;

    try {
        // Encontra o usuário pelo ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Retorna as notificações privadas do usuário
        res.status(200).json({ privateNotif: user.privateNotif });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar notificações', error });
    }
});



module.exports = router;
