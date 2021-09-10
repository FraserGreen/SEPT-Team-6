import React from 'react'
import { Button, Table, Container} from 'react-bootstrap'

export const Management = () => {
    return (
        <div>
            <Container>
                    
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Book ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                        <td>The Hungry Caterpillar</td>
                        <td>Eric Carle</td>
                        <td>Accepted</td>

                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Harry Potter</td>
                        <td>J.K Rowling</td>
                        <td>Accepted</td>
                        
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Hunter x Hunter</td>
                        <td>Yoshihiro Togashi</td>
                        <td>Accepted</td>

                        </tr>
                    </tbody>
                    </Table>
                </Container>
        </div>
    )
}
