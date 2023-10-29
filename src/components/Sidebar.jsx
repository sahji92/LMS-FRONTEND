import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import apiConnection from "../apiConnection";
import { apiEndpoints, httpMethods } from "../constants/constants";

export default function Sidebar() {
         const navigate=useNavigate()
    const logout = async ()=> {
        const data = await apiConnection(
          apiEndpoints.LOGOUT_ENDPOINT,
          httpMethods.GET,
        );
        if (data.status === 200) {
          console.log("logout success")
          sessionStorage.clear()
          navigate('/login')
        }
        else
        console.log(data);
      };
  return (
    <div className="d-flex flex-column align-items-center bg-light" style={{height:'100vh',width:'300px'}}>
      <Link className="link-underline-opacity-0 link-info">Courses</Link>
      <Button
        className="mt-3 w-50 rounded rounded-3"
        variant="danger"
        type="submit"
        onClick={logout}
      >
        Logout
      </Button>
    </div>
  );
}
