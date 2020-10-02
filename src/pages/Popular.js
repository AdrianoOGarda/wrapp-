import React, { useEffect, useState } from 'react'
import { getAllProjects } from "../services/projects"
import { getAllUsers } from "../services/user"
import { getAllPosts } from "../services/post"
import {Card, Avatar, Typography} from 'antd'
import { Link } from "react-router-dom"
import { InfoCircleOutlined } from "@ant-design/icons"
import Moment from "react-moment"
import Orson from "../images/orson.png"
import SearchBar from "../components/SearchBar"

const { Title } = Typography;

const { Meta } = Card;


function Popular({history}) {
const [projects, setProjects] = useState(null)
const [users, setUsers] = useState(null)
const [posts, setPosts] = useState(null)

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

useEffect(() => {
  async function fetchPosts(){
      const {
          data: { jobPosts }
      } = await getAllPosts()
      setPosts(jobPosts)
  }
  fetchPosts()
}, [])



    return (
      <div>
      <SearchBar history={history}></SearchBar>
      <br/><br/><br/>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
        <Title level={1} style={{textDecoration: 'underline', display: 'inline'}}>New Projects</Title><Link to='/popUsers'><Title level={4} style={{display: 'inline', paddingLeft: '20px'}}>Check out our popular users</Title></Link>
        </div>
        <div style={{marginRight: '8vw'}}>
        <Link ><Title level={1} style={{textDecoration: 'underline'}}>New Posts</Title></Link>
        </div>
        </div>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '45vw'}}>
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
        <a href={`users/${project.owner?._id}`}><p style={{textDecoration: 'underline'}}>By: {project.owner?.name}</p></a>
        <p>{project.location}</p>
        <p>To be shot: <Moment format="DD/MM/YYYY" date={project.date} /></p>
    
  
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
          {posts?.map((post, i) => (
                <div key={i}>
                <Card
    style={{ width: 300 }}
    cover={
        
      <img
        alt="postImg"
        src={post.image}
       
      />
    }
  >
    <Meta
    avatar={<a href={`users/${post.owner?._id}`}><Avatar src={post.owner?.image}></Avatar></a>}
      title={post.name}
      description={post.description}
    />
    <br />
    <div>
        <p>{post.location}</p>
        <a href={`users/${post.owner?._id}`}><p style={{textDecoration: 'underline'}}>{post.owner?.name}</p></a>
    </div>
    <div>
        <video controls style={{width:'250px', height: '200px'}}>
            <source src={post.video} type="video/mp4" />
            <source src={post.video} type="video/ogg" />
        </video>
    </div>
  </Card>
  <br />
                </div>
              ))}
            </div>
        
            </div>
            </div>
    )
}

export default Popular
