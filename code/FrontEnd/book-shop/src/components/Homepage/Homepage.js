import React, {useState} from 'react'
import {data} from "../../data/Data"
import {Card, Row} from 'react-bootstrap'
import { Col, Container} from 'react-bootstrap'
import { HomepageList } from './HomepageList'

export const Homepage = () => {
    const [books, setBooks] = useState(data)
    
    const bookDisplay = books.map(book => {
        return (
            <Col>
                <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={book.image} />
                <Card.Body>
                    <Card.Title>{book.name}</Card.Title>
                    <Card.Text>
                    {book.desc}
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>

        )
    })

    return (
        <div>
            <div className='main-wrapper-home-page'>
                <br>
                </br>
                <Container>
                    
                <Row >
                    <Col>
                        <HomepageList/>
                    </Col>
                    
                {bookDisplay}
                </Row>
                </Container>

            </div>
        </div>



            

    )
}
