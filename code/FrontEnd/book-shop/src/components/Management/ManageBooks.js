import React, {useState, useEffect} from 'react'
import { Button, Table, Container, Row, Col, Form, Label} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import './ManageBooks.css';
import axios from 'axios';


export const ManageBooks = () => {
    
    const[dataLoaded,setDataLoaded] = useState(false);
    const[data, setData] = useState();

    const getTableContents = async () =>
    {
        try
        {
            const response = await axios.get('http://localhost:8081/api/books/getallbooks');

            return response.data;
        }
        catch (error)
        {

        }
    }

    useEffect(()=>
    {
        async function fetchData() {
            if (dataLoaded === false)
            {
                const booksData = await getTableContents();
                console.log(booksData);
                setData(booksData);
                setDataLoaded(true);
            }
        }
        fetchData();
    }, [dataLoaded, data])


    if(data){
        const allBooksData = data.map(book => {
            return (
                
                <tr>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                {/* <td>
                    ${book.price} */}
                {/* <Form>
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
                </Form> */}
                {/* </td> */}
        
                </tr>
            
                
            )
        })
        return(
            <div>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <NavLink to = "/management">
                                <Button variant='danger' style={{width:'100px', float:'left'}}>
                                    Back
                                </Button>
                            </NavLink>
                        </div>
                    </Col>
                    <Col>
                        <div className='addBook'>
                            <NavLink to = "/management/books/add">
                                <Button variant ='success' style={{width:'100px'}}>
                                    Add
                                </Button>
                            </NavLink>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        {/* <th>Price</th> */}

                        </tr>
                    </thead>
                    <tbody>
                        {allBooksData}
                    </tbody>

                </Table>
                
            </Container>
        

            </div>
        )
    }
    else{
        return (
            <div>
                
            </div>
    
        )
    }
 
   
}
