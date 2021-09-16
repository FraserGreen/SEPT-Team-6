import React from 'react'
import { Button, Table, Container, Row, Col, Form, Label} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './ManageBooks.css';


export const ManageBooks = () => {
    
    const dropDown = () =>
    {
        return(
            <Form>
                <Form.Label
                className="me-sm-2"
                htmlFor="inlineFormCustomSelect"
                visuallyHidden
                >
                Pending
                </Form.Label>
                <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                    <option value="0">Pending</option>
                    <option value="1">Accepted</option>
                    <option value="2">Rejected</option>
                </Form.Select>
            </Form>
        )
    };

    return (
        <div>
             <div>
                <Container>
                    <Row>
                        <Col>
                            <div className='addBook'>
                                <NavLink to = "/management/books/add">
                                <Button style={{width:'100px', background:'cadetblue', border:'cadetblue'}}>
                                    Add
                                </Button>
                                </NavLink>
                            </div>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>The Hungry Caterpillar</td>
                            <td>Eric Carle</td>
                            <td>
                            <Form>
                                <Form.Label
                                    className="me-sm-2"
                                    htmlFor="inlineFormCustomSelect"
                                    visuallyHidden
                                    >
                                    Pending
                                </Form.Label>
                                <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                                    <option value="0">Pending</option>
                                    <option value="1">Accepted</option>
                                    <option value="2">Rejected</option>
                                </Form.Select>
                            </Form>

                            </td>

                            </tr>
                            <tr>
                            <td>2</td>
                            <td>Harry Potter</td>
                            <td>J.K Rowling</td>
                            <td>
                            <Form>
                                <Form.Label
                                    className="me-sm-2"
                                    htmlFor="inlineFormCustomSelect"
                                    visuallyHidden
                                    >
                                    Pending
                                </Form.Label>
                                <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                                    <option value="0">Pending</option>
                                    <option value="1">Accepted</option>
                                    <option value="2">Rejected</option>
                                </Form.Select>
                            </Form>
                            </td>
                            
                            </tr>
                            <tr>
                            <td>3</td>
                            <td>Hunter x Hunter</td>
                            <td>Yoshihiro Togashi</td>
                            <td>
                            <Form>
                                <Form.Label
                                    className="me-sm-2"
                                    htmlFor="inlineFormCustomSelect"
                                    visuallyHidden
                                    >
                                    Pending
                                </Form.Label>
                                <Form.Select className="me-sm-2" id="inlineFormCustomSelect">
                                    <option value="0">Pending</option>
                                    <option value="1">Accepted</option>
                                    <option value="2">Rejected</option>
                                </Form.Select>
                            </Form>
                            </td>

                            </tr>
                        </tbody>
                    </Table>
                </Container>
            </div>
        </div>
    )
}
