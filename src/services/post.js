import axios from 'axios'

let baseURL = 'http://localhost:3000/jobPosts'

const service = axios.create({ withCredentials: true, baseURL })

export const createPost = async postInfo => {
    return await service.post("/", postInfo)
}

// export const getOneProject = async projectId => {
//     return await service.get(`/${projectId}`)
// }

// export const getAllProjects = async projectInfo => {
//     return await service.get("/")
// }