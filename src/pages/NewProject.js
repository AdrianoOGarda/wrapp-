import React, {useState} from 'react'
import { Button, Form, Input } from "antd"
import axios from 'axios'
import {createProject} from "../services/projects"
import { useForm } from 'antd/lib/form/Form'

function NewProject({ history }) {
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState(null)

    async function sendProject(values) {
        await createProject({...values})
        history.push('/')
    }

    // async function uploadImage({ target: { files }}) {
    //     const data = new FormData()
    //     data.append("file", files[0])
    //     data.append("upload_preset", "wrapp")

    //     const {
    //         data: { secure_url }
    //     } = await axios.post(
    //         "", 
    //         data
    //     )
    //     setImageUrl(secure-url)
    // }



    return (
        <Form layout='vertical' form={form} onFinish={sendProject}>
      <Form.Item name='name' label='Name'>
        <Input />
      </Form.Item>
      <Form.Item name='premise' label='Premise'>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name='location' label='Location'>
        <Input />
      </Form.Item>
      <input type='file'/>
      <Button type='primary' htmlType='submit' >
        Create project
      </Button>
    </Form>
    )
}

export default NewProject
