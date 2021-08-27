import React from 'react'
import {Button, Container} from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { Navbar , NavDropdown} from 'react-bootstrap'
export const Header2 = () => {
    return (
        <div>
            <Navbar>
            <h1 className='logo'>
                BOOKEROO
            </h1>


            <div class='float-right'>

            <NavDropdown title="Title" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action1">Title</NavDropdown.Item>
                <NavDropdown.Item href="#action2">Author</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Genre</NavDropdown.Item>
            </NavDropdown>

            <div class = 'float-right'>

            <Container>

            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search"
                    className="mr-2"
                    aria-label="Search"
                />
            <Button variant="outline-success">Search</Button>
            </Form>
            </Container>
            </div>

            </div>

      

           
            </Navbar>
           

           
        </div>
    )
}
