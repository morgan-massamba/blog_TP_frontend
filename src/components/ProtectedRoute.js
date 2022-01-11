import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const ProtectedRoute = () => {
    const { state } = useContext(AuthContext);

    return state.isAuth === true ? (
        <Outlet />
    ) : (
        <Navigate to="/" replace={true} />
    );
};

export default ProtectedRoute;
