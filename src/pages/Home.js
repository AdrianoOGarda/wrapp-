import React from 'react';
import Bergman from "../images/bergman.png"


function Home() {
  return (
    <div>
      <h1>Home</h1>
      <img src={Bergman} style={{width: '800px', position: 'absolute', right: '0', bottom: '0'}}/>
    </div>
  );
}

export default Home;
