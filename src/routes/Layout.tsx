import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux/useRedux';

const Layout = () => {
    const token = useAppSelector((state) => state.auth.token)
    return (
        <>
           <Outlet /> 
        </>
    );
};

export default Layout;