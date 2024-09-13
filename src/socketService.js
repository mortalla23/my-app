import io from 'socket.io-client';

let socket = null;

export default {
    connect() {
        if (!socket) {
          socket = io('http://localhost:3000'); // Assure-toi que l'URL de ton backend est correcte
        }
        return socket;
      },
  // Envoie la position de l'utilisateur au serveur
  sendPosition(position) {
    if (socket) {
      socket.emit('user_position', position);
    } else {
      console.error('Socket non connecté');
    }
  },

  // Écoute les positions des autres utilisateurs
  onOtherUserPosition(callback) {
    if (socket) {
      socket.on('other_user_position', callback);
    } else {
      console.error('Socket non connecté');
    }
  }
};
