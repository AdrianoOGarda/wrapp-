import axios from 'axios';
let devUrl = process.env.REACT_APP_DEV_URL;
let prodUrl = process.env.REACT_APP_PROD_URL;

const baseURL = process.env.NODE_ENV === 'production' ? prodUrl : devUrl


const service = axios.create({ withCredentials: true, baseURL });


export const test = async() => {
    return await service.get('/');
}

export const signup = async(user) => {
    return await service.post('/signup', user);
}

export const login = async(user) => {
    return await service.post('/login', user);
}

export const logOut = async() => {
    return await service.get('/logout');
}

export const getProfile = async() => {
    return await service.get("/profile")
}