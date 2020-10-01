import React, {useContext, useState, useEffect} from 'react';
import {MyContext} from "../context"
import {getOneUser} from "../services/user"
import Bergman from "../images/bergman.png"
import {Link} from "react-router-dom"
import { Card, Avatar, Typography } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import  SearchBar  from "../components/SearchBar"


const { Title } = Typography;
const { Meta } = Card;



function Home({ history }) {
const [homeUser, setHomeUser] = useState(null)
const { user } = useContext(MyContext)



  useEffect(() => {
    async function fetchUser(){
        const {
            data 
        } = await getOneUser(user?._id)
        console.log('------------------')
        console.log(data.user.following.map(f => f.projects))
        setHomeUser(data.user)
    }
    
    fetchUser()
  }, [user])
  
  


  return (
    <div>
      <SearchBar history={history} />

      <div style={{width: '80vw', backgroundColor: 'black', borderRadius: '7px', display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
        <div style={{width: '40vw', borderRight: '1px solid white', marginTop: '10px', marginBottom: '10px', display: 'flex'}}>
          <Title level={1} style={{color: 'white', alignSelf: 'left', marginLeft: '10px'}}>ANNOUNCEMENT</Title>
        </div>
        <div style={{width: '39vw'}}>
          <p style={{color: 'white', margin: '20px', textAlign: 'justify'}}><p style={{display: 'inline', fontWeight: 'bold', textDecoration: 'underline'}}>wrapp</p> is in solidarity with all those who suffer the consequences of systemic racism and social injustice. Recent events have yet again made clear a disequilibrium in societies all around the world.</p>
          <p style={{color: 'white', margin: '20px', textAlign: 'justify'}}>We believe cinema has the power to reveal, expose, and heal. As we mourn the deaths of the women, children, and men who have fallen victims of social injustice, we open up a space for filmmakers to communicate and create.  Now more than ever does the world need to battle injustice through Art and creativity.</p>
          <p style={{color: 'white', margin: '20px', textAlign: 'justify'}}>To start using the application, create an account and follow some of our users. Their posts and projects will be displayed on this page.</p>
        </div>
      </div>
    <br/>
    <br />
    <div>
    {user?.following.length > 0 ? (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Title level={2} style={{display: 'inline', margin: '0'}}>Projects you might like</Title>
      <Title level={2} style={{margin: '0px 30px 0px 0px', display: 'inline'}}>People looking to work</Title>
      </div>
      
    ) : (
      <Title level={2}>Start following some <Link to='/popUsers' style={{textDecoration: 'underline'}}>users</Link></Title>
    )}
      
    </div>

    
      <div style={{display: 'flex'}}>
      {homeUser?.following?.map((user, i) => (
      <div key={i} style={{width: '40vw', display: 'flex', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
        {user.projects.map((project, i) => (
          <div key={i}>
                    <Card
    style={{ width: 300 }}
    cover={
        
      <img
        alt="example"
        src={project.image}
        
      />
    }
    actions={[
        <Link to={`/projects/${project._id}`}>
          <InfoCircleOutlined key='more'/>
        </Link>
      ]}
  >
    <Meta
    avatar={<a href={`users/${project.owner._id}`}><Avatar src={project.owner?.image}></Avatar></a>}
      title={project.name}
      description={project.premise}
    />
    <br />
    <div>
        <p>{project.location}</p>
  
        {project.posts?.map((post, i) => (
          <p key={i}>Looking for: {post.lookingFor}</p>
        ))}
    </div>
  </Card>
  <br/>
  </div>
        ))}
        <div style={{marginLeft: '47vw', borderRight:'3px solid #A52A2A', height: '100vh'}}></div>
        </div>

        
      
      ))}
      

        {homeUser?.following?.map((user, i) => (
          <div key={i} style={{width: '40vw', display: 'flex', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
          {user.jobPosts.map((post, i) => (
            <div key={i}>
            <Card
    style={{ width: 350 }}
    cover={
        
      <img
        alt="postImg"
        src={post.image}
        style={{width: '300px', paddingLeft: 100}}
      />
    }
  >
    <Meta
    avatar={<a href={`users/${post.owner?._id}`}><Avatar src={post.owner?.image}></Avatar></a>}
      title={post.name}
      description={post.description}
    />
    <br />
    <div>
        <p>{post.location}</p>
        <a href={`users/${post.owner?._id}`}><p>{post.owner?.name}</p></a>
    </div>
    <div>
        <video controls style={{width:'300px', height: '200px'}}>
            <source src={post.video} type="video/mp4" />
            <source src={post.video} type="video/ogg" />
        </video>
    </div>
  </Card>
  <br />
  </div>
          ))}
          </div>
        ))}
      

      </div>

      <img src={Bergman} style={{width: '40vw', position: 'absolute', right: '0', bottom: '0'}}/>
    </div>
  );
}

export default Home;
