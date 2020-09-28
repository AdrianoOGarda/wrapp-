import axios from 'axios'
let baseURL = "http://localhost:3000/crewPosts"

const service = axios.create({ withCredentials: true, baseURL })

export const createCrewPost = async(projectId, postInfo) => {
    return await service.post(`/${projectId}`, postInfo)
}


// export const getAllUsers = async() => {
//     return await service.get("/")
// }

// export const getOneUser = async userId => {
//     return await service.get(`/${userId}`)
// }

// export const updateUser = async(userId, userInfo) => {
//     await service.put(`/${userId}`, userInfo)
// }