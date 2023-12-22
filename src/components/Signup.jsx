import React, { useEffect }  from "react";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import apiConnection from "../apiConnection";
import { apiEndpoints, httpMethods } from "../constants/constants";
export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    type: ""
  });
  const getData = (e) => {
    setFormData({ ...formData,[e.target.name]:e.target.value});
  };

const registerUser=async (e)=>{
    e.preventDefault()
    await apiConnection(apiEndpoints.REGISTER_ENDPOINT,httpMethods.POST,formData)
    console.log(formData)
}

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div>
      <Form className='m-3 border border-dark p-2'>

        <Form.Group as={Col} controlId="formGridName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} required placeholder="Enter name" onChange={(e)=>getData(e)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control name='email' value={formData.email}  required  type="email" placeholder="Enter email" onChange={(e)=>getData(e)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" value={formData.password} type="password" required placeholder="Enter password" onChange={(e)=>getData(e)}/>
        </Form.Group>

          <Form.Select aria-label="Select type" name="type" value={formData.type} onChange={(e)=>getData(e)}>
            <option>Select your account type</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </Form.Select>


        <Button className='mt-3 w-100 rounded rounded-3' variant="primary" type="submit" onClick={(e)=>registerUser(e)}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
