const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Função para registrar novos usuários
exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Verifica se o usuário já existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'E-mail já cadastrado.' });
        }

        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria um novo usuário com permissão padrão "Usuario"
        const newUser = new User({ username, email, password: hashedPassword, permissions: 'Usuário' });
        await newUser.save();
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
};

// Função para fazer login de usuários
exports.login = async (req, res) => {
    const { email, password, status, user } = req.body;

    try {
        // Busca usuário pelo e-mail
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Usuário não encontrado' });

        // Compara a senha fornecida com a senha armazenada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Senha incorreta' });

        // Cria web token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Retorna o token, a permissão do usuário, o status e o ID do usuário
        res.status(200).json({
            message: 'Login realizado',
            token: token,
            permissions: user.permissions, // Envia a permissão
            status: user.status,
            userId: user._id // Adiciona o ID do usuário na resposta
        });
    } catch (error) {
        console.error(error); // Loga o erro
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};

// Função para obter o perfil do usuário autenticado
exports.getProfile = async (req, res) => {
    try {
        // Decodifica o token para obter o ID do usuário
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Busca o usuário pelo ID decodificado
        const user = await User.findById(decoded.id).select('-password'); // Remove o campo "password" da resposta
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        // Retorna os dados do usuário
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar perfil do usuário' });
    }
};
