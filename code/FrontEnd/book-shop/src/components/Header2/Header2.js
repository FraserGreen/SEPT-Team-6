import React from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Navbar , NavDropdown} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import "../Header2/Header2.css"

export const Header2 = () => {
    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <NavLink to = '/' style={{textDecoration:"none"}}>                        
                        <h1 className='logo'>
                            BOOKEROO
                        </h1>
                        </NavLink>
                    </Col>
                
                    <Col>
                        <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                        </Form>
                    </Col>
              
                </Row>
        

       
            </Container>

           
        </div>
    )
}