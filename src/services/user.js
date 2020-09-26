import axios from 'axios'
let baseURL = "http://192.168.1.5:3000/users"

const service = axios.create({ withCredentials: true, baseURL })

export const getAllUsers = async() => {
    return await service.get("/")
}

export const getOneUser = async userId => {
    return await service.get(`/${userId}`)
}

export const updateUser = async(userId, userInfo) => {
    await service.put(`/${userId}`, userInfo)
}