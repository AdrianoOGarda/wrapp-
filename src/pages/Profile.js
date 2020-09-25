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
        <div style={{backgroundImage: `url(${oneUser?.backgroundImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', width: '50vw', borderRadius: '7px'}}>
            <Row>
                <Col span={24} style={{display: 'flex', margin: '100px'}}>
                <Avatar size={140} src={oneUser?.image} style={{backgroundColor: '#F5F5F5', paddingBottom: '15px'}}/>
                </Col>
            </Row>
            </div>
            <Row style={{margin: '0px', paddingBottom: '0px'}}>
                <Col span={12} style={{display: 'flex', margin: '10px', justifyContent: 'center'}}>
                <Title level={2} style={{fontFamily: 'Volkorn'}}>{oneUser?.name}</Title> 
                </Col>
            </Row>
            <Row style={{display: 'flex'}}>
                <Col span={12} style={{margin: '0px', alignSelf: 'center'}}>
                <Title level={4} style={{fontFamily: 'Volkorn'}}>I work as a/an: {oneUser?.crewTitle}</Title> 
                </Col>
                <Col span={12}>
                    <Button onClick={() => setShowModal(true)} style={{height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'left'}}>Edit your profile</Button>
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
        
            <div style={{width: '85vw', borderBottom: '2px solid #A52A2A', paddingTop: '10px'}}></div>
            <Row style={{paddingTop: '10px'}}>
                <Col span={12} style={{display: 'flex', justifyContent: 'left', border: '1px solid grey'}}>
                    {oneUser?.about}
                </Col>
            </Row>
            
            
        </div>
    )
}

export default Profile
