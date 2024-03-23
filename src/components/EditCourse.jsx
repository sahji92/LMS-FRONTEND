import React, { useEffect, useState } from "react";
import { Button, Col, Form} from "react-bootstrap";
import { getSession } from "../utils/sessionMethods";
import apiConnection from "../apiConnection";
import { apiEndpoints, httpMethods } from "../constants/constants";
import { useNavigate, useParams } from "react-router-dom";

export default function EditCourse(props) {

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discounted_price: "",
    teacher_id: getSession("userId"),
  });
const navigate=useNavigate();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  let {id}=useParams();

      const getData = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateCourse = async (e) => {
    e.preventDefault();
    if (parseInt(formData.discounted_price) > parseInt(formData.price)) {
      setError("Discount cant be grater than price");
      setShowError(true);
      return;
    }
    const data = await apiConnection(`${apiEndpoints.UPDATE_COURSE_ENDPOINT}/${id}`,httpMethods.PUT,formData);
    if(data.status===200){
      setError("course updated successfully");
      setShowError(true);
      navigate('/')
    }
    else{
      setError("Some technical error, plz try again lator.");
      setShowError(true);
      return;
    }
  };
    const getCourseData= async()=>{
      const data = await apiConnection(`${apiEndpoints.GET_COURSE_ENDPOINT}/${id}`,httpMethods.GET);
      if (data.data.status === 200) {
       setFormData([{...data.data}])
                               }
      else {
         console.log(data)
           }
    }

      useEffect(() => {
          getCourseData()
              },[id]);

  return (
        <Form>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              required
              placeholder="Enter name of the course"
              onChange={(e) => getData(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              value={formData.description}
              required
              type="text"
              placeholder="Enter description"
              onChange={(e) => getData(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              name="price"
              value={formData.price}
              type="number"
              required
              placeholder="Enter price"
              onChange={(e) => getData(e)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDiscountedPrice">
            <Form.Label>Discounted Price</Form.Label>
            <Form.Control
              name="discounted_price"
              value={formData.discounted_price}
              type="number"
              placeholder="Enter discount"
              onChange={(e) => getData(e)}
            />
          </Form.Group>

          <Button
            className="mt-3 w-100 rounded rounded-3"
            variant="primary"
            type="submit"
            onClick={(e) =>updateCourse(e)}
          >
            Update Course
          </Button>
          {showError && <p className="text-danger" >{error}</p>}
        </Form>
  );
}
