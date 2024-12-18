import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Sidebar from '../components/sidebar/Sidebar';

const Layout = () => {

    return (
        <>
           <Header />
           <Sidebar />
           <Outlet /> 
        </>
    );
};

export default Layout;