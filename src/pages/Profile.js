import React, {useState, useEffect, useContext } from 'react'
import { MyContext } from "../context"
import { getOneUser, updateUser } from "../services/user"
import { deletePost } from "../services/post"
import { createChat } from "../services/chat"
import {Avatar, Row, Col, Modal, Button, Typography, Card} from "antd"
import { InfoCircleOutlined, TeamOutlined } from "@ant-design/icons"
import EditProfile from "../components/EditProfile"
import {Link} from 'react-router-dom'
import {followUser} from "../services/follow"
import {unfollowUser} from "../services/unfollow"
import axios from 'axios'

const { Meta } = Card;

const { Title } = Typography;

const Profile = ({
    history,
    match: {
        params: { userId }
    }
}) => {
    const { user, setCtxUser } = useContext(MyContext)
    const [oneUser, setOneUser] = useState(null)
    const [following, setFollowing] = useState(user?.following.filter(r => r._id === oneUser?._id).length)
    const [showModal, setShowModal] = useState(false)
    const [followers, setFollowers] = useState(oneUser?.followers?.length)

    const [hoverBack, setHoverBack] = useState(false)
    const [hoverImage, setHoverImage] = useState(false)
    //const [following, setFollowing] = useState(false)

    const handleGoToChat = async id => {
      const chat = user.chats.filter(c => returnTheOtherGuy(c?.person1._id, c.person2._id) === id)[0]

      if (chat) {
         return history.push(`/chats/${chat._id}`)
      }

      const {data} = await createChat(user._id, id)

      return history.push(`/chats/${data.chat._id}`)
  }

  const returnTheOtherGuy = (id1, id2) => {
    const idArr = [id1, id2]
    const filtered = idArr.filter(id => id !== user._id)

    return filtered[0]
}

    const follow = async () => {
       await followUser(userId)
       setFollowers(followers + 1)

        setFollowing(true)
    }

    const unfollow = async() => {
        await unfollowUser(userId)
        setFollowers(followers - 1)

        setFollowing(false)
    }

    const deleteOnePost = async(postId) => {
      await deletePost(postId)

      setOneUser({...oneUser, jobPosts: oneUser.jobPosts.filter(r => r._id !== postId)})
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

    useEffect(() => {
      if (oneUser) {

        setFollowers(oneUser.followers.length)

        if (user) {
          
          setFollowing(user?.following.filter(id => id === oneUser?._id).length !== 0)
        }
      }
    }, [oneUser, user])

    const updateProfile = (user) => {
      console.log(user)
      setOneUser({...oneUser, ...user})
    }

    async function uploadBackPhoto({ target: { files } }) {
      const data = new FormData()
      data.append("file", files[0])
      data.append("upload_preset", "wrappApplication")

      const {
      data: { secure_url }
      } = await axios.post("https://api.cloudinary.com/v1_1/djkvj5wq9/image/upload", data)

  await updateUser(userId, {...oneUser, backgroundImage: secure_url})
  setOneUser({...oneUser, backgroundImage: secure_url})
  }
    async function uploadPhoto({ target: { files } }) {
      const data = new FormData()
      data.append("file", files[0])
      data.append("upload_preset", "wrappApplication")

      const {
      data: { secure_url }
      } = await axios.post("https://api.cloudinary.com/v1_1/djkvj5wq9/image/upload", data)

  await updateUser(userId, {...oneUser, image: secure_url})
  setOneUser({...oneUser, image: secure_url})
  }

    return (
        <div>
        <label htmlFor='backgroundPic'>
        <div onMouseEnter={() => user?._id === userId && setHoverBack(true)} onMouseLeave={() => user?._id === userId && setHoverBack(false)} style={{border: hoverBack ? '1px solid #A31E32' : null,backgroundImage: `url(${oneUser?.backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '80vw', borderRadius: '7px'}}>
        {user?._id === userId &&
        <input id='backgroundPic' onChange={uploadBackPhoto} name='backgroundPic' type='file' style={{display: 'none'}} />}
            <Row>
                <Col span={24} style={{display: 'flex', marginTop: '100px', marginBottom: '100px', justifyContent: 'center'}}>
                <label htmlFor='profilePic'>
                {user?._id === userId &&
                <input id='profilePic' onChange={uploadPhoto} name='profilePic' type='file' style={{display: 'none'}} /> }
                <Avatar onMouseEnter={() => user?._id === userId && setHoverImage(true)} onMouseLeave={() => user?._id === userId && setHoverImage(false)} size={140} src={oneUser?.image} style={{border: hoverImage ? '1px solid #A31E32' : null, backgroundColor: '#F5F5F5', paddingBottom: '15px'}}/>
                </label>
                </Col>
            </Row>
            </div>
        </label>
            <Row style={{margin: '0px', paddingBottom: '0px', width: '80vw', display: 'flex', justifyContent: 'center'}}>
                <Col span={12}>
                <Title level={2} style={{fontFamily: 'B612'}}>{oneUser?.name}</Title>
                </Col>
            </Row>
            <Row style={{margin: '0px', paddingBottom: '0px', width: '80vw', display: 'flex', justifyContent: 'center'}}>
                <Col span={12}>
                <Avatar size={64} style={{backgroundColor: '#F5F5F5', display: 'inline'}} icon={<TeamOutlined style={{color: 'black'}}/>} /><Title level={5} style={{fontFamily: 'B612', display: 'inline'}}>  {followers} followers</Title>
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', width: '80vw', paddingBottom: '5px'}}>
                <Col span={12} style={{margin: '0px'}}>
                <Title level={5} style={{fontFamily: 'B612'}}>Works as a/an: {oneUser?.crewTitle}</Title> 
                {user?._id !== userId &&
                (following ? (  
                    <Button onClick={unfollow}>Unfollow</Button>
                ) : (
                  <Button onClick={follow}>Follow</Button>
              ))
                }
                </Col>
            </Row>

            {user?._id === userId ? (
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
                    <EditProfile updateProfile={updateProfile} setShowModal={setShowModal} userId={userId}/>
                </Modal>
                </Col>
            </Row>
              ) : (
                <Row style={{display: 'flex', justifyContent: 'center', width: '80vw'}}>
                <Col span={12}>
                <Button onClick={() => handleGoToChat(oneUser?._id)}>Go to chat</Button>
                </Col>
            </Row>
              )}
        
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
      {oneUser?.jobPosts.video ? (
    <video controls style={{width:'350px', height: '200px'}}>
        <source src={post.video} type="video/mp4" />
        <source src={post.video} type="video/ogg" />
    </video>
      ) : (
<></>
      )}
        
    </div>
    <div>
      <Button onClick={(e) => {
        e.preventDefault()
        deleteOnePost(post._id)
      }}>
        Delete post
      </Button>
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
