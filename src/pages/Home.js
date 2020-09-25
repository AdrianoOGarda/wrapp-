import React from 'react';
import {Button} from 'antd'
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

function Home() {

  const handleButtonClick = () => {
    console.log(socket)

    socket.emit('nuevoMensaje', 'hola')
  }

  return (
    <div>
      <h1>Home</h1>
      <Button type="primary" onClick={handleButtonClick}>dAME CLICK</Button>
    </div>
  );
}

export default Home;
