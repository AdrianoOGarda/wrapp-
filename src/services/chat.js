import axios from 'axios'
let devUrl = process.env.REACT_APP_DEV_URL;
let prodUrl = process.env.REACT_APP_PROD_URL;

const baseURL = `${process.env.NODE_ENV === 'production' ? prodUrl : devUrl}`

const service = axios.create({ withCredentials: true, baseURL });

export const createChat = async(person1, person2) => {
    return await service.post("/chat/:chatId", { person1, person2 })
}

export const createMesage = async(chatId, message) => {
    return await service.post(`/messages/${chatId}`, { body: message })
}

export const getChat = async(chatId) => {
    return await service.get(`/chat/${chatId}`)
}