import { useState, createContext } from 'react';
import React from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthContextProvider = (props: any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState(null);
    const getLoggedIn = async () => {
        const result = await axios.get(
            'http://localhost:3000/v1/auth/loggedIn',
            { withCredentials: true }
        );
        setLoggedIn(result.data);
        await findUserType();
    };

    const findUserType = async () => {
        const result = await axios.get(
            'http://localhost:3000/v1/auth/userType',
            { withCredentials: true }
        );
        setUserType(result.data.userType);
        setUserName(result.data.username);
    };
    const refresh = async () => {
        await getLoggedIn();
        await findUserType();
    };

    React.useEffect(() => {
        getLoggedIn();
    }, []);
    React.useEffect(() => {
        findUserType();
    }, []);

    return (
        <AuthContext.Provider
            value={{ loggedIn, getLoggedIn, userType, userName, refresh }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
