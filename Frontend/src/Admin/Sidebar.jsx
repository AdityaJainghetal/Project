import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import { Link, Navigate, useNavigate} from 'react-router-dom';

const Sidebar = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const logout=()=>{
        window.localStorage.clear()
        navigate("/")
    }
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Sidebar
        </Button>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Dashboard</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>

          
      


          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/dashboard/insert"}>Insert</Nav.Link>
            <Nav.Link as={Link} to="display">display</Nav.Link>
            <Nav.Link as={Link} to="deleted">deleted</Nav.Link>
          </Nav>
          
            <button onClick={logout}>Log out</button>
          </Offcanvas.Body>
        </Offcanvas>
      </>
  )
}

export default Sidebar