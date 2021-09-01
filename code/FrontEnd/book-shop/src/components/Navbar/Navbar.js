
import React from 'react'
import { Col, Container, Nav, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { Navbar} from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import './Navbar.css';


export const NavigationBar = () => {
    return (
        <div className='categories'>
            <br></br>
            <Container>
                <Row>
                    <Col>
                        <NavLink to="/Fiction" style={{textDecoration:"none"}}>
                            <div className = 'navItems' >
                                Fiction
                            </div>
                            </NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/Non Fiction" style={{textDecoration:"none"}}>
                            <div className = 'navItems'> 
                                Non Fiction
                            </div></NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/Kids" style={{textDecoration:"none"}}>
                            <div className = 'navItems'>
                            Kids & Teen
                            </div>
                            </NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/Adult" style={{textDecoration:"none"}}>
                            <div className='navItems'>
                                Adult
                                </div></NavLink>
                    </Col>

                    <Col>
                        <NavLink to="/School" style={{textDecoration:"none"}}>
                            <div className='navItems'>
                                School
                                </div></NavLink> 
                    </Col>
                </Row>



            </Container>

        </div>
    )
}
