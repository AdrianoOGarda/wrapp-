import React from 'react'
import { Carousel, Image } from 'antd';
import Oddysey from "../images/oddysey.jpg"
import Kubrick from "../images/kubrick.jpeg"


function Landing() {
    
    const contentStyle = {
  height: '50vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
  marginTop: '10vh'
};

    return (
        <div>
     <Carousel autoplay>
    <div>
      <Image style={contentStyle} src={Oddysey}/>
    </div>
    <div>
    <Image style={contentStyle} src={Kubrick}/>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
        </div>
    )
}

export default Landing