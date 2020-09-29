import React, {useState, useEffect, useContext } from 'react'
import { MyContext } from "../context"
import { getOneUser } from "../services/user"
import {Avatar, Row, Col, Modal, Button, Typography, Card} from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import EditProfile from "../components/EditProfile"
import {Link} from 'react-router-dom'
import {followUser} from "../services/follow"

const { Meta } = Card;

const { Title } = Typography;

const Profile = ({
    match: {
        params: { userId }
    }
}) => {
    const [oneUser, setOneUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const { user } = useContext(MyContext)

    const follow = async () => {
        await followUser(userId)
    }

    useEffect(() => {
        async function fetchUser() {
            const {
                data: { user }
            } = await getOneUser(userId)
            setOneUser(user)
        }
        fetchUser()
        setShowModal(false)
    }, [userId])

   
    return (
        <div>
        <div style={{backgroundImage: `url(${oneUser?.backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '80vw', borderRadius: '7px'}}>
            <Row>
                <Col span={24} style={{display: 'flex', marginTop: '100px', marginBottom: '100px', justifyContent: 'center'}}>
                <Avatar size={140} src={oneUser?.image} style={{backgroundColor: '#F5F5F5', paddingBottom: '15px'}}/>
                </Col>
            </Row>
            </div>
            <Row style={{margin: '0px', paddingBottom: '0px', width: '80vw', display: 'flex', justifyContent: 'center'}}>
                <Col span={12}>
                <Title level={2} style={{fontFamily: 'B612'}}>{oneUser?.name}</Title> 
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', width: '80vw', paddingBottom: '5px'}}>
                <Col span={12} style={{margin: '0px'}}>
                <Title level={5} style={{fontFamily: 'B612'}}>I work as a/an: {oneUser?.crewTitle}</Title> 
                {user?.following.filter(id => id === oneUser?._id).length === 0 ? (
                    <Button onClick={follow}>Follow</Button>
                ) : (  
                    <Button>Unfollow</Button>
                )}
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', width: '80vw'}}>
                <Col span={12}>
                    <Button onClick={() => setShowModal(true)}>Edit your profile</Button>
                <Modal
                title='Edit your profile'
                visible={showModal}
                onCancel={() => setShowModal(false)}
                footer={[
                    <Button danger onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                  ]}
                >
                    <EditProfile userId={userId}/>
                </Modal>
                </Col>
            </Row>
        
            <div style={{width: '80vw', borderBottom: '2px solid #A52A2A', paddingTop: '10px'}}></div>

            <div style={{display: 'flex', justifyContent: 'space-between', width: '80vw', backgroundColor: '#A31E32', color: 'white', marginTop: '15px', borderRadius: '5px'}}>
                <div style={{padding: '10px'}}>
                  <Title level={2} style={{color: 'white', textDecoration: 'underline'}}>ABOUT</Title>
                </div>
                <div style={{padding: '10px'}}>
                {oneUser?.about}
                </div>
            </div>
            <br />
            <br />
            <br />

            <Row >
                <Col span={8} style={{display: 'flex', justifyContent: 'start'}}>
                <Title level={1} style={{textDecoration: 'underline'}}>PROJECTS</Title>
                </Col>
                <Col span={16} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                  {oneUser?.projects?.map((project, i) => (
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
        
                </Col>
            </Row>

            <br />
            <br />
            <div style={{width: '80vw', borderBottom: '2px solid #A52A2A', paddingTop: '10px'}}></div>
            <br />
            <br />

            <Row>
                <Col span={8} style={{display: 'flex', justifyContent: 'start'}}>
                    <Title level={1} style={{textDecoration: 'underline'}}>POSTS</Title>
                </Col>

                <Col span={16} style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                  {oneUser?.jobPosts?.map((post, i) => (
                      <div key={i}>
                    <Card
    style={{ width: 400 }}
    cover={
        
      <img
        alt="example"
        src={post.image}
        
      />
    }
  >
    <Meta
      title={post.name}
      description={post.description}
    />
    <br />
    <div>
        <p>{post.location}</p>
    </div>
    <div>
        <video controls style={{width:'350px', height: '200px'}}>
            <source src={post.video} type="video/mp4" />
            <source src={post.video} type="video/ogg" />
        </video>
    </div>
  </Card>
  <br/>
  </div>
                  ))}
        
                </Col>
            </Row>
            
            
        </div>
    )
}

export default Profile
