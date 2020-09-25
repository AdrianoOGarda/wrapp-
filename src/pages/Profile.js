import React, {useState, useEffect, useContext} from 'react'
import { MyContext } from "../context"
import { getOneUser } from "../services/user"
import {Avatar, Row, Col, Modal, Button} from "antd"

const Profile = ({
    match: {
        params: { userId }
    }
}) => {
    const [oneUser, setOneUser] = useState(null)
    const [showModal, setShowModal] = useState(false)
    //const { user } = useContext(MyContext)

    useEffect(() => {
        console.log('sidugaiu')
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
                <Avatar size={84} src={oneUser?.image} style={{backgroundColor: '#F5F5F5', paddingBottom: '15px'}}/>
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{display: 'flex'}}>
                {oneUser?.name} 
                </Col>
                <Col span={12}>
                <Modal
                title='Edit your profile'
                visible={showModal}
                onCancel={() => setShowModal(false)}
                footer={[
                    <Button type='dashed' danger onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                  ]}
                >
                </Modal>
                </Col>
                
                
            </Row>
            
            
        </div>
    )
}

export default Profile
