import React from 'react'
import { Form, Button, Container, Alert} from 'react-bootstrap'
import { useForm } from '../../Hooks/useForm'
import { useState } from 'react'

const axios = require('axios');


export const Register = () => {
    const {fields, setFields, handleInputChange} = useForm({});
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState({
        success:false,  
        failure:false,
        message:""
    });

    const submit =  async (event) => {
        event.preventDefault()
        if (fields.password !== fields.confirmPassword)
        {
            setShow(true);

            setMessage({
                success: false,
                failure: true,
                message: "Passwords do not match!"
            })

            return;
        }

        if ((fields.password.length < 6) || (fields.confirmPassword.length < 6))
        {
            setShow(true);

            setMessage({
                success: false,
                failure: true,
                message: "Passwords is not long enough!"
            })

            return;
        }

        const data = {
            fullName: String(fields.fullName),
            username: String(fields.username),
            password: String(fields.password),
            confirmPassword: String(fields.confirmPassword)
        }

        try {
            const config = {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                withCredential: true
            }

            // Post URL form here
            const response = await axios.post('http://localhost:8080/api/users/register', data, config);
            if(response.status === 201){
                setFields( {
                    fullName: "",
                    username: "",
                    password: "",
                    confirmPassword: ""
                })

                setShow(true);

                setMessage({
                    success: true,
                    failure: false,
                    message: "Account creation success"
                });
            }

        }
        catch (error) {
            console.log(error)
            setShow(true);
            setMessage({
                success: false,
                failure: true,
                message: "Account creation failure"
            });
        }



    }
        


    return (
        <div>
            
            <Container>
                {
                    show === true && message.failure
                    ?
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{message.message}</Alert.Heading>
                    <p>
                    Fields are incorrect
                    </p>
                    </Alert>
                    :
                <></>
                }

                {
                    show === true && message.success
                    ?
                    <Alert variant="success" onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{message.message}</Alert.Heading>
                    <p>
                    Account successfully created!
                    </p>
                    </Alert>
                    :
                <></>
                }

                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="John Doe" name = 'fullName' value = {fields.fullName} onChange= {handleInputChange}/>

                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="john.doe@gmail.com" name = 'username' value = {fields.username} onChange={handleInputChange}/>

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='password' value={fields.password} onChange={handleInputChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name='confirmPassword' value={fields.confirmPassword} onChange={handleInputChange}/>
                    </Form.Group>
          
          
                    <br></br>
                    
                    <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                    </Button>
                </Form>
            </Container>
            
        </div>
    )
}
