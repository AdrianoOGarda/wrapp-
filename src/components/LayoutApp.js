import React, {useState, useContext} from 'react'
import {Link} from "react-router-dom"
import {logOut} from "../services"
import {MyContext} from "../context"


import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraAddOutlined,
  PlusCircleOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  StarOutlined,
  MessageOutlined,
  LogoutOutlined
} from '@ant-design/icons';

import { Typography } from 'antd';

const { Title } = Typography;

const { Header, Sider, Content } = Layout;

function LayoutApp({children}) {
    const [collapsed, setCollapsed] = useState(false)
    const { clearCtxUser, user } = useContext(MyContext)

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    const logoutProcess = async () => {
      await logOut()
      clearCtxUser()
    }


    return (
        <Layout style={{height: "100vh", backgroundColor: '#F5F5F5', boxSizing: 'border-box'}} >
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: '#F5F5F5'}}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" style={{backgroundColor: '#F5F5F5'}}>
          <Menu.Item key="1" icon={<HomeOutlined />} style={{color: 'black'}}>
            <Link to='/home' style={{color: 'black'}}>Home</Link>
            </Menu.Item>
            {user && (
              <Menu.Item key="2" icon={<UserOutlined />} style={{color: 'black'}}>
              <Link to={`/users/${user?._id}`} style={{color: 'black'}}>Profile</Link>
            </Menu.Item>
            )}
            <Menu.Item key="3" icon={<StarOutlined />} style={{color: 'black'}}>
            <Link to='/popular' style={{color: 'black'}}>Popular</Link>
            </Menu.Item>
            {user && (
              <>
            <Menu.Item key="4" icon={<VideoCameraAddOutlined />} style={{color: 'black'}}>
            <Link to='/projects' style={{color: 'black'}}>New Project</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<PlusCircleOutlined />} style={{color: 'black'}}>
            <Link to='/jobPosts' style={{color: 'black'}}>New Post</Link>
            </Menu.Item>
              <Menu.Item key="6" icon={<LogoutOutlined />} style={{color: 'black'}} onClick={logoutProcess}>
              <Link to='/'>Logout</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<MessageOutlined />} style={{color: 'black'}}>
              <Link to='/chats' style={{color: 'black'}}>Chats</Link>
            </Menu.Item>
            </>
            )}
            {!user && (
              <>
              <Menu.Item key="8" icon={<LoginOutlined />} style={{color: 'black'}}>
              <Link to='/login' style={{color: 'black'}}>Login</Link>
              </Menu.Item>
              <Menu.Item key="9" icon={<UserAddOutlined />} style={{color: 'black'}}>
              <Link to='/signup' style={{color: 'black'}}>Signup</Link>
              </Menu.Item>
              </>
            )}
            
          </Menu>
        </Sider>
        <div style={{height: '100vh', borderRight: '2px solid grey', marginTop: '12px', marginLeft: '12px'}}></div>
        <Layout className="site-layout" style={{backgroundColor: '#F5F5F5'}}>
          <Header className="site-layout-background" style={{ paddingLeft: "10px", backgroundColor: "#F5F5F5", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <Title level={1} style={{fontFamily: "Vollkorn", paddingRight: '4rem'}}><Link to='/' style={{fontFamily: "Vollkorn"}}>wrapp</Link></Title>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '2px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    )
}

export default LayoutApp
