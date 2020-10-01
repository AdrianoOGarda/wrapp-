import React, {useState, useEffect} from 'react'
import {getAllUsers} from "../services/user"
import {Card, Avatar, Typography} from 'antd'
import SearchBar from "../components/SearchBar"

const { Title } = Typography;

function PopUsers({history}) {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        async function fetchUsers(){
            const {
                data: { users }
            } = await getAllUsers()
            setUsers(users)
        }
        fetchUsers()
      }, [])
    

    return (
        <div>
        <SearchBar history={history}></SearchBar><br /><br />
        <Title level={1} style={{textDecoration: 'underline', display: 'inline'}}>Check out our users</Title><br/><br/><br/>
            <div style={{width: '50vw', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
            {users?.map((user, i) => (
              <div key={i}>
              <Card
              style={{width: 150, backgroundColor: '#A31E32', color: 'white'}}
              >
                <a href={`users/${user._id}`}><Avatar src={user.image}></Avatar></a>
            <p>{user.name}</p>
            <p>{user.crewTitle}</p>
              </Card>
              <br/>
              </div>
          
              
            ))}
            </div>
        </div>
    )
}

export default PopUsers
