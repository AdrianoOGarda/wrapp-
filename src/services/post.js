import axios from 'axios'
let devUrl = process.env.REACT_APP_DEV_URL;
let prodUrl = process.env.REACT_APP_PROD_URL;

const baseURL = `${process.env.NODE_ENV === 'production' ? prodUrl : devUrl}/jobPosts`

const service = axios.create({ withCredentials: true, baseURL })

export const createPost = async postInfo => {
    return await service.post("/", postInfo)
}

export const deletePost = async postId => {
    return await service.delete(`/${postId}`)
}

export const getAllPosts = async postInfo => {
    return await service.get('/')
}

// export const getOneProject = async projectId => {
//     return await service.get(`/${projectId}`)
// }

// export const getAllProjects = async projectInfo => {
//     return await service.get("/")
// }