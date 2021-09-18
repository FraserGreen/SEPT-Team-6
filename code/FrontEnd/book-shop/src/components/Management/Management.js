import React from 'react'
import './Management.css';
import { Button, Row, Col, Container} from 'react-bootstrap'
import { Image } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const Management = () => {
    const history = useHistory();

    const goToBookManagement = () => {
        history.push("/management/books");
    };

    const goToUserManagement = () => {
        history.push("/management/users");
    };

    return (
        <div >
            <Container>
                <div className='paddingContainer'>
                <Row>
                    <Col>
                        <div className='buttonCustom'>
                            <Card tag='a' onClick={goToBookManagement} style={{cursor: 'pointer'}}>
                            <Card.Img variant="top" src="https://www.iconpacks.net/icons/2/free-opened-book-icon-3163-thumb.png" />
                            <Card.Body>
                            <Card.Text className='text-center'>
                                Manage Books
                            </Card.Text>
                            </Card.Body>
                            </Card>
                        </div>
                    </Col>
                    <Col>
                        <div className='buttonCustom'>
                            <Card tag='a' onClick={goToUserManagement} style={{cursor:'pointer'}}>
                            <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" />

                            <Card.Body>
                            <Card.Text className='text-center'>
                                Manage Users
                            </Card.Text>
                            </Card.Body>
                            </Card>      
                        </div>
                    </Col>
                </Row>
                </div>

            </Container>

      </div>
    )
}
