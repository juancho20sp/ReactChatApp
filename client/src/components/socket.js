import io from 'socket.io-client';

// Dirección del puerto
let socket = io('localhost:3000');

export default socket;