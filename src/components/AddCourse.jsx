import React, { useState } from "react";
import { Button, Col, Form, Modal } from "react-bootstrap";
import { getSession } from "../utils/sessionMethods";
import apiConnection from "../apiConnection";
import { apiEndpoints, httpMethods } from "../constants/constants";

export default function AddCourse(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    discounted_price: "",
    teacher_id: getSession("userId"),
  });
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);

  const getData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createCourse = async (e) => {
    e.preventDefault();
    if (parseInt(formData.discounted_price) > parseInt(formData.price)) {
      setError("Discount cant be grater than price");
      setShowError(true);
      return;
    }
    const data = await apiConnection(
      apiEndpoints.CREATE_COURSES_ENDPOINT,
      httpMethods.POST,formData
    );
    if(data.status===201){
      setFormData({
        name: "",
        description: "",
        price: "",
        discounted_price: "",
        teacher_id: getSession("userId")
      })
      props.onHide()
    }
    else{
      setError("Some technical error plz try again lator.");
      setShowError(true);
      return;
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='"contained-modal-title-vcenter"'>
          Add Course
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
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
            onClick={(e) =>createCourse(e)}
          >
            Add Course
          </Button>
          {showError && <p className="text-danger" >{error}</p>}
        </Form>
      </Modal.Body>
      <Modal.Footer><Button onClick={props.onHide}>Close</Button></Modal.Footer>
    </Modal>
  );
}
