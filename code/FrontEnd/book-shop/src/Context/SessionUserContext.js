import React, { useState } from "react"
import { SESSION_USER } from "../components/constants"


const SessionUserContext = React.createContext(null)

export const SessionUserProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false)

    // const initialUser = () => {
    //     const user = localStorage.getItem(SESSION_USER)
    //     console.log("user: ", user)
    //     if(user.length > 0 && user !== undefined) {
    //         return JSON.parse(user)
    //     }
    //     return ""
    // }

    const [sessionUser, setSessionUser] = useState()

    const loginSessionUser = (user) => {
        localStorage.setItem(SESSION_USER, user);
        setSessionUser(user)
        setLoggedIn(true)
    }

    const logoutSessionUser = () => {
        localStorage.setItem(SESSION_USER, "");
        setSessionUser(null)
        setLoggedIn(false)
    }

    return <SessionUserContext.Provider value={{
        sessionUser,
        loggedIn,
        loginSessionUser,
        logoutSessionUser, 
        }}>
        {children}
    </SessionUserContext.Provider>
}

export default SessionUserContext