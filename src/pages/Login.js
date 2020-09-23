import React from 'react'
import {Button} from 'antd'

let baseURL = "http://localhost:3000"

function Login() {
    return (
        <div>
            <h1>LOGIN</h1>
             <Button type='primary' block>
            <a href={`${baseURL}/auth/facebook`}>Login with Facebook</a>
          </Button>
            <Button danger type='primary' block>
            <a href={`${baseURL}/auth/google`}>Login with Google</a>
          </Button>
        </div>
    )
}

export default Login
