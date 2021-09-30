import React, {useState, useEffect} from 'react'
import {data} from "../../data/Data"
import {Card, Row} from 'react-bootstrap'
import { Col, Container} from 'react-bootstrap'
import { HomepageList } from './HomepageList'
import { NavLink, useHistory} from 'react-router-dom'

import './Homepage.css'


const axios = require("axios")
export const Homepage = () => {

    const history = useHistory();

    const[dataLoaded, setDataLoaded] = useState(false)
    const [books, setBooks] = useState(data)

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
            const response = await axios.post("http://localhost:8081/api/books/populateData", config);
            const adminResponse = await axios.post("http://localhost:8080/api/users/makeAdminAccount", config);
            const responseGetData = await axios.get('http://localhost:8081/api/books/getallbooks');
            return responseGetData.data;
          
        }   
        catch(error)
        {
          console.log(error);
        }
    }
    
    useEffect(() => {
        async function fetchData(){
            if(dataLoaded === false){
                const booksData = await populateData()
                console.log(booksData)
                setBooks(booksData)
                setDataLoaded(true)
            }
        }
        fetchData()
       
    }, [dataLoaded])

    const changeURL = (bookId) => {

        history.push("/book/"+ bookId)
    }
    
    const bookDisplay = books.map(book => {
        return (

            <Col class='col-lg-6'>
            <div className = 'cards'>

                <Card onClick={() => changeURL(book.id)} tag='a' style={{ width: '15rem', height:'20rem', cursor:'pointer'}} >
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
                </div>

            </Col>


        )
    })

    return (
        <div>
            <div className='main-wrapper-home-page'>

                <Container>
                    <Row className='justify-content-md-center'>
                    <Col md='auto'>
                        <div className='sideBar'>
                             <HomepageList/>
                        </div>
                    </Col>

                    <Col>
                        <Container>    
                            <Row>  
                                {bookDisplay}
                            </Row>
                        </Container>
                    </Col>
                    </Row>
                </Container>


            </div>
        </div>



            

    )
}
