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

////////////////////////////////////////////////////////////////////////////////////////////
// ROTAS PARA LIDAR COM O CARRINHO DO USUÁRIO

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
    const { userId, bookId } = req.params;  // Obtendo o userId e bookId da URL

    try {
        const user = await User.findById(userId);  // Buscando o usuário
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.carrinho = user.carrinho.filter(item => item.bookId.toString() !== bookId); // Filtra o carrinho
        await user.save();

        res.status(200).json({ message: 'Livro removido do carrinho', carrinho: user.carrinho });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover livro do carrinho', error });
    }
});

// Remove todos os livros do carrinho do usuário
router.delete('/:userId/carrinho', async (req, res) => {
    const { userId } = req.params;  // Obtendo o userId da URL

    try {
        const user = await User.findById(userId);  // Buscando o usuário
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.carrinho = []; // Limpa o carrinho (remove todos os livros)
        await user.save();

        res.status(200).json({ message: 'Todos os livros foram removidos do carrinho', carrinho: user.carrinho });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover livros do carrinho', error });
    }
});

// Move todos os livros do carrinho para empréstimos
router.post('/:userId/carrinho/emprestimos', async (req, res) => {
    const { userId } = req.params;

    try {
        console.log(`Iniciando movimentação de todos os livros do carrinho para empréstimos. userId: ${userId}`);

        // Busca o usuário no banco de dados
        const user = await User.findById(userId);
        if (!user) {
            console.error('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (!user.carrinho || user.carrinho.length === 0) {
            console.error('Carrinho vazio');
            return res.status(400).json({ message: 'O carrinho está vazio' });
        }

        // Itera sobre os livros no carrinho
        for (const item of user.carrinho) {
            const bookId = item.bookId;

            // Calcula as datas de empréstimo e devolução
            const dataEmprestimo = new Date();
            const prazoDevolucao = new Date(dataEmprestimo);
            prazoDevolucao.setDate(dataEmprestimo.getDate() + 15);

            // Adiciona o livro à lista de empréstimos
            user.emprestimos.push({
                bookId,
                qtdeBook: 1,
                status: 'Solicitado',
                dataEmprestimo,
                prazoDevolucao,
            });

            // Busca o livro no banco de dados
            const book = await Book.findById(bookId);
            if (book) {
                console.log(`Livro encontrado no banco de dados: ${book.title}, cópias disponíveis: ${book.copies}`);

                if (book.copies > 0) {
                    // Reduz a quantidade de cópias disponíveis
                    book.copies -= 1;

                    // Verifica se as cópias chegaram a zero e atualiza a disponibilidade
                    if (book.copies === 0) {
                        book.availability = 'Indisponível';
                        console.log(`Cópias esgotadas para o livro: ${book.title}. Alterando disponibilidade para "Indisponível".`);
                    }

                    await book.save();
                    console.log(`Cópias atualizadas para o livro: ${book.copies}`);
                } else {
                    console.warn(`Não há cópias disponíveis para o livro: ${book.title}`);
                    return res.status(400).json({ message: `Não há cópias disponíveis para o livro: ${book.title}` });
                }
            } else {
                console.error(`Livro com ID ${bookId} não encontrado no banco de dados`);
                return res.status(404).json({ message: `Livro com ID ${bookId} não encontrado no banco de dados` });
            }
        }

        // Limpa o carrinho após mover todos os livros para empréstimos
        user.carrinho = [];
        await user.save();

        console.log('Todos os livros foram movidos do carrinho para empréstimos com sucesso');
        res.status(200).json({ message: 'Todos os livros foram movidos para empréstimos', emprestimos: user.emprestimos });
    } catch (error) {
        console.error('Erro ao mover livros para empréstimos:', error);
        res.status(500).json({ message: 'Erro ao mover livros para empréstimos', error: error.message || error });
    }
});



////////////////////////////////////////////////////////////////////////////////////////////
// ROTAS PARA LIDAR COM O RESERVAS DO USUÁRIO

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
    const { userId, bookId } = req.params;  // Obtendo o userId e bookId da URL

    try {
        const user = await User.findById(userId);  // Buscando o usuário
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.reservas = user.reservas.filter(item => item.bookId.toString() !== bookId); // Filtra o reservas
        await user.save();

        res.status(200).json({ message: 'Livro removido do reservas', reservas: user.reservas });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover livro do reservas', error });
    }
});

// Remove todos os livros do reservas do usuário
router.delete('/:userId/reservas', async (req, res) => {
    const { userId } = req.params;  // Obtendo o userId da URL

    try {
        const user = await User.findById(userId);  // Buscando o usuário
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        user.reservas = []; // Limpa o reservas (remove todos os livros)
        await user.save();

        res.status(200).json({ message: 'Todos os livros foram removidos do reservas', reservas: user.reservas });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover livros do reservas', error });
    }
});

// Move todos os livros do reservas para empréstimos
router.post('/:userId/reservas/emprestimos', async (req, res) => {
    const { userId } = req.params;

    try {
        console.log(`Iniciando movimentação de todos os livros do reservas para empréstimos. userId: ${userId}`);

        // Busca o usuário no banco de dados
        const user = await User.findById(userId);
        if (!user) {
            console.error('Usuário não encontrado');
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        if (!user.reservas || user.reservas.length === 0) {
            console.error('Reservas vazio');
            return res.status(400).json({ message: 'O reservas está vazio' });
        }

        // Itera sobre os livros no reservas
        for (const item of user.reservas) {
            const bookId = item.bookId;

            // Calcula as datas de empréstimo e devolução
            const dataEmprestimo = new Date();
            const prazoDevolucao = new Date(dataEmprestimo);
            prazoDevolucao.setDate(dataEmprestimo.getDate() + 15);

            // Adiciona o livro à lista de empréstimos
            user.emprestimos.push({
                bookId,
                qtdeBook: 1,
                status: 'Solicitado',
                dataEmprestimo,
                prazoDevolucao,
            });

            // Busca o livro no banco de dados
            const book = await Book.findById(bookId);
            if (book) {
                console.log(`Livro encontrado no banco de dados: ${book.title}, cópias disponíveis: ${book.copies}`);

                if (book.copies > 0) {
                    // Reduz a quantidade de cópias disponíveis
                    book.copies -= 1;

                    // Verifica se as cópias chegaram a zero e atualiza a disponibilidade
                    if (book.copies === 0) {
                        book.availability = 'Indisponível';
                        console.log(`Cópias esgotadas para o livro: ${book.title}. Alterando disponibilidade para "Indisponível".`);
                    }

                    await book.save();
                    console.log(`Cópias atualizadas para o livro: ${book.copies}`);
                } else {
                    console.warn(`Não há cópias disponíveis para o livro: ${book.title}`);
                    return res.status(400).json({ message: `Não há cópias disponíveis para o livro: ${book.title}` });
                }
            } else {
                console.error(`Livro com ID ${bookId} não encontrado no banco de dados`);
                return res.status(404).json({ message: `Livro com ID ${bookId} não encontrado no banco de dados` });
            }
        }

        // Limpa o carrinho após mover todos os livros para empréstimos
        user.reservas = [];
        await user.save();

        console.log('Todos os livros foram movidos do carrinho para empréstimos com sucesso');
        res.status(200).json({ message: 'Todos os livros foram movidos para empréstimos', emprestimos: user.emprestimos });
    } catch (error) {
        console.error('Erro ao mover livros para empréstimos:', error);
        res.status(500).json({ message: 'Erro ao mover livros para empréstimos', error: error.message || error });
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROTAS PARA LIDAR COM EMPRÉSTIMOS DO USUÁRIO
// Atualizar o status de um empréstimo de um usuário
router.put('/:userId/emprestimos/:emprestimoId/status', async (req, res) => {
    const { userId, emprestimoId } = req.params;
    const { status } = req.body; // O novo status do empréstimo

    try {
        // Encontrar o usuário pelo ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Encontrar o empréstimo específico pelo ID
        const emprestimo = user.emprestimos.id(emprestimoId);
        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }

        // Atualizar o status do empréstimo
        emprestimo.status = status;

        // Salvar as alterações no banco de dados
        await user.save();

        res.status(200).json({ message: 'Status do empréstimo atualizado com sucesso', emprestimo });
    } catch (error) {
        console.error('Erro ao atualizar status do empréstimo:', error);
        res.status(500).json({ message: 'Erro ao atualizar status do empréstimo', error });
    }
});

// Rota para buscar os livros no empréstimos do usuário
router.get('/:userId/emprestimos', async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findById(userId).populate('emprestimos.bookId'); // Popula os detalhes dos livros no carrinho
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        res.status(200).json({ emprestimos: user.emprestimos });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar livros do empréstimos', error });
    }
});

// Prorroga em 10 dias a devolução do livro
router.put('/:userId/emprestimos/:emprestimoId/prazo_devolucao', async (req, res) => {
    const { userId, emprestimoId } = req.params;

    try {
        // Encontrar o usuário pelo ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Encontrar o empréstimo específico pelo ID
        const emprestimo = user.emprestimos.id(emprestimoId);
        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }

        // Verificar se prazoDevolucao já existe e somar 10 dias
        if (emprestimo.prazoDevolucao) {
            const prazoAtual = new Date(emprestimo.prazoDevolucao);
            const novoPrazo = new Date(prazoAtual.setDate(prazoAtual.getDate() + 10));
            emprestimo.prazoDevolucao = novoPrazo;
        } else {
            return res.status(400).json({ message: 'Prazo de devolução atual inválido' });
        }

        // Salvar as alterações no banco de dados
        await user.save();

        res.status(200).json({ 
            message: 'Prazo de devolução do empréstimo atualizado com sucesso', 
            novoPrazo: emprestimo.prazoDevolucao 
        });
    } catch (error) {
        console.error('Erro ao atualizar prazo de devolução do empréstimo:', error);
        res.status(500).json({ message: 'Erro ao atualizar prazo de devolução do empréstimo', error });
    }
});

