import React, { createContext, useReducer } from 'react';

const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTH':
            return { isAuth: action.payload };
        default:
            throw new Error();
    }
};

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, { isAuth: true });

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
