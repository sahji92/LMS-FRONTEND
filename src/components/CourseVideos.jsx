import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import { useParams } from 'react-router-dom';
import AddCourseVideo from './AddCourseVideo';
import Button from 'react-bootstrap/Button';
import { getSession } from '../utils/sessionMethods';
import apiConnection from '../apiConnection';
import { apiEndpoints, httpMethods } from '../constants/constants';

export default function CourseVideos() {

   const {course_id} = useParams()

   const [courseVideos,setCourseVideos] = useState([]);

   const [modalShow, setModalShow] = useState(false);

   const getCourseVideos = async () => {
    const data = await apiConnection(`${apiEndpoints.GET_COURSE_VIDEOS_ENDPOINT}/${course_id}`,httpMethods.GET)
    if(data.data.status === 200) {
        console.log(data)
        setCourseVideos([...data.data.data])
    } else {
        console.log(data)
    }
   }
   
   useEffect(()=>{getCourseVideos()},[modalShow])

  return (
    <div>
    { getSession('userType') === 'teacher' && <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Course Videos
    </Button>}
    {courseVideos.length > 0 ? courseVideos.map((item, idx) => (
         <Card>
         <Row>
           <Col xs={4}>
               <Image src={item.thumbnail} thumbnail />
           </Col>
           <Col>
               <Card.Body>
                    <h4>{item.name}</h4>
                   <p>
                      {item.description}
                   </p>
               </Card.Body>
           </Col>
         </Row>
       </Card>
    )) : <p>No Videos Yet!</p>}
    <AddCourseVideo 
        show={modalShow}
        course_id={course_id}
        onHide={() => setModalShow(false)}
    />
    </div>
  )
}