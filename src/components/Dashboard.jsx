import React, { useEffect, useState } from 'react'
import { apiEndpoints, httpMethods } from '../constants/constants';
import apiconnection from '../apiConnection';
import { getSession } from '../utils/sessionMethods';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import AddCourse from './AddCourse';
import { useNavigate, Link } from 'react-router-dom';
import Loader from './Loader';

export default function Dashboard() {

   const [courses,setCourses] = useState([]);

   const [isLoading,setIsLoading] = useState(false);

   const navigate = useNavigate();

   const [modalShow, setModalShow] = useState(false);

   const getCourses = async () => {
    setIsLoading(true)
    let url = getSession('userType') === 'teacher'?
     `${apiEndpoints.GET_COURSES_ENDPOINT}/${getSession('userid')}`
     : `${apiEndpoints.GET_ALL_COURSES_ENDPOINT}`
    const data = await apiconnection(url,httpMethods.GET)
    setIsLoading(false)
    if(data.data.status === 200||data.data.status === 201) {
        if (getSession('userType') !== 'teacher') {
            let filteredData
            const purchasedData = await apiconnection(`${apiEndpoints.GET_USER_ORDERS_ENDPOINT}/${getSession('userid')}`,httpMethods.GET)
            if(purchasedData.data.status === 200) {
                filteredData = purchasedData.data.data.map(item => item.course._id)
                console.log('Purchased array',filteredData)
            } else {
                console.log(purchasedData)
            }
            console.log(data)
            let allCourses = data.data.data.map(item => ({...item,isPurchased: filteredData.includes(item._id)}))
            console.log('All courses',allCourses)
            setCourses([...allCourses])
        } else {
            setCourses([...data.data.data])
        }
       
    } else {
        console.log(data)
    }
   }

   const createOrder = async (courseId) => {
    setIsLoading(true);
    const data = await apiconnection(apiEndpoints.CREATE_ORDER_ENDPOINT,httpMethods.POST,{course: courseId})
    setIsLoading(false)
    if(data.data.status === 200) {
        console.log(data)
        alert(data.data.message)
    } else {
        console.log(data)
        alert('Some error please try again later.')
    }
   }
   
   useEffect(()=>{getCourses()},[modalShow])

  return (
    isLoading?
    <Loader />
    :
    <div className='w-100 p-3'>
        {getSession('userType') === 'teacher' && <Button variant="primary" onClick={() => setModalShow(true)}>
            Add Course
        </Button>}
        <Row xs={1} md={2} className="mt-4">
        {courses.map((item, idx) => (
            <Card className='w-25 m-2 p-0'>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                    {item.description}
                </Card.Text>
                {
                getSession('userType') === 'teacher' ?
                <Card.Footer className='bg-white'>
                    <Button className='w-100 mb-2' variant="primary" onClick={() => navigate(`/courseVideos/${item._id}`)}>Add Video</Button>
                    <Button className='w-100' variant="warning" onClick={() => navigate(`/editCourse/${item._id}`)}>Edit Course</Button>
                </Card.Footer> :
                <Card.Footer className='bg-white'>
                {item.isPurchased ?
                    <Button className='w-100 mb-2' variant="primary" onClick={() => navigate(`/courseVideos/${item._id}`)}>View Course</Button>
                     :
                    <Button className='w-100 mb-2' variant="primary" onClick={() => createOrder(item._id)}>Buy</Button>}
                </Card.Footer>} 
                </Card.Body>
            </Card>
        ))}
        </Row>
        <AddCourse
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </div>
  )
}