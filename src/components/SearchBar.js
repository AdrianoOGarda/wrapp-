import React, {useState, useEffect} from 'react'
import { Button, Radio } from 'antd';
import { AutoComplete } from "antd"
import { getAllUsers } from "../services/user"

const SearchBar = ({history}) => {
const [type, setType] = useState('name')
const [options, setOptions] = useState([])
const [value, setValue] = useState("")
const [users, setUsers] = useState([])

useEffect(() => {
    if(value){
        setOptions(
            users
            .filter(u => u[type] && u[type].toLowerCase().includes(value.toLowerCase()))
            .map(v => ({value: `${v.crewTitle}/ ${v.name}/ ${v.location}`, link: `/users/${v._id}`}))
            )
    }
}, [value])


useEffect(() => {
    async function FetchAllUsers(){
        const {data} = await getAllUsers()
        setUsers(data.users)
    }
    FetchAllUsers()
}, [])

const handleSelect = name => {
    const nameWithoutCrewTitle = name.split('/ ')[1]

    history.push('/users/' + users.filter(u => u.name === nameWithoutCrewTitle)[0]._id)
}



    return (
        <>
        Search users by:
        <Radio.Group value={type} onChange={({target: {value: btnValue}}) => setType(btnValue)}>
            <Radio.Button value="name" style={{marginLeft: '10px', marginBottom: '5px'}}>Name</Radio.Button>
            <Radio.Button value="crewTitle" style={{marginLeft: '10px', marginRight: '1px', marginBottom: '5px'}}>Crew Role</Radio.Button>
            <Radio.Button value="location" style={{marginLeft: '10px', marginRight: '10px', marginBottom: '5px'}}>Location</Radio.Button>
        </Radio.Group>
        <AutoComplete 
        style= {{width: '75vw'}}
        onChange={setValue}
        options={options}
        onSelect={handleSelect}
        />
        </>
    )
}

export default SearchBar
