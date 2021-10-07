import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import "./BookListings.css"

export const BookListing = ({bookID}) => {
    const [tableDataUsed, setTableDataUsed] = useState([]);
    const [tableDataNew, setTableDataNew] = useState([]);

    const [book, setBook] = useState({id: 0});
    const [dataLoaded, setDataLoaded] = useState(false);
    const [listings, setListings] = useState();

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
        async function fetchData(){
            if (dataLoaded === false) {
                const bookData = await populateData("getBook");
                const listingsData = await populateData("getListings");

                if (listingsData && bookData)
                {
                    console.log("LISTINSGSOS", listingsData)
                    if (!listingsData.results && !bookData.results)
                    {
                        let dataNew = []
                        let dataUsed = []


                        for(const listing of listingsData.new){
                            let listingItem = {
                                id:listing.id,
                                seller:listing.seller,
                                type:listing.type,
                                price:listing.price,
                                sold:listing.sold
                                
                            }

                            if(listing.bookId === bookData.id){
                                listingItem = {
                                    ...listingItem, 
                                    title:bookData.title,
                                    author:bookData.author
                                }

                                dataNew.push(listingItem)
                            }

                        }

                        for(const listing of listingsData.used){
                            let listingItem = {
                                id:listing.id,
                                seller:listing.seller,
                                type:listing.type,
                                price:listing.price,
                                sold:listing.sold
                                
                            }

                                if(listing.bookId === bookData.id){
                                    listingItem = {
                                        ...listingItem, 
                                        title:bookData.title,
                                        author:bookData.author
                                    }
                                    dataUsed.push(listingItem)
                                }

                        }

                        console.log("asndjsabdad", dataNew)

                        setTableDataNew(dataNew); 
                        setTableDataUsed(dataUsed);  

                        setDataLoaded(true)
                    } 
                }
                else
                {
                    setBook()
                    setListings()
                    setDataLoaded(true)
                }
            }
        }
        fetchData();

    }, [dataLoaded, tableDataNew, tableDataUsed, listings, book])
    if (tableDataUsed || tableDataNew)
    {
        const displayTableDataUsed = tableDataUsed.map(listItem => 
            {
                return (
                    
                    <tr>
                    <td>{listItem.id}</td>
                    {/* <td>{listItem.title}</td> */}
                    <td>{listItem.seller}</td>
                    <td>{listItem.type}</td>
                    <td>{listItem.price}</td>
                    {
                        listItem.sold
                        ?
                        (<div>
                            Sold
                        </div>)
                        :
                        (<div>
                            Not sold
                        </div>
                        )
                    }
                    </tr>
                )
            }
        )
        const displayTableDataNew = tableDataNew.map(listItem => 
            {
                return (
                    
                    <tr>
                    <td>{listItem.id}</td>
                    {/* <td>{listItem.title}</td> */}
                    <td>{listItem.seller}</td>
                    <td>{listItem.type}</td>
                    <td>{listItem.price}</td>
                    {
                        listItem.sold
                        ?
                        (<div>
                            Sold
                        </div>)
                        :
                        (<div>
                            Not sold
                        </div>
                        )
                    }
                    </tr>
                )
            })
        
        return (
            <div>
                <Container>
                    <div className = 'tableList'>
                        <h3>
                            New Books for Sale
                        </h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Listing ID </th>
                            {/* <th>Title</th> */}
                            <th>Seller</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>

                
                            </tr>
                        </thead>
                        <tbody>
                            {displayTableDataNew}
                        </tbody>

                    </Table>
                    </div>
                    <div className = 'tableList'>
                        <h3>
                            Used books for Sale
                        </h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Listing ID </th>
                            {/* <th>Title</th> */}
                            <th>Seller</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>

                
                            </tr>
                        </thead>
                        <tbody>
                            {displayTableDataUsed}
                        </tbody>

                    </Table>
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
                <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Listing ID </th>
                        {/* <th>Title</th> */}
                        <th>Seller</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Status</th>

            
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>

                </Table>
                </div>
                <div>
                <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Listing ID </th>
                            {/* <th>Title</th> */}
                            <th>Seller</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Status</th>

                
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>

                    </Table>
                </div>
            </Container>
        </div>
        )
    }

}

