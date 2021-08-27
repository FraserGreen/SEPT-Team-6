import React from 'react'
import "./Header.css"
import {Button} from 'react-bootstrap'

export const Header = () => {
    return (
        <div className='header-style'>
            <Button variant="secondary">Sign in</Button>{' '}
            <Button variant="secondary">Register</Button>{' '}

        </div>
    )
}
