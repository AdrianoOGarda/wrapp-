import axios from 'axios'
let devUrl = process.env.REACT_APP_DEV_URL;
let prodUrl = process.env.REACT_APP_PROD_URL;

const baseURL = `${process.env.NODE_ENV === 'production' ? prodUrl : devUrl}/userR`

const service = axios.create({ withCredentials: true, baseURL })


export const unfollowUser = async userId => {
    return await service.get(`/${userId}`)
}