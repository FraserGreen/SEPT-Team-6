import React, { useState } from "react"
import { SESSION_USER, USER_TYPE } from "../components/constants"


const SessionUserContext = React.createContext(null)

export const SessionUserProvider = ({children}) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userType, setUserType] = useState(
        {
            normal:false,
            admin:false,
            business:false
        }
    );

    // const initialUser = () => {
    //     const user = localStorage.getItem(SESSION_USER)
    //     console.log("user: ", user)
    //     if(user.length > 0 && user !== undefined) {
    //         return JSON.parse(user)
    //     }
    //     return ""
    // }

    // const getUserFromLocalStorage = () => {
    //     const user = localStorage.getItem(SESSION_USER)
        
    //     if(user) {
    //         return JSON.parse(user)
    //     }
    //     return ""
    // }

    // const [sessionUser, setSessionUser] = useState(getUserFromLocalStorage())

    const [sessionUser, setSessionUser] = useState()
    

    const loginSessionUser = (user) => {
        localStorage.setItem(SESSION_USER, user);
        localStorage.setItem(USER_TYPE, user.userType);
        if (user.userType === "admin")
        {
            setUserType({
                normal:false,
                admin:true,
                business:false
            });
        }
        else if (user.userType === "user")
        {
            setUserType({
                normal:true,
                admin:false,
                business:false
            });     
        }

        else if (user.userType === "business")
        {
            setUserType({
                normal:false,
                admin:false,
                business:true
            });     
        }

        setSessionUser(user);
        setLoggedIn(true)
    }

    const logoutSessionUser = () => {
        localStorage.setItem(SESSION_USER, "");
        localStorage.setItem(USER_TYPE, "");
        setSessionUser(null)
        // setUserType(null);

        setLoggedIn(false)
    }

    return <SessionUserContext.Provider value={{
        sessionUser,
        loggedIn,
        userType,
        loginSessionUser,
        logoutSessionUser, 
        }}>
        {children}
    </SessionUserContext.Provider>
}

export default SessionUserContext