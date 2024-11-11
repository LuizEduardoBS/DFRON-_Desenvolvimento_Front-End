const express = require('express');
const GenNotif = require('../models/GeneralNotifications');
const router = express.Router();

// *** CRIAÇÃO (POST) ***
router.post('/', async (req, res) => {
  try {
    const { title, textNotifGeneral, status } = req.body;

    const newNotif = new GenNotif({
      title,
      textNotifGeneral,
      status,
    });

    await newNotif.save();
    res.status(201).json(newNotif);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar notificação geral', error });
  }
});

// Rota para buscar todos as notificações gerais
router.get('/', async (req, res) => {
  try {
    const notif = await GenNotif.find(); // Usa o modelo GeneralNotifications para buscar todas as notificações gerais
    res.status(200).json(notif); // Retorna a lista de notificações gerais
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar notificações gerais', error });
  }
});

module.exports = router;
