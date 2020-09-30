import axios from 'axios'
let devUrl = process.env.REACT_APP_DEV_URL;
let prodUrl = process.env.REACT_APP_PROD_URL;

const baseURL = `${process.env.NODE_ENV === 'production' ? prodUrl : devUrl}/users`

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