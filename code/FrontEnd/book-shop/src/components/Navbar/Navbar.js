
import React from 'react'
import { Container, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Navbar} from 'react-bootstrap'


export const NavigationBar = () => {
    return (
        <div className='categories'>
        <Navbar bg="light" variant="light" className='categories'>
            <Container className='categories'>
            <Navbar.Brand href="#home"></Navbar.Brand>
            <Nav className="me-auto">
            <Nav.Link href="#Fiction">Fiction</Nav.Link>
            <Nav.Link href="#Non Fiction">Non Fiction</Nav.Link>
            <Nav.Link href="#Kids">Kids & Teen</Nav.Link>
            <Nav.Link href="#Adult">Adult</Nav.Link>
            <Nav.Link href="#School">School</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        </div>
    )
}
