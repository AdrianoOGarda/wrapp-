import { Button } from 'antd'
import React, {useState, useEffect, useContext} from 'react'
import {MyContext} from '../context';
import {getAllUsers} from '../services/user'
import { createChat } from "../services/chat"

const Chats = ({history}) => {
    const [userList, setUserList] = useState([])

    const {user} = useContext(MyContext)

    const fetchUsers = async () => {
        const {data: {users}} = await getAllUsers()

        setUserList(users)
    }

    //const handleGoToChat = id => history.push(`/chats/${id}`)
    const handleGoToChat = async id => {
        const chat = user.chats.filter(c => returnTheOtherGuy(c.person1, c.person2) === id)[0]

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
        return (
            <div>
                Welcome to your chats
    
                START CHAT WITH:
    
                {userList.map((u) => <Button onClick={() => handleGoToChat(u._id)}>{u.name}</Button>)}
                <br/>
                <br/>
                {user?.chats?.map((c) => 
                <Button onClick={() => handleGoToChat(returnTheOtherGuy(c.person1, c.person2))}>
                    {returnTheOtherGuy(c.person1, c.person2)}
                </Button>
                )}
            </div>
        )
    }

    return <div>You have no chats</div>
    
}

export default Chats
