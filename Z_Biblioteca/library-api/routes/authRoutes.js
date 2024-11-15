const express = require('express'); 
const router = express.Router();
const authController = require('../controllers/authController');
const User = require('../models/user'); // Importa o modelo User
const Book = require('../models/Book'); // Importa o modelo Book

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

// Rota para buscar os livros no carrinho do usuário
router.get('/:userId/carrinho', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('carrinho.bookId'); // Popula os detalhes dos livros no carrinho
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.status(200).json({ carrinho: user.carrinho });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros do carrinho', error });
    }
});

// Remove um livro do carrinho do usuário
router.delete('/:userId/carrinho/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.carrinho = user.carrinho.filter(item => item.bookId.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: 'Livro removido do carrinho', carrinho: user.carrinho });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover livro do carrinho', error });
    }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



// Move um livro do carrinho para empréstimos, subtrai -1 do book.copies e soma +1 no emprestimos.qtdeBook
router.post('/:userId/carrinho/:bookId/emprestimos', async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        console.log(`Iniciando a movimentação do livro para empréstimos. userId: ${userId}, bookId: ${bookId}`);

        // Busca o usuário no banco de dados
        const user = await User.findById(userId);
        if (!user) {
            console.error('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se o livro está no carrinho do usuário
        const bookIndex = user.carrinho.findIndex(item => item.bookId.toString() === bookId);
        if (bookIndex === -1) {
            console.error('Livro não encontrado no carrinho');
            return res.status(404).json({ message: 'Livro não encontrado no carrinho' });
        }

        console.log('Livro encontrado no carrinho, movendo para empréstimos');

        // Remove o livro do carrinho
        user.carrinho.splice(bookIndex, 1);

        // Calcula a data de devolução (15 dias após a data de empréstimo)
        const dataEmprestimo = new Date();
        const dataDevolucao = new Date(dataEmprestimo);
        dataDevolucao.setDate(dataEmprestimo.getDate() + 15);

        // Adiciona o livro à lista de empréstimos com status, data de empréstimo e data de devolução
        user.emprestimos.push({ bookId, qtdeBook: 1, status: 'Solicitado', dataEmprestimo, dataDevolucao });

        // Busca o livro no banco de dados
        const book = await Book.findById(bookId);
        if (book) {
            console.log(`Livro encontrado no banco de dados: ${book.title}, cópias disponíveis: ${book.copies}`);
            if (book.copies > 0) {
                // Reduz a quantidade de cópias do livro
                book.copies -= 1;
                await book.save();
                console.log(`Cópias atualizadas para o livro: ${book.copies}`);
            } else {
                console.error('Não há cópias disponíveis do livro');
                return res.status(400).json({ message: 'Não há cópias disponíveis do livro' });
            }
        } else {
            console.error('Livro não encontrado no banco de dados');
            return res.status(404).json({ message: 'Livro não encontrado no banco de dados' });
        }

        // Salva as alterações no usuário
        await user.save();
        console.log('Empréstimo atualizado com sucesso para o usuário');

        res.status(200).json({ message: 'Livro movido para empréstimos', emprestimos: user.emprestimos });
    } catch (error) {
        console.error('Erro ao mover livro para empréstimos:', error);
        res.status(500).json({ message: 'Erro ao mover livro para empréstimos', error: error.message || error });
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

// Rota para buscar os livros no carrinho do usuário
router.get('/:userId/reservas', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('reservas.bookId'); // Popula os detalhes dos livros no carrinho
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.status(200).json({ reservas: user.reservas });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros do reservas', error });
    }
});

// Remove um livro das reservas do usuário
router.delete('/:userId/reservas/:bookId', async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.reservas = user.reservas.filter(item => item.bookId.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: 'Livro removido das reservas', reservas: user.reservas });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover livro das reservas', error });
    }
});

// Move um livro das reservas para empréstimos, subtrai -1 do book.copies e soma +1 no emprestimos.qtdeBook
router.post('/:userId/reservas/:bookId/emprestimos', async (req, res) => {
    const { userId, bookId } = req.params;

    try {
        console.log(`Iniciando a movimentação do livro das reservas para empréstimos. userId: ${userId}, bookId: ${bookId}`);

        // Busca o usuário no banco de dados
        const user = await User.findById(userId);
        if (!user) {
            console.error('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Verifica se o livro está nas reservas do usuário
        const reserveIndex = user.reservas.findIndex(item => item.bookId.toString() === bookId);
        if (reserveIndex === -1) {
            console.error('Livro não encontrado nas reservas');
            return res.status(404).json({ message: 'Livro não encontrado nas reservas' });
        }

        console.log('Livro encontrado nas reservas, movendo para empréstimos');

        // Remove o livro das reservas
        const reservedBook = user.reservas.splice(reserveIndex, 1)[0];

        // Calcula a data de devolução (15 dias após a data de empréstimo)
        const dataEmprestimo = new Date();
        const dataDevolucao = new Date(dataEmprestimo);
        dataDevolucao.setDate(dataEmprestimo.getDate() + 15);

        // Adiciona o livro à lista de empréstimos com status, data de empréstimo e data de devolução
        user.emprestimos.push({
            bookId: reservedBook.bookId, 
            qtdeBook: 1, 
            status: 'Solicitado', 
            dataEmprestimo, 
            dataDevolucao // Assegurando que a data de devolução é adicionada corretamente
        });

        // Busca o livro no banco de dados
        const book = await Book.findById(bookId);
        if (book) {
            console.log(`Livro encontrado no banco de dados: ${book.title}, cópias disponíveis: ${book.copies}`);
            if (book.copies > 0) {
                // Reduz a quantidade de cópias do livro
                book.copies -= 1;
                await book.save();
                console.log(`Cópias atualizadas para o livro: ${book.copies}`);
            } else {
                console.error('Não há cópias disponíveis do livro');
                return res.status(400).json({ message: 'Não há cópias disponíveis do livro' });
            }
        } else {
            console.error('Livro não encontrado no banco de dados');
            return res.status(404).json({ message: 'Livro não encontrado no banco de dados' });
        }

        // Salva as alterações no usuário
        await user.save();
        console.log('Empréstimo atualizado com sucesso para o usuário');

        res.status(200).json({ message: 'Livro movido para empréstimos', emprestimos: user.emprestimos });
    } catch (error) {
        console.error('Erro ao mover livro para empréstimos:', error);
        res.status(500).json({ message: 'Erro ao mover livro para empréstimos', error: error.message || error });
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
