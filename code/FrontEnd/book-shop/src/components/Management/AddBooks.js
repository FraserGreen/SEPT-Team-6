import React from 'react'
import { Form, Container, Button } from 'react-bootstrap'

export const AddBooks = () => {

    // const submit = async (event) {
    //     const config = {
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json',
    //             'Access-Control-Allow-Origin': '*',
    //         },
    //         withCredential: true
    //     }
    //     const response = await axios.post
    // }
    return (
        <div>
            <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="The Hungry Caterpillar" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control placeholder="1234567890" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control placeholder="Hugh Janus" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Genre</Form.Label>
                    <Form.Control placeholder="Comedy" />
                </Form.Group>
            </Form>
            <Button onClick='submit'>
                Submit
            </Button>
            </Container>
        </div>
    )
}
