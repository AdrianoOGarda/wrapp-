import axios from 'axios'

let baseURL = 'http://localhost:3000/projects'

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