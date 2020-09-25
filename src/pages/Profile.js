import React, {useState, useEffect, useContext} from 'react'
import { MyContext } from "../context"
import { getOneUser } from "../services/user"
import {Avatar, Row, Col, Modal, Button} from "antd"
import EditProfile from "../components/EditProfile"

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
            <Row>
                <Col span={24} style={{display: 'flex'}}>
                <Avatar size={120} src={oneUser?.image} style={{backgroundColor: '#F5F5F5', paddingBottom: '15px'}}/>
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{display: 'flex'}}>
                {oneUser?.name} {oneUser?.crewTitle}
                </Col>
            </Row>
            <Row style={{paddingTop: '5px'}}>
                <Col span={12} style={{display: 'flex'}}>
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
            <Row style={{paddingTop: '10px'}}>
                <Col span={12} style={{display: 'flex', justifyContent: 'left', border: '1px solid grey'}}>
                    {oneUser?.about}
                </Col>
            </Row>
            
            
        </div>
    )
}

export default Profile
