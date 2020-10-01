import React, {useState} from 'react'
import { Button, Form, Input, DatePicker, Space  } from "antd"
import axios from 'axios'
import {createProject} from "../services/projects"
import { useForm } from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'


function NewProject({ history }) {
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState(null)
    const [date, setDate] = useState(null)

    async function sendProject(values) {
        await createProject({...values, image: imageUrl, date: date})
        history.push('/home')
    }

    async function uploadImage({ target: { files }}) {
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "wrappApplication")

        const {
            data: { secure_url }
        } = await axios.post(
            "https://api.cloudinary.com/v1_1/djkvj5wq9/image/upload", 
            data
        )
        setImageUrl(secure_url)
    }

    function onChange(date, dateString) {
      console.log('este es el cabron', date)
      setDate(date)
    }


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
      <FormItem name='date' label='Date'>
      <Space direction="vertical">
    <DatePicker format={'DD/MM/YYYY'} onChange={onChange} />
  </Space>
      </FormItem>
      <input type='file' onChange={uploadImage}/>
      <Button type='primary' htmlType='submit' disabled={!imageUrl}>
        Create project
      </Button>
    </Form>
    )
}

export default NewProject
