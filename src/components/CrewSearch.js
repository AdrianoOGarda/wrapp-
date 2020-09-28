import React, {useState} from 'react'
//import {updateUser} from "../services/user"
import {Form, Button, Input, Select, InputNumber} from 'antd'
import axios from 'axios'
import {createCrewPost} from "../services/crewSearch"
const { Option } = Select



function CrewSearch({ projectId, setnewPost }) {
    const [form] = Form.useForm() 
    const [photo, setPhoto] = useState(null)
    const [budget, setBudget] = useState(0)

    const crewRoles = ["Art Director", "Assistant Food Stylist", "Assistant Director / 1st AD", "Assistant Director / 2nd AD", "Best Boy", "Boom Operator", "Camera Assistant (1st AC)", "Camera Assistant (2nd AC)", "Camera Operator", "Camera Operator (Aerial)", "Camera Operator (Jib Arm / Crane)", "Craft Service", "Costume Designer", "Captains / Gang Boss", "Composer (film score)", "Data Wrangling", "Digital Imaging Technician", "Director of Photography", "Director", "Editor", "Electrician", "Food Stylist", "Foley Artist", "Gaffer", "Grip", "Hair Stylist", "Key Grip", "Location Manager", "Location Scout", "Line Producer", "Makeup Artist", "Other (specified in the description)", "Prop Maker", "Prop Master", "Photographer / Production Stills", "Producer", "Production Assistant", "Production Coordinator", "Production Designer", "Production Manager", "Production Secretary",   "Pyro Technician / Explosives", "Scenic Artist / Painter", "Screenwriter", "Set Construction Coordinator / Builder", "Set Decorator / Dresser", "Storyboard Artist", "Steadicam Owner / Operator", "Script Supervisor / Continuity", "Sound Mixer", "Special Effects Coordinator", "Special Effects Technician", "Stunt Coordinator", "Teleprompter Operator", "Transportation Driver", "Videographer", "Video Assist Operator", "Wardrobe Stylist"]

    function onSearch(val) {
        console.log('search:', val);
        }

        async function sendPost(values) {
            console.log(values)
            await createCrewPost(projectId, { ...values, image: photo, budget: budget })
            setnewPost(true)
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

        function addNumber(date, inputNumber) {
            console.log('este es el cabron', inputNumber)
            setBudget(inputNumber)
          }


    


    return (
        <Form layout='vertical' form={form} onFinish={sendPost}>
            <Form.Item name='name' label='Title' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name='description' label='Description' rules={[{ required: true, message: "Let our users know what you're looking for" }]}>
                <Input.TextArea />
            </Form.Item>
            <Form.Item name='location' label='Location' rules={[{ required: true, message: "Let our users know what you're looking for" }]}>
                <Input />
            </Form.Item>
            <Form.Item name='contactInfo' label='Contact information' rules={[{ required: true, message: "Let our users know what you're looking for" }]}>
                <Input />
            </Form.Item>
            <Form.Item name='budget' label='Budget' rules={[{ required: true, message: "Let our users know what you're looking for" }]}>
            <InputNumber
      defaultValue={1000}
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value.replace(/\$\s?|(,*)/g, '')}
      onChange={addNumber}
    />
            </Form.Item>
            <Form.Item name='lookingFor' label='Looking for a/an:' rules={[{ required: true, message: 'Please select your role!' }]}>
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a Crew Role"
                optionFilterProp="children"
                name='lookingFor'
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
            <label for='profilePic'>Add a photo to your search</label>
            <input type='file' onChange={uploadPhoto}/>
            <br />
            <Button type='primary' htmlType='submit' disabled={!photo}>
                Submit your search
            </Button>
        </Form>
    )
}

export default CrewSearch