// Altera o status do empréstimo para "Checkout Devolução"
router.put('/:userId/emprestimos/:emprestimoId/informar_devolucao', async (req, res) => {
    const { userId, emprestimoId } = req.params;

    try {
        // Encontrar o usuário pelo ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Encontrar o empréstimo específico pelo ID
        const emprestimo = user.emprestimos.id(emprestimoId);
        if (!emprestimo) {
            return res.status(404).json({ message: 'Empréstimo não encontrado' });
        }

        // Alterar o status para "Checkout Devolução"
        emprestimo.status = "Checkout Devolução";

        // Salvar as alterações no banco de dados
        await user.save();

        res.status(200).json({ message: 'Status do empréstimo alterado para "Checkout Devolução" com sucesso', emprestimo });
    } catch (error) {
        console.error('Erro ao alterar status do empréstimo:', error);
        res.status(500).json({ message: 'Erro ao alterar status do empréstimo', error });
    }
});

// Rota para processar devolução de um livro emprestado
router.put('/:userId/emprestimos/:emprestimoId/devolver', async (req, res) => {
    const { userId, emprestimoId } = req.params;

    try {
        // Localiza o usuário
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        // Localiza o empréstimo específico
        const emprestimo = user.emprestimos.id(emprestimoId);
        if (!emprestimo) return res.status(404).json({ message: 'Empréstimo não encontrado' });

        // Atualiza a data de devolução
        emprestimo.dataDevolucao = new Date();

        // Localiza o livro relacionado
        const book = await Book.findById(emprestimo.bookId);
        if (!book) return res.status(404).json({ message: 'Livro não encontrado' });

        // Atualiza os valores de qtdeBook e copies
        emprestimo.qtdeBook -= 1;
        book.copies += 1;

        // Salva o usuário e o livro atualizados
        await user.save();
        await book.save();

        res.status(200).json({
            message: 'Livro devolvido com sucesso',
            emprestimoAtualizado: emprestimo,
            livroAtualizado: book,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao processar devolução do livro', error });
    }
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
