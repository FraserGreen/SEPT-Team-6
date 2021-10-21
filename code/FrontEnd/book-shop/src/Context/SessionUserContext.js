import React, { useState } from "react"
import { SESSION_USER } from "../components/constants"
import { useEffect } from "react"


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

    const [sessionUser, setSessionUser] = useState({username:""})
    const checkType = (user) => {
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
    }

    // Stores login data in local storage
    const getLocalStorageSessionUser = () => {
        const user = localStorage.getItem(SESSION_USER)
        if (user)
        {
            return JSON.parse(user)
        }
    }

    useEffect(() => {
        const user = getLocalStorageSessionUser()
        if (user)
        {
            setSessionUser(user)
            checkType(user);
            setLoggedIn(true)
        }
    }, [sessionUser.username])
    

    const loginSessionUser = (user) => {
        localStorage.setItem(SESSION_USER, JSON.stringify(user));
        // localStorage.setItem(USER_TYPE, user.userType);
            
        setSessionUser(user);
        setLoggedIn(true)
        checkType(user);


    }

    const logoutSessionUser = () => {
        localStorage.setItem(SESSION_USER, "");
        setSessionUser({username:""})
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