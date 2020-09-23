import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production' ?
    (baseURL = 'here should be your production endpoint') :
    (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });


export const test = async() => {
    return await service.get('/');
}

export const signup = async(user) => {
    return await SERVICE.post('/signup', user);
}

export const login = async(user) => {
    return await SERVICE.post('/login', user);
}

export const logOut = async() => {
    return await SERVICE.get('/logout');
}

export const getProfile = async() => {
    return await service.get("/profile")
}