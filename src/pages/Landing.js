import React from 'react'
import { Carousel, Image, Typography } from 'antd';
import Oddysey from "../images/oddysey.jpg"
import Kubrick from "../images/kubrick.jpeg"
import Ingmar from "../images/ingmar.jpg"
import Jodor from "../images/jodor.jpg"

const {Title} = Typography

function Landing() {
    
    const contentStyle = {
  height: '336.38px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  marginTop: '10vh'
};

    return (
      <div>
        <div style={{width: '80vw', backgroundColor: 'black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
        <div style={{width: '40vw', borderRight: '1px solid white', marginTop: '10px', marginBottom: '10px', display: 'flex'}}>
          <Title level={2} style={{color: 'white', alignSelf: 'left', marginLeft: '10px'}}>WHAT IS WRAPP?</Title>
        </div>
        <div style={{width: '39vw'}}>
          <p style={{color: 'white', margin: '20px', textAlign: 'justify'}}><p style={{textDecoration: 'underline', display: 'inline'}}>wrapp</p> is the application for independent filmmakers, a space for artists to meet and start creating cinema. It is a tool for all filmmakers looking to work in a project or searching for a crew.</p>
        </div>
      </div>
      <br/>

        <div>
     <Carousel style={{height: 450, overflow: 'hidden'}} autoplay>
    <div>
      <Image style={{height: 336.38}} src={Oddysey}/>
    </div>
    <div>
    <Image  style={{height: 336.38}} src={Kubrick}/>
    </div>
    <div>
    <Image  style={{height: 336.38}} src={Ingmar}/>
    </div>
    <div>
    <Image  style={{height: 336.38}} src={Jodor}/>
    </div>
  </Carousel>
        </div>
        </div>
    )
}

export default Landing