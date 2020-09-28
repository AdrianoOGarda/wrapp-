import React, {useState, useEffect, useContext} from 'react'
import {getOneProject} from "../services/projects"
import {Image, Row, Col, Button, Modal, Typography, Avatar } from 'antd'
import { MyContext } from "../context"
import NewCrewPost from "../components/CrewSearch"

const { Title, Text } = Typography

let baseURL = "http://localhost:3001/users"

const Project = ({
    match: {
        params: { projectId }
    }
}) => {
const [project, setProject] = useState(null)
const [showModal, setShowModal] = useState(false)
const [newPost, setnewPost] = useState(false)
const { user } = useContext(MyContext)



useEffect(() => {
    async function fetchProject() {
        const {
            data: { project }
        } = await getOneProject(projectId)
        setProject(project)
    }
    fetchProject()
}, [newPost, projectId])

    return project ? (
        <Row gutter={[16, 16]}>
            <Col span={24} >
            <Image src={project.image} />
            </Col>
            <Col span={24}>
            <a href={`${baseURL}/${project.owner._id}`}>  <Title level={4}>By: {project.owner.name}  <Avatar src={project.owner.image}></Avatar></Title></a> 
            </Col>
            <Col span={24}>
    <Title level={1}>{project.name}</Title>
            </Col>
            <Col span={24}>
    <Text>{project.premise}</Text>
            </Col>
            <Col>
    <Title level={4}>To be shot in: {project.location}</Title>
            </Col>
            {user?._id === project.owner._id && (
            <Col span={24}>
              <Button block onClick={() => setShowModal(true)}>
                Searching for a crew? 
              </Button>
            </Col>
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
        
        
    ) : (
        <div></div>
    )
}

export default Project
