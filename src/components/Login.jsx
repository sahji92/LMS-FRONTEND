import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import React, { useEffect, useState } from 'react'
import apiconnection from '../apiConnection';
import { apiEndpoints, httpMethods } from '../constants/constants';
import { useNavigate } from 'react-router-dom';
import { getSession, setSession } from '../utils/sessionMethods';

export default function Login() {

  const navigate = useNavigate()

  const [formData,setFormData] = useState({
    email:'',
    password: ''
  })
  
  const getData = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const loginUser = async (e) => {
    console.log('reached')
    e.preventDefault();
    const data = await apiconnection(apiEndpoints.LOGIN_ENDPOINT,httpMethods.POST,formData)
    if(data.data.status === 200) {
        // console.log(data.headers.getSetCookie())
        console.log(data)
        setSession('userName',data.data.message.name)
        setSession('userType',data.data.message.type)
        setSession('userid',data.data.message._id)
        setSession('isAuthenticated',true)
        console.log(getSession('isAuthenticated'))
        navigate('/')
    } else {
        
        console.log(data)
    }
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center h-100'>
      <div className='m-3 border border-dark w-25 p-5 rounded rounded-3'>
      <Form>
        <h3>Log In</h3>
        <Form.Group className='mb-3' as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control value={formData.email} name="email" required type="email" placeholder="Enter email" onChange={(e)=>getData(e)}/>
        </Form.Group>

        <Form.Group className='mb-3' as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={formData.password} name="password" required type="password" placeholder="Enter password" onChange={(e)=>getData(e)}/>
        </Form.Group>
        <Button className='mb-3 w-100 rounded rounded-3' variant="primary" type="submit" onClick={(e)=>loginUser(e)}>
            Log In
        </Button>
        <hr></hr>
        </Form>
        <Button className='mt-3 w-100 rounded rounded-3' variant="primary" type="submit" onClick={()=>navigate('/signup')}>
            Sign Up
        </Button>
      </div>
    </div>
  )
}