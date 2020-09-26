import axios from 'axios'

let baseURL = 'http://192.168.1.5:3000'

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