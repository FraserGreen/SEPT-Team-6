import React from 'react'
import "./Header.css"
import {Button} from 'react-bootstrap'
import {Container} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { SESSION_USER } from '../constants'
import { useSessionUser } from '../../Hooks/useSessionUser'
import { useHistory } from 'react-router-dom'


export const Header = () => {
    const {loggedIn, logoutSessionUser} = useSessionUser();
    const {userType} = useSessionUser();
    // const sessionUser = getSessionUser()
    // const sessionUser = JSON.parse(localStorage.getItem(SESSION_USER));
    const history = useHistory();

    const logout = (event) => {
        event.preventDefault();
        // localStorage.removeItem(SESSION_USER);
        // console.log(sessionUser);
        logoutSessionUser();
        history.push("/");

    }

    return (
        <div>
        {
            loggedIn
            ?
            (<div className='header-style'>
                <Container>
                    <div className='main-wrapper'>
                        <div className='padding'>
                                <Button variant="secondary" onClick={logout} >Logout</Button>{' '}    
                        </div>
                        {
                        userType.admin
                        ?
                        (
                            <div className = 'padding'>
                                <NavLink to = "/management">
                                    <Button variant="secondary">Management</Button>{' '}    
                                </NavLink>
                            </div>
                        )
                        :
                            <div></div>
                        }   
              
                    </div>
                </Container>
            </div>)
            :
            (
                <div className='header-style'>
                <Container>
                    <div className = 'main-wrapper'>
                        <div className = 'padding'>
                            <NavLink to = "/login">
                                <Button variant="secondary">Sign in</Button>{' '}    
                            </NavLink>
                        </div>
                        <div className = 'padding'>
                            <NavLink to = "/register">
                                <Button variant="secondary">Register</Button>{' '}
                            </NavLink>
                        </div>
                    </div>
                </Container>
                </div>
                
            )
        }
        </div>


    )
}
