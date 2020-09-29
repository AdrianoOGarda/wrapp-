import axios from 'axios'
let baseURL = "http://localhost:3000/userR"

const service = axios.create({ withCredentials: true, baseURL })


export const unfollowUser = async userId => {
    return await service.get(`/${userId}`)
}