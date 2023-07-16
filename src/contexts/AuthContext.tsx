import { useState, createContext } from 'react';
import React from 'react';
import axios from 'axios';
import { react_frontend_url } from '../config';

const AuthContext = createContext(null);

export const AuthContextProvider = (props: any) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userType, setUserType] = useState(null);
    const [userName, setUserName] = useState(null);
    const getLoggedIn = async () => {
        const result = await axios.get(
            `${react_frontend_url}/v1/auth/loggedIn`
        );
        setLoggedIn(result.data);
        await findUserType();
    };

    const findUserType = async () => {
        const result = await axios.get(
            `${react_frontend_url}/v1/auth/userType`
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
