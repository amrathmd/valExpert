import { useState, createContext } from 'react';
import React from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthContextProvider = (props: any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const getLoggedIn = async () => {
        const result = await axios.get(
            'http://localhost:3000/v1/auth/loggedIn'
        );
        setLoggedIn(result.data);
    };

    React.useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
