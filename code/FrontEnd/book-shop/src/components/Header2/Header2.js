import React from 'react'
import {Button, Container, Row, Col} from 'react-bootstrap'
import { FormControl } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useHistory} from 'react-router'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "../Header2/Header2.css"

export const Header2 = () => {
    const history = useHistory();
    const [searchInput, setSearch] = useState("");
    const changeURL = () => {
        if (searchInput !== "")
        {
            history.push('/search/' + searchInput)
        }
    }
    return (
        <div className='header2'>
            <Container>
                <Row>
                    <Col>
                        <NavLink to = '/' style={{textDecoration:"none"}}>                        
                        <h1 className='logo'>
                            BOOKEROO
                        </h1>
                        </NavLink>
                    </Col>

                    <Col md={6}>
                        <br/>
                        <span>

                            <Form className="d-flex">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="mr-2"
                                aria-label="Search"
                                value = {searchInput}
                                onChange={event=>setSearch(event.target.value)}
                                onKeyPress={event=> {
                                    if (event.key == "Enter")
                                    {
                                        changeURL()
                                    }
                                }}
                            />
                            <Button onClick={changeURL} variant="outline-success">Search</Button>
                            </Form>
                        </span> 
                    </Col>
              
                </Row>
               
            </Container>

           
        </div>
    )
}
