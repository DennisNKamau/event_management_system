import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const register = (name, email, password) => {
        fetch("/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: name,
                    email: email,
                    password: password
                    })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUser(data)
            })
    }

    const login = () => {
        setUser({name: 'John Doe', email: 'johndoe@gmail.com'})
    }

    function logout(){
        setUser(null)
    }

    const contextData = {
        user,
        register,
        login,
        logout
    }
    return (
        <UserContext.Provider value={contextData}>
            {children}
        </UserContext.Provider>
    )
}