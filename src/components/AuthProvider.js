import React, { createContext, useReducer } from 'react';

export const AuthContext = createContext();

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return { isAuth: action.payload };
        default:
            throw new Error();
    }
};

const AuthProvider = ({ children }) => {
    const isAuthenticated = localStorage.getItem('accessToken') ? true : false;
    const [state, dispatch] = useReducer(AuthReducer, {
        isAuth: isAuthenticated,
    });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
