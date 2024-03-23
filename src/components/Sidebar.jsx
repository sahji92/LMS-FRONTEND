import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { apiEndpoints, httpMethods } from '../constants/constants';
import apiConnection from '../apiConnection';

export default function Sidebar() {

  const navigate = useNavigate()

  const logout = async () => {
    const data = await apiConnection(apiEndpoints.LOGOUT_ENDPOINT,httpMethods.GET)
    if(data.status === 200) {
        sessionStorage.clear();
        navigate('/login')
    } else {
        console.log(data)
    }
  }

  return (
    <div className='d-flex flex-column align-items-center bg-light' style={{height: '100vh', width: '300px'}}>
        <Link to='/' className='link-underline-opacity-0 link-info'>Courses</Link>
        <Link to='/myCourses' className='link-underline-opacity-0 link-info'>My Courses</Link>
        <Button className='mt-3 w-50 rounded rounded-3' variant="danger" type="submit" onClick={logout}>
            Log Out
        </Button>
    </div>
  )
}