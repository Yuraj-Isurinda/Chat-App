import axios from 'axios'
import { useState } from 'react';
import { createContext } from "react";
import toast from 'react-hot-toast';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl 

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [authUser, setAuthUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)

    //check if user is authenticated. yes? set the user data & connect socket

    const checkAuth = async () =>{
        try {
            const {data} = await axios.get("/api/auth/check")
            if(data.success){
                setAuthUser(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useInsertionEffect(()=>{
        if(token){
            axios.defaults.headers.common["toaken"] = token;
        }
    },[])
    const value ={
        axios,
        authUser,
        onlineUsers,
        socket,

    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
} 
