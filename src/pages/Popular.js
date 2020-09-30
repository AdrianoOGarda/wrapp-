import React, { useEffect, useState } from 'react'
import { getAllProjects } from "../services/projects"
import { getAllUsers } from "../services/user"
import {Card, Avatar, Typography} from 'antd'
import { Link } from "react-router-dom"
import { InfoCircleOutlined } from "@ant-design/icons"
import Orson from "../images/orson.png"

const { Title } = Typography;

const { Meta } = Card;


function Popular() {
const [projects, setProjects] = useState(null)
const [users, setUsers] = useState(null)

useEffect(() => {
    async function fetchProjects(){
        const {
            data: { projects }
        } = await getAllProjects()
        setProjects(projects)
    }
    fetchProjects()
}, [])

useEffect(() => {
  async function fetchUsers(){
      const {
          data: { users }
      } = await getAllUsers()
      setUsers(users)
  }
  fetchUsers()
}, [])




    return (
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
        <Title level={1} style={{textDecoration: 'underline'}}>New Projects</Title> 
        </div>
        <div>
        <Title level={1} style={{textDecoration: 'underline'}}>Users</Title>
        </div>
        </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '40vw'}}>
            {projects?.map((project, i) => (
                <div key={i}> 
                <Card
    style={{ width: 250 }}
    cover={
        
      <img
        alt="example"
        src={project.image}
        key={i}
      />
    }
    actions={[
        <Link to={`/projects/${project._id}`}>
          <InfoCircleOutlined key='more'/>
        </Link>
      ]}
  >
    <Meta
      avatar={<a href={`users/${project.owner?._id}`}><Avatar src={project.owner?.image}></Avatar></a>}
      title={project.name}
      description={project.premise}
    />
    <br />
    <div>
        <a href={`users/${project.owner?._id}`}><p style={{textDecoration: 'underline'}}>By: {project.owner.name}</p></a>
        <p>{project.location}</p>
    
  
        {project.posts?.map((post, i) => (
          <p key={i}>Looking for: {post.lookingFor}</p>
        ))}
    </div>
  </Card>
  <br />
  </div>
            ))}
  </div>
  
  <img src={Orson} style={{width: '25vw', position: 'absolute', right: '0', bottom: '0'}}/>
  

            
            
            
          <div style={{width: '35vw', height: '5vh', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            {users?.map((user, i) => (
              <div>
              <Card
              style={{width: 150, backgroundColor: '#A31E32', color: 'white'}}
              >
                <a href={`users/${user._id}`}><Avatar src={user.image}></Avatar></a>
            <p>{user.name}</p>
            <p>{user.crewTitle}</p>
              </Card>
              <br/>
              </div>
          
              
            ))}
            </div>
            
            
        
            </div>
            </div>
    )
}

export default Popular
