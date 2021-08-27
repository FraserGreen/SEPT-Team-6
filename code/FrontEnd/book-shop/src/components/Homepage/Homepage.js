import React, {useState} from 'react'
import {data} from "../../data/Data"
import {Card, Row} from 'react-bootstrap'
import { Col, Container} from 'react-bootstrap'

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
        <div className='main-wrapper'>
            <Container>
            <Row >
            {bookDisplay}
            </Row>
            </Container>
 
        </div>
            

    )
}
