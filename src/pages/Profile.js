import React, {useState, useEffect, useContext} from 'react'
import { MyContext } from "../context"
import { getOneUser } from "../services/user"
import {Avatar, Row, Col, Modal, Button, Typography} from "antd"
import EditProfile from "../components/EditProfile"

const { Title } = Typography;

const Profile = ({
    match: {
        params: { userId }
    }
}) => {
    const [oneUser, setOneUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
    //const { user } = useContext(MyContext)

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
        <div style={{backgroundImage: `url(${oneUser?.backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '70vw', borderRadius: '7px'}}>
            <Row>
                <Col span={24} style={{display: 'flex', marginTop: '100px', marginBottom: '100px', justifyContent: 'center'}}>
                <Avatar size={140} src={oneUser?.image} style={{backgroundColor: '#F5F5F5', paddingBottom: '15px'}}/>
                </Col>
            </Row>
            </div>
            <Row style={{margin: '0px', paddingBottom: '0px', width: '70vw', display: 'flex', justifyContent: 'center'}}>
                <Col span={12}>
                <Title level={2} style={{fontFamily: 'B612'}}>{oneUser?.name}</Title> 
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', width: '70vw', paddingBottom: '5px'}}>
                <Col span={12} style={{margin: '0px'}}>
                <Title level={5} style={{fontFamily: 'B612'}}>I work as a/an: {oneUser?.crewTitle}</Title> 
                </Col>
            </Row>
            <Row style={{display: 'flex', justifyContent: 'center', width: '70vw'}}>
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

            <div style={{display: 'flex', justifyContent: 'space-between', width: 'calc(100% - 15%)', backgroundColor: '#A31E32', color: 'white', marginTop: '15px', borderRadius: '5px'}}>
                <div style={{padding: '10px'}}>
                  <Title level={2} style={{color: 'white'}}>ABOUT</Title>
                </div>
                <div style={{padding: '10px'}}>
                {oneUser?.about}
                </div>
            </div>
            
            
        </div>
    )
}

export default Profile
