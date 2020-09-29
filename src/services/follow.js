import axios from 'axios'
let baseURL = "http://localhost:3000/user"

const service = axios.create({ withCredentials: true, baseURL })

export const followUser = async userId => {
    return await service.get(`/${userId}`)
}