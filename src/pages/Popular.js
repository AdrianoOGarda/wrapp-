import React, { useEffect, useState } from 'react'
import { getAllProjects } from "../services/projects"
import { getAllUsers } from "../services/user"
import {Card, Avatar} from 'antd'
import { Link } from "react-router-dom"
import { InfoCircleOutlined } from "@ant-design/icons"
import Orson from "../images/orson.png"


const { Meta } = Card;

let baseURL = "http://localhost:3001/users"


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
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '45vw'}}>
            {projects?.map((project, i) => (
                <div key={i}> 
                <Card
    style={{ width: 300 }}
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
      avatar={<a href={`${baseURL}/${project.owner?._id}`}><Avatar src={project.owner?.image}></Avatar></a>}
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
  <br />
  </div>
            ))}
            
            <img src={Orson} style={{width: '600px', position: 'absolute', right: '0', bottom: '0'}}/>

            {users?.map((user, i) => (
              <div>
              <p>{user.name}</p>
              </div>
            ))}
            
            
        </div>
    )
}

export default Popular
