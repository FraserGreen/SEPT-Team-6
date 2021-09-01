import React from 'react'
import { ListGroup } from 'react-bootstrap'
export const HomepageList = () => {
    return (
        <div>
            <ListGroup>
                <ListGroup.Item variant='secondary'>Top 5 Sellers</ListGroup.Item>
                <ListGroup.Item>Chainsaw Man</ListGroup.Item>
                <ListGroup.Item>Demon Slayer</ListGroup.Item>
                <ListGroup.Item>Berserk</ListGroup.Item>
                <ListGroup.Item>Vagabond</ListGroup.Item>
            </ListGroup>
        </div>
    )
}
