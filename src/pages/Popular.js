import React, { useEffect, useState } from 'react'
import { getAllProjects } from "../services/projects"
import { getAllUsers } from "../services/user"

function Popular() {
const [projects, setProjects] = useState(null)
const [users, setUsers] = useState(null)

useEffect(() => {
    async function fetchProjects(){
        const {
            data: { projects }
        } = await getAllProjects()
        setProjects(projects)
    }
    fetchProjects()
}, [])

    return (
        <div>
            {projects?.map(project => (
                <h1>{project.name}</h1>
            ))}
        </div>
    )
}

export default Popular
