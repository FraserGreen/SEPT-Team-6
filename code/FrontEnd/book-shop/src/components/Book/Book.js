import React from 'react'
import { Container } from 'react-bootstrap'
import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Row, Col, Button} from 'react-bootstrap'
import './Book.css';

const axios = require('axios');

export const Book = () => {

    const ColouredLine = ({color}) => (
        <hr
            style={{
                color:color,
                backgroundColor: color,
                height: 2
            }}
        />
    );

    const [book, setBook] = useState({id: 0});
    const [dataLoaded, setLoadedData] = useState(false);
    let {bookID} = useParams();

    const populateData = async () =>
    {
        try
        {
            const config = 
            {
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  'Access-Control-Allow-Origin': '*',
              },
              withCredential: true
            }

            const bookRequest = {
                id:parseInt(bookID)
            }
            console.log("Sending request")
            const response = await axios.post("http://localhost:8081/api/books/getbook", bookRequest, config);

            return response.data;
        }  catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        async function fetchData(){
            if (dataLoaded === false) {
                const bookData = await populateData();
                setBook(bookData);
                setLoadedData(true);
            }
        }
        fetchData();

    }, [dataLoaded, book])

    if (book)
    {
        return (
            <div>
                <Container>
                    <Row>
                        <div className='layout'>
                            <div className='imageContainer'>
                            <Image fluid src= {book.imgURL}>
                            </Image>
                            </div>
                            
                            <div className='content'>
                                <div className='title'>
                                    {book.title}
                                </div>

                                <div className='author'>
                                    By: {book.author}
                                </div>

                                <ColouredLine color='black'/>
                                <span>
                                    <strong>
                                        ISBN: 
                                    </strong>
                                </span>{' '}
                                {book.isbn}
                                <br/>
                                
                                    <strong>
                                        Description: 
                                    </strong>
                                <br/>
                                {book.description}

                            </div>  

                            <div className='buyContainer'>
                                <div className='price'>

                                    $
                                    {book.price}

                                </div>
                                <Container>
                                    <Row>
                                        <div className='buttonBuy'>
                                            <Col class='col text-center'>
                                                <Button style={{fontSize:'30px', backgroundColor:'cadetblue', borderColor:'cadetblue', minWidth:'90%'}}variant="primary">
                                                    BUY NOW
                                                </Button>
                                            </Col>
                                        </div>
                                    </Row>
                                </Container>


                            </div>

                        </div>
                    </Row>
                </Container>
            </div>
        )
        }
    else
    {
        return (
            <div>
                <Container>
                <h1>
                    Book with ID '{bookID}' not found
                </h1>
                </Container>
            </div>
        )
    }
}
