import React, { useEffect, useState } from "react";
import apiConnection from "../apiConnection";
import { apiEndpoints, httpMethods } from "../constants/constants";
import { getSession } from "../utils/sessionMethods";
import {Button,Card,Row} from "react-bootstrap";
import AddCourse from "./AddCourse";

export default function Dashboard() {
  const[courses,setCourses]=useState([])
  const[modalShow,setModalShow]=useState(false);

  const getCourses = async () => {
    const data = await apiConnection(
      `${apiEndpoints.GET_COURSES_ENDPOINT}/${getSession('userId')}`,
      httpMethods.GET
    );
    if (data.status === 200) {
      setCourses([...data.data]);
      console.log(data)
    } 
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="w-100 p-3">
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Add Course
      </Button>     
      <Row xs={1} md={2} className="g-4 mt-4">
      {courses.map((item,idx) => (
          <Card className="w-100 m-0 mb-2">
            {/* <Card.Img variant="top" src="holder.js/100px160" /> */}
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>
                {item.description}
              </Card.Text>
            </Card.Body>
          </Card>
      ))}

    </Row>
      <AddCourse show={modalShow} onHide={()=>setModalShow(false)}/>
    </div>
  );
}
