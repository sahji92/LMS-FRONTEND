import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';
import { getSession } from '../utils/sessionMethods';

 function Navigationbar() {
    return (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Brand Name</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">{getSession('userName')}</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );   
     }
export default Navigationbar