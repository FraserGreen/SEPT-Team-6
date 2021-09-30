import React from 'react'
import { useParams } from 'react-router'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Container} from 'react-bootstrap'
import { useHistory } from 'react-router';

export const Search = () => {

    const history = useHistory();

    const {searchInput} = useParams();

    const[books, setBooks] = useState();

    const changeURL = (bookId) => {

        history.push("/book/"+ bookId)
    }

    const populateData = async () => 
    {

        try
        {
            const config = 
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                withCredentials:true
            }

            const searchRequest = {
                searchTerm:String(searchInput)
            }
            console.log("Search:", searchInput)
            const responseGetData = await axios.post('http://localhost:8081/api/books/searchbooks', searchRequest, config);
            console.log("Got search", responseGetData)

            return responseGetData.data;
        }
        catch(error)
        {
            console.log(error);
        }
    }

    useEffect(() => {
        async function fetchData() {
            const bookData = await populateData();
            if (!bookData)
            {
                setBooks(bookData)
            }
            else
            {
                setBooks()
            }
        }

        fetchData();
    }, [searchInput])

    if (books)
    {
        const booksDisplay = books.map(book => 
            {
                return (
                    <Col>
                        <Card onClick={() => changeURL(book.id)} tag='a' style={{ width: '15rem', height:'20rem', maxHeight:'20rem', cursor:'pointer'}} >
                            <Card.Img variant="top" src={book.imgURL} style={{height:'25vh'}} />
                                <div className='bookCardContent'>

                                    <Card.Body>
                                        <Card.Title>
                                            <div className='bookCardTitle'>
                                            {book.title}
                                            </div>
                                        </Card.Title>
                                        <Card.Text>
                                            <div className='bookPrice'>
                                                ${book.price}
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </div>

                        </Card>
                </Col>
                )
            }
        )

        return (
            <div>
                <Container>
                    <Row>
                        {booksDisplay}
                    </Row>
                </Container>
            </div>
        )
    }
    else
    {
        return (
            <div>
                
            </div>
        )
    }

}
