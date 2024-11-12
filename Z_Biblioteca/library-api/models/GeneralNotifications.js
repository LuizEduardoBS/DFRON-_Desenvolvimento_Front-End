const mongoose = require('mongoose');

// Definindo o esquema da notificação geral
const NotificationsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  textNotifGeneral: { type: String, required: true },
  status: { type: String, default: 'GERAL' },
  dataNotif: { type: Date, default: Date.now } // Campo para data e hora do cadastro
});

// Exporta o modelo de notificações gerais
module.exports = mongoose.model('generalNotifications', NotificationsSchema);
