import React, {useState, useEffect, useContext} from 'react'
import {getOneProject } from "../services/projects"
import { deleteProject } from "../services/projects"
import {deleteCrewPost, updateProj } from "../services/crewSearch"
import { Row, Col, Button, Modal, Typography, Avatar, Card } from 'antd'
import { InfoOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { MyContext } from "../context"
import Moment from "react-moment"

import NewCrewPost from "../components/CrewSearch"

const { Meta } = Card;
const { Title, Text } = Typography

const Project = ({history,
    match: {
        params: { projectId }
    }
}) => {
const [project, setProject] = useState(null)
const [showModal, setShowModal] = useState(false)
const [newPost, setnewPost] = useState(false)
const { user } = useContext(MyContext)

const deleteP = async() => {
      await deleteProject(projectId)
      history.push(`/users/${user._id}`)
    }

const deleteC = async(postId) => {
  await deleteCrewPost(postId)
  history.push(`/users/${user._id}`)
}



useEffect(() => {
    async function fetchProject() {
        const {
            data: { project }
        } = await getOneProject(projectId)
        setProject(project)
    }
    fetchProject()
}, [newPost, projectId])

console.log('===========>', project)

    return project ? (
      <div>
      <div style={{backgroundImage: `url(${project?.image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '85vw', borderRadius: '7px', height: '30vh'}}>
            </div>
        <Row gutter={[16, 16]}>
            <Col span={24}>
            <a href={`users/${project?.owner?._id}`}>  <Title level={4}>By: {project?.owner?.name}  <Avatar src={project?.owner?.image}></Avatar></Title></a> 
            </Col>
            <Col span={24}>
    <Title level={1} style={{ textDecoration: 'underline'}}>{project.name}</Title>
            </Col>
            <Col span={24}>
    <Title level={5}>{project.premise}</Title>
            </Col>
            <Col span={24} style={{display: 'flex'}}>
    <Title level={4}>To be shot in: {project.location}</Title>
            </Col>
            <Col span={24} style={{display: 'flex'}}>
    <Title level={4}>Around: <Moment format="DD/MM/YYYY" date={project.date}></Moment></Title>
            </Col>
            {user?._id === project?.owner?._id && (
              <>
            <Col span={24}>
              <Button block onClick={() => setShowModal(true)}>
                Searching for a crew? 
              </Button>
            </Col>
            <Col span={24}>
              <Button onClick={deleteP}>
                Delete Project
              </Button>
            </Col>
            </>
          )}
          <Modal
        title='Look for some talent'
        visible={showModal}
        onCancel={() => setShowModal(false)}
        width={1000}
        footer={[
          <Button danger onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        ]}
      >
        <NewCrewPost projectId={projectId} setnewPost={setnewPost}/>
      </Modal>
        </Row>
        


<div style={{width: '40vw', backgroundColor: '#A31E32', borderRadius: '7px'}}>
<div style={{alignSelf: 'center'}}><Title level={4} style={{color: 'white', alignSelf: 'center'}}>{project?.owner?.name} is looking for:</Title></div>

        <div style={{display: 'flex', width: '40vw', justifyContent: 'space-evenly', flexWrap: 'wrap', backgroundColor: '#A31E32' }}>
          {project?.posts.map((post, i) => (
            <Card
    style={{ width: 300, backgroundColor: 'black', color: 'white', margin: '15px', border: 'none', borderRadius: '7px'}}
    cover={
        
      <img
        alt="example"
        src={post.image}
      />
    }
    key={i}
  >
    <Meta
    className='projectMeta'
      title={post.name}
      description={post.description}
    />
    <br />
    <div>
        <p>{post.location}</p>
        <p>Wtite to: {post.contactInfo}</p>
        <p>(or start a chat with the user!)</p>
        <p>To be shot: {post.project.date}</p>
    </div>
    {user?._id === post.owner._id ? (
      <div>
      <Button onClick={() => deleteC(post._id)}>
        Delete post
      </Button>
    </div>
    ) : (
      <></>
    )}
    
  </Card>
          ))}
        </div>
        </div>
        </div>
        
        
    ) : (
        <div></div>
    )
}

export default Project
