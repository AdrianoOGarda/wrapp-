import axios from 'axios'
let devUrl = process.env.REACT_APP_DEV_URL;
let prodUrl = process.env.REACT_APP_PROD_URL;

const baseURL = `${process.env.NODE_ENV === 'production' ? prodUrl : devUrl}/projects`

const service = axios.create({ withCredentials: true, baseURL })

export const createProject = async projectInfo => {
    return await service.post("/", projectInfo)
}

export const getOneProject = async projectId => {
    return await service.get(`/${projectId}`)
}

export const getAllProjects = async projectInfo => {
    return await service.get("/")
}