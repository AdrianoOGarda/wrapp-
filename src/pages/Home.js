import React, {useContext, useState, useEffect} from 'react';
import {MyContext} from "../context"
import {getOneUser} from "../services/user"
import Bergman from "../images/bergman.png"
import {Link} from "react-router-dom"
import { Card, Avatar } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import  SearchBar  from "../components/SearchBar"

const { Meta } = Card;



function Home({ history }) {
const [homeUser, setHomeUser] = useState(null)
const { user } = useContext(MyContext)



  useEffect(() => {
    async function fetchUser(){
        const {
            data 
        } = await getOneUser(user?._id)
        console.log('------------------')
        console.log(data.user.following.map(f => f.projects))
        setHomeUser(data.user)
    }
    
    fetchUser()
  }, [user])
  
  


  return (
    <div>
      <SearchBar history={history} />
      <h1>Home</h1>
      {homeUser?.following?.map((user, i) => (
      <div key={i}>
        <p >{user.name}</p>
        <p>{user.email}</p>
        {user.projects.map((project, i) => (
          <div key={i}>
                    <Card
    style={{ width: 300 }}
    cover={
        
      <img
        alt="example"
        src={project.image}
        
      />
    }
    actions={[
        <Link to={`/projects/${project._id}`}>
          <InfoCircleOutlined key='more'/>
        </Link>
      ]}
  >
    <Meta
    avatar={<a href={`users/${project.owner._id}`}><Avatar src={project.owner?.image}></Avatar></a>}
      title={project.name}
      description={project.premise}
    />
    <br />
    <div>
        <p>{project.location}</p>
  
        {project.posts?.map((post, i) => (
          <p key={i}>Looking for: {post.lookingFor}</p>
        ))}
    </div>
  </Card>
  <br/>
  </div>
        ))}
        </div>
      

      ))}
      <img src={Bergman} style={{width: '40vw', position: 'absolute', right: '0', bottom: '0'}}/>
    </div>
  );
}

export default Home;
