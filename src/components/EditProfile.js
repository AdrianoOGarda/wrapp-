import React, {useContext, useState} from 'react'
import {updateUser} from "../services/user"
import {Form, Button, Input, Select} from 'antd'
import axios from 'axios'
import { MyContext } from '../context'
const { Option } = Select



function EditProfile({ userId, setShowModal }) {
    const {user} = useContext(MyContext)

    const [form] = Form.useForm() 
    const [photo, setPhoto] = useState(null)
    const [backImage, setBackImage] = useState(null)

    const crewRoles = ["Art Director", "Assistant Food Stylist", "Assistant Director / 1st AD", "Assistant Director / 2nd AD", "Best Boy", "Boom Operator", "Camera Assistant (1st AC)", "Camera Assistant (2nd AC)", "Camera Operator", "Camera Operator (Aerial)", "Camera Operator (Jib Arm / Crane)", "Craft Service", "Costume Designer", "Captains / Gang Boss", "Composer (film score)", "Data Wrangling", "Digital Imaging Technician", "Director of Photography", "Director", "Editor", "Electrician", "Food Stylist", "Foley Artist", "Gaffer", "Grip", "Hair Stylist", "Key Grip", "Location Manager", "Location Scout", "Line Producer", "Makeup Artist", "Other (specified in the description)", "Prop Maker", "Prop Master", "Photographer / Production Stills", "Producer", "Production Assistant", "Production Coordinator", "Production Designer", "Production Manager", "Production Secretary",   "Pyro Technician / Explosives", "Scenic Artist / Painter", "Screenwriter", "Set Construction Coordinator / Builder", "Set Decorator / Dresser", "Storyboard Artist", "Steadicam Owner / Operator", "Script Supervisor / Continuity", "Sound Mixer", "Special Effects Coordinator", "Special Effects Technician", "Stunt Coordinator", "Teleprompter Operator", "Transportation Driver", "Videographer", "Video Assist Operator", "Wardrobe Stylist"]

    function onSearch(val) {
        console.log('search:', val);
        }


    async function uploadPhoto({ target: { files } }) {
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "wrappApplication")

        const {
        data: { secure_url }
        } = await axios.post("https://api.cloudinary.com/v1_1/djkvj5wq9/image/upload", data)

        setPhoto(secure_url)
        }

        async function uploadBackPhoto({ target: { files } }) {
            const data = new FormData()
            data.append("file", files[0])
            data.append("upload_preset", "wrappApplication")

            const {
            data: { secure_url }
            } = await axios.post("https://api.cloudinary.com/v1_1/djkvj5wq9/image/upload", data)

        setBackImage(secure_url)
        }
    

        async function sendUpdatedProfile(values) {
            setShowModal(false)

            await updateUser(userId, {...values, image: photo, backgroundImage: backImage})
        }

    return (
        <Form initialValues={user}layout='vertical' form={form} onFinish={sendUpdatedProfile}>
            <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='location' label='Location' rules={[{ required: true, message: 'Please input your location!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='about' label='About' rules={[{ required: true, message: 'Please tell us about yourself!' }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name='crewTitle' label='Crew Title' rules={[{ required: true, message: 'Please select your role!' }]}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Crew Role"
                optionFilterProp="children"
                name='crewTitle'
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                {crewRoles.map((role, i) => (
                    <Option key={i} value={role}>
                        {role}
                    </Option>
                ))}
            </Select>
            </Form.Item>
            <label htmlFor='profilePic'>Change your profile photo</label>
            <input type='file' onChange={uploadPhoto}/>
            <br />
            <label htmlFor='backgroundPic'>Change your background image</label>
            <input type='file' onChange={uploadBackPhoto}/>
            <br />
            <Button type='primary' htmlType='submit' disabled={!photo || !backImage}>
                Update your profile
            </Button>
        </Form>
    )
}

export default EditProfile
