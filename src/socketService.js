import io from 'socket.io-client';

const socket = io('http://localhost:3000');

export default {
  connect() {
    return socket;
  },
  sendPosition(position) {
    socket.emit('user_position', position);
  },
  onOtherUserPosition(callback) {
    socket.on('other_user_position', callback);
  }
};
