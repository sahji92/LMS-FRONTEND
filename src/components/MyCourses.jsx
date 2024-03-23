import React, { useEffect, useState } from 'react'
import { getSession } from '../utils/sessionMethods';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { apiEndpoints, httpMethods } from '../constants/constants';
import apiConnection from '../apiConnection';
export default function MyCourses() {

    const [courses,setCourses] = useState([]);

    const [isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate();

    const getMyCourses = async () => {
        setIsLoading(true)
        const data = await apiConnection(`${apiEndpoints.GET_USER_ORDERS_ENDPOINT}/${getSession('userid')}`,httpMethods.GET)
        setIsLoading(false)
        if(data.data.status === 200) {
            console.log(data)
            let filteredData = data.data.data.map(item => item.course)
            setCourses([...filteredData])
        } else {
            console.log(data)
        }
    }

    useEffect(()=>{getMyCourses()},[])

    return (
        isLoading?
        <Loader />
        :
        <div className='w-100 p-3'>
            <Row xs={1} md={2} className="mt-4">
            {courses.map((item, idx) => (
                <Card className='w-25 m-2 p-0'>
                    <Card.Img variant="top" src={item.image} />
                    <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                        {item.description}
                    </Card.Text>
                    <Card.Footer className='bg-white'>
                        <Button className='w-100 mb-2' variant="primary" onClick={() => navigate(`/courseVideos/${item._id}`)}>View Course</Button>
                    </Card.Footer>
                    </Card.Body>
                </Card>
            ))}
            </Row>
        </div>
      )
}