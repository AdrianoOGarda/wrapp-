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
  UploadOutlined,
  HomeOutlined,
  LoginOutlined,
  UserAddOutlined,
  StarOutlined
} from '@ant-design/icons';

import { Typography } from 'antd';

const { Title } = Typography;

const { Header, Sider, Content } = Layout;

function LayoutApp({children}) {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    }


    return (
        <Layout style={{height: "100vh", backgroundColor: '#FFFFF0'}} >
        <Sider trigger={null} collapsible collapsed={collapsed} style={{backgroundColor: '#FFFFF0'}}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" style={{backgroundColor: '#FFFFF0'}}>
            <Menu.Item key="1" icon={<UserOutlined />} style={{color: 'black'}}>
              <Link to='/profile' style={{color: 'black'}}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<HomeOutlined />} style={{color: 'black'}}>
            <Link to='/' style={{color: 'black'}}>Home</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<StarOutlined />} style={{color: 'black'}}>
            <Link to='/popular' style={{color: 'black'}}>Popular</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<VideoCameraAddOutlined />} style={{color: 'black'}}>
            <Link to='/signup' style={{color: 'black'}}>New Project</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<LoginOutlined />} style={{color: 'black'}}>
            <Link to='/login' style={{color: 'black'}}>Login</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserAddOutlined />} style={{color: 'black'}}>
            <Link to='/signup' style={{color: 'black'}}>Signup</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{backgroundColor: '#FFFFF0'}}>
          <Header className="site-layout-background" style={{ paddingLeft: "10px", backgroundColor: "#FFFFF0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <Title level={1} style={{fontFamily: "Vollkorn", paddingRight: '4rem'}}>wrapp</Title>
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
