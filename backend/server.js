const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

// Initialisation de l'application Express
const app = express();
const server = http.createServer(app);

// Configuration de Socket.io pour écouter sur le serveur
const io = new Server(server, {
  cors: {
    origin: '*', // Permet toutes les connexions CORS
  },
});

// Gestion de la connexion des utilisateurs
io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');

  // Écoute l'événement envoyé par le client
  socket.on('user_position', (position) => {
    console.log('Position reçue de l\'utilisateur:', position);
    // Envoie la position de l'utilisateur à tous les autres utilisateurs
    socket.broadcast.emit('other_user_position', position);
  });

  // Gestion de la déconnexion
  socket.on('disconnect', () => {
    console.log('Un utilisateur s\'est déconnecté');
  });
});

// Démarre le serveur sur le port 3000
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Serveur Socket.io lancé sur http://localhost:${PORT}`);
});
