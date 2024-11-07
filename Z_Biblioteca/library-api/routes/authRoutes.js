const express = require('express'); // Importa o express
const router = express.Router(); // Cria um roteador do express
const authController = require('../controllers/authController')

// Rota para registrar novos usuários
router.post('/register', authController.register);

// Rota para login
router.post('/login', authController.login);

// Rota para login
router.get('/profile', authController.getProfile);


module.exports = router; // Exporta o roteador para uso no app.js
