import React, { useState } from 'react';
import './App.css';
import socket from './components/socket';
import Chat from './components/Chat';

function App() {
  // socket.emit('conectado', 'Hello from client!')
  const [name, setName] = useState('');
  const [registered, setRegistered] = useState(false);

  const register = (event) => {
    event.preventDefault();

    if (name !== ''){
      setRegistered(true);
    }
  };

  return (
    <div className="App">
      {
        !registered && 

        <form onSubmit={register}>
          <label htmlFor="">Introduzca su nombre:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
          <button type='submit'>Ir al chat</button>
        </form>
      }

      {
        registered && 
        <Chat name={name}></Chat>
      }
    </div>
  );
}

export default App;
