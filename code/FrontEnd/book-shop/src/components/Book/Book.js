import React from 'react'
import { Container } from 'react-bootstrap'
import { useState, useEffect} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { Row, Col, Button, Modal, Table} from 'react-bootstrap'
import './Book.css';
import { useSessionUser } from '../../Hooks/useSessionUser';
import { useHistory } from 'react-router';
import { BookListing } from './BookListing';

const axios = require('axios');

export const Book = () => {
    // For error prompt
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseOk = () => {
        setShow(false)
        goToURL('/login');
    }
    const handleShow = () => setShow(true);

    const history = useHistory();

    const ColouredLine = ({color}) => (
        <hr
            style={{
                color:color,
                backgroundColor: color,
                height: 2
            }}
        />
    );

    const {loggedIn} = useSessionUser();
    const [book, setBook] = useState({id: 0});
    const [dataLoaded, setLoadedData] = useState(false);
    const [listings, setListings] = useState()
    const [findLowest, setFindLowest] = useState(false);
    const [displayPrice, setDisplayPrice] = useState("");

    let {bookID} = useParams();

    const populateData = async (request) =>
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

            if (request === "getBook")
            {
                const bookRequest = {
                    id:parseInt(bookID)
                }
    
                console.log("Sending book request")
                const response = await axios.post("http://localhost:8081/api/books/getbook", bookRequest, config);
    
                return response.data;
            }

            else if (request === "getListings")
            {
                const listingRequest = {
                    bookId:parseInt(bookID)
                }
                    
                console.log("Sending listings request")
                const response = await axios.post("http://localhost:8082/api/listings/getlistingsbybookid", listingRequest, config);
                console.log("Got listings", response.data)
                return response.data;
            }

        }  catch(error)
        {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("findlowest", findLowest)
        if (findLowest === false)
        {
            setLowestPrice();
            setFindLowest(true)
        }
       
    }, [book, findLowest])

    useEffect(() => {
        async function fetchData(){
            if (dataLoaded === false) {
                const bookData = await populateData("getBook");
                const listingsData = await populateData("getListings");

                setBook(bookData);
                setLoadedData(true);
                
                if (!listingsData.results)
                {
                    setListings(listingsData);
                    // setLowestPrice();
                    // setListingsExist(true);
                    console.log("What the dog doin?")
                    setFindLowest(false);

                }
            }
        }
        fetchData();

    }, [dataLoaded, book, listings])


    const goToURL = (url) =>
    {
        history.push(url);
    }

    // Helper function to obtain lowest listing price
    function getLowestPrice(type) {
        if (type === "new")
        {
            var lowestPrice = listings.new[0].price;
            for (const listingPrice of listings.new)
            {
                if (listingPrice.price < lowestPrice)
                {
                    lowestPrice = listingPrice.price;
                }
            }
        }
        else if (type === "used")
        {
            var lowestPrice = listings.used[0].price;
            for (const listingPrice of listings.used)
            {
                if (listingPrice.price < lowestPrice)
                {
                    lowestPrice = listingPrice.price;
                }
            }  
        }
        return lowestPrice;
    }

    // Finds lowest listing price 
    function setLowestPrice()
    {
        if (listings)
        {

            var temp = 0;

            if (listings.new && listings.used)
            {
                var newBook = getLowestPrice("new");
                var usedBook = getLowestPrice("used")
                if (newBook < usedBook)
                {
                    setDisplayPrice(String(newBook));
                }
                else
                {
                    setDisplayPrice(String(usedBook));
                }

            }
            
            if (listings.new && !listings.used)
            {
                console.log("HI")
                temp = getLowestPrice("new");
                setDisplayPrice(String(temp));
            }
            if (listings.used && !listings.new)
            {
                temp = getLowestPrice("used");
                setDisplayPrice(String(temp))
            }
        }
        
    }
    
    if (book)
    {

        return (
            <div>
                <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Not logged in!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Please login to purchase or create a listing for a book.</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseOk}>
                        Login
                    </Button>
                    </Modal.Footer>
                </Modal>
                </>
                <Container>
                    <Row>
                        <div className='layout'>
                            <div className='imageContainer'>
                            <Image fluid src= {book.imgURL} style={{height:'22rem', width:'15rem'}}>
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
                                    {
 
                                            listings
                                            ?
                                            (
                                            <div className='createListing'>
                                                <Container>
                                                    Lowest price at...
                                                    <div style={{fontSize:'40px'}}>
                                                    ${displayPrice}
                                                    </div>
                                                        <Col class='col text-center'>
                                                            <Button onClick = {()=> {
                                                                if (!loggedIn)
                                                                {
                                                                    handleShow()
                                                                }
                                                            }}style={{fontSize:'30px', backgroundColor:'cadetblue', borderColor:'cadetblue', minWidth:'90%'}}variant="primary">
                                                                BUY NOW
                                                            </Button>
                                                        </Col>
                                                </Container>
                                            </div>
                                            )
                                            :
                                            (
                                            <div>
                                                <div className='createListing'>

                                                    No listings
                                                    <div className='button'>

                                                            <Button onClick={()=>{
                                                                if (loggedIn)
                                                                {
                                                                    goToURL('/create-listing');
                                                                }
                                                                else
                                                                {
                                                                    handleShow()
                                                                }
                                                            }}style={{fontSize:'25px', backgroundColor:'cadetblue', borderColor:'cadetblue', minWidth:'70%'}}variant="primary">
                                                                Create Listing
                                                            </Button>

                                                    </div>
                                                </div>
                                            </div>

                                            )
                                    }

                                </div>

                            </div>

                        </div>
                    </Row>

                    <div>
                    <Row>
                       <BookListing bookID={bookID}></BookListing>
                        </Row>
                    </div>
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
