import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        // Read the token from the session storage
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken?.token;
    };
    
    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        // Token will be stored in session storage, to be able to get it if the user refreshes the page
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    const clearToken = () => {
        // When user loggs out, the token should be cleared
        sessionStorage.removeItem('token');
        setToken(undefined);
    }

    return {
        setToken: saveToken,
        token,
        clearToken
    }
}