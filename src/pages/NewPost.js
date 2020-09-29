import React, {useState} from 'react'
import { Button, Form, Input, Select } from "antd"
import axios from 'axios'
import {createPost} from "../services/post"
import { useForm } from 'antd/lib/form/Form'
import FormItem from 'antd/lib/form/FormItem'

const { Option } = Select


function NewPost({ history }) {
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState(null)
    const [videoUrl, setVideoUrl] = useState(null)
    
    const crewRoles = ["Art Director", "Assistant Food Stylist", "Assistant Director / 1st AD", "Assistant Director / 2nd AD", "Best Boy", "Boom Operator", "Camera Assistant (1st AC)", "Camera Assistant (2nd AC)", "Camera Operator", "Camera Operator (Aerial)", "Camera Operator (Jib Arm / Crane)", "Craft Service", "Costume Designer", "Captains / Gang Boss", "Composer (film score)", "Data Wrangling", "Digital Imaging Technician", "Director of Photography", "Director", "Editor", "Electrician", "Food Stylist", "Foley Artist", "Gaffer", "Grip", "Hair Stylist", "Key Grip", "Location Manager", "Location Scout", "Line Producer", "Makeup Artist", "Other (specified in the description)", "Prop Maker", "Prop Master", "Photographer / Production Stills", "Producer", "Production Assistant", "Production Coordinator", "Production Designer", "Production Manager", "Production Secretary",   "Pyro Technician / Explosives", "Scenic Artist / Painter", "Screenwriter", "Set Construction Coordinator / Builder", "Set Decorator / Dresser", "Storyboard Artist", "Steadicam Owner / Operator", "Script Supervisor / Continuity", "Sound Mixer", "Special Effects Coordinator", "Special Effects Technician", "Stunt Coordinator", "Teleprompter Operator", "Transportation Driver", "Videographer", "Video Assist Operator", "Wardrobe Stylist"]

    async function sendProject(values) {
        await createPost({...values, image: imageUrl, video: videoUrl})
        history.push('/')
    }

    function onSearch(val) {
        console.log('search:', val);
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

    async function uploadVideo({ target: { files }}) {
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "wrappApplication")

        const {
            data: { secure_url }
        } = await axios.post(
            "https://api.cloudinary.com/v1_1/djkvj5wq9/video/upload", 
            data
        )
        setVideoUrl(secure_url)
        console.log('============>', secure_url)
    }



    return (
        <Form layout='vertical' form={form} onFinish={sendProject}>
      <Form.Item name='name' label='Name'>
        <Input />
      </Form.Item>
      <Form.Item name='description' label='Description'>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name='location' label='Location'>
        <Input />
      </Form.Item>
      <Form.Item name='contactInfo' label='Contact Information'>
        <Input />
      </Form.Item>
      <Form.Item name='crewTitle' label='Crew Title' rules={[{ required: true, message: 'Please select your role!' }]}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Crew Role"
                optionFilterProp="children"
                name='crewTitle'
                onSearch={onSearch}
                filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
        {crewRoles.map((role, i) => (
        <Option key={i} value={role}>
            {role}
        </Option>
            ))}
            </Select>
        </Form.Item>
      <label>Upload an image</label>
      <input type='file' onChange={uploadImage}/>
      <label>Upload a video</label>
      <input type='file' encType="multipart/form-data" onChange={uploadVideo}/>
      <Button type='primary' htmlType='submit' disabled={!videoUrl}>
        Create project
      </Button>
    </Form>
    )
}

export default NewPost