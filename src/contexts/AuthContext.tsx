import { useState, createContext } from 'react';
import React from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthContextProvider = (props: any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userType, setUserType] = useState(null);

    const getLoggedIn = async () => {
        const result = await axios.get(
            'http://localhost:3000/v1/auth/loggedIn'
        );
        setLoggedIn(result.data);
        console.log(result);
    };
    const findUserType = async () => {
        const result = await axios.get(
            'http://localhost:3000/v1/auth/userType'
        );
        setUserType(result.data);
    };

    React.useEffect(() => {
        getLoggedIn();
    }, []);
    React.useEffect(() => {
        findUserType();
        console.log(userType);
    }, [loggedIn]);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn, userType }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
