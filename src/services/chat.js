import axios from 'axios'

let baseURL = 'http://localhost:3000'

const service = axios.create({ withCredentials: true, baseURL });

export const createChat = async(person1, person2) => {
    return await service.post("/chat/:chatId", { person1, person2 })
}