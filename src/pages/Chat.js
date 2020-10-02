import React, {useState, useEffect, useContext} from 'react'
import {Input, Button, Typography, Avatar} from 'antd'
import {createMesage, getChat} from "../services/chat"
import {MyContext} from "../context"
import openSocket from 'socket.io-client';
const {Title} = Typography

let devUrl = process.env.REACT_APP_DEV_URL;
let prodUrl = process.env.REACT_APP_PROD_URL;

const baseURL = `${process.env.NODE_ENV === 'production' ? prodUrl : devUrl}`

const socket = openSocket(baseURL); //192.168.15.26

function Chat({match: {params: {chatId}}}) {
const [message, setMessage] = useState('')
const [chat, setChat] = useState({})
const {user} = useContext(MyContext)

const fetchChat = async () => {
    const { data } =  await getChat(chatId)
    setChat(data.chat)
    console.log(data.chat)
 }

const returnTheOtherGuy = (id1, id2) => {
    const idArr = [id1, id2]
    const filtered = idArr.filter(id => id !== user._id)

    return filtered[0]
}


const handleChange = (e) =>{
    console.log(e)
    setMessage(e.target.value)
}

const handleSubmit = async () => {
    setMessage("")

    await createMesage(chatId, message)
    socket.emit("mensajeenviado", {recipient: returnTheOtherGuy(chat.person1._id, chat.person2._id), owner: user._id}, message)
    fetchChat()
}

  
useEffect(() => {
  if (user) {
    socket.on("mensajerecibido", recipientId => {
      if (recipientId === user._id) {
          fetchChat()
        }
    })  
  }
  
}, [user])

useEffect(()=> {
    fetchChat()
}, [])

if (user && chat.person1) {
      return (
        <div>
        <div>
        <Avatar size={140} src={[chat?.person1, chat?.person2].filter(u => u._id !== user?._id)[0].image} style={{backgroundColor: '#F5F5F5', paddingBottom: '15px'}}/>
        <Title level={2}>{[chat?.person1, chat?.person2].filter(u => u._id !== user?._id)[0].name}</Title>
        </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
        {chat?.messages?.map((m, i) => 
            m.owner === user?._id ? (
            <div style={{backgroundColor: '#84BEFF', color: 'white', alignSelf: 'flex-end', padding: '10px 15px', marginBottom: '5px', borderRadius: '15px'}}>{m.body}</div>
            ) : (
                <div style={{backgroundColor: 'lightgrey', padding: '10px 15px', marginBottom: '5px', borderRadius: '15px'}}>{m.body}</div>
            )
        )}
        </div>


<form onSubmit={e => e.preventDefault()}>
        <Input value={message} onChange={handleChange}/>
        <br />
        <br />
        <Button type='primary' htmlType='submit' onClick={handleSubmit}>Send Message</Button>
        </form>

        </div>
    )
            }
    return <div/>
}

export default Chat
