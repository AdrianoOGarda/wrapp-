import { Button, Typography } from 'antd'
import React, {useState, useEffect, useContext} from 'react'
import {MyContext} from '../context';
import {getAllUsers} from '../services/user'
import { createChat } from "../services/chat"

const {Title} = Typography

const Chats = ({history}) => {
    const [userList, setUserList] = useState([])

    const {user} = useContext(MyContext)

    const fetchUsers = async () => {
        const {data: {users}} = await getAllUsers()

        setUserList(users)
    }

    //const handleGoToChat = id => history.push(`/chats/${id}`)
    const handleGoToChat = async id => {
        const chat = user.chats.filter(c => returnTheOtherGuy(c.person1._id, c.person2._id) === id)[0]

        if (chat) {
           return history.push(`chats/${chat._id}`)
        }

        const {data} = await createChat(user._id, id)

        return history.push(`chats/${data.chat._id}`)

        console.log('no tengo chat con este bro')
    }


    const returnTheOtherGuy = (id1, id2) => {
        const idArr = [id1, id2]
        const filtered = idArr.filter(id => id !== user._id)

        return filtered[0]
    }

    useEffect(() => {
        fetchUsers()

    }, [])


    if (user) {
        console.log(user)
        return (
            <div>
                <Title level={2}>Welcome to your chats</Title>
                

                <div>
                    Go to your chat with: 
                    <br/>
                    <div style={{display: 'flex', justifyContent: 'space-evenly', width: '50vw'}}>
                    {user?.chats?.map((c) => 
                <Button type="primary" ghost onClick={() => handleGoToChat(returnTheOtherGuy(c.person1._id, c.person2._id))}>
                    {[c.person1, c.person2].filter(u => u._id !== user._id)[0].name}
                </Button>
                )}
                </div>
                </div>
            </div>
        )
    }

    return <div>You have no chats</div>
    
}

export default Chats
