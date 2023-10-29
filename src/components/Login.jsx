import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import apiConnection from "../apiConnection";
import { apiEndpoints, httpMethods } from "../constants/constants";
import { setSession } from "../utils/sessionMethods";
import {useNavigate } from "react-router-dom";
export default function Login() {
  const navigate=useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const getData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    const data = await apiConnection(
      apiEndpoints.LOGIN_ENDPOINT,
      httpMethods.POST,
      formData
    );
    if (data.status === 200) {
      setSession("userName", data.message.name);
      setSession("userType", data.message.type);
      setSession("userId", data.message._id);
      setSession("isAuthenticated", true);
      navigate('/')
    } else console.log(data);
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="m-3 border border-dark w-25 p-5 rounded rounded-3">
        <Form>
          <h3>Login</h3>
          <Form.Group className="mb-3" as={Col} controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={formData.email}
              required
              type="email"
              placeholder="Enter email"
              onChange={(e) => getData(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} controlId="formGridPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              value={formData.password}
              type="password"
              required
              placeholder="Enter password"
              onChange={(e) => getData(e)}
            />
          </Form.Group>

          <Button
            className="mt-3 w-100 rounded rounded-3"
            variant="primary"
            type="submit"
            onClick={(e) => login(e)}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
