import React from 'react';
import "./admin.css";
import {AdminTable} from './AdminTable';
import { ButtonsMenu } from './ButtonsMenu';
import { ProductsTable } from './ProductsTable';
import { Outlet } from 'react-router';

export const AdminEmployees = () => {
    return (
        <div className='backAdmin'>
            <section><AdminTable/></section>
        </div>
    )
};

export const AdminInicio = ({setUser}) => {
    return (
        <div className='backAdmin'>
            <ButtonsMenu setUser={setUser}/>
            <Outlet/>
        </div>
    )
};

export const AdminProducts = () => {
    return (
        <div className='backAdmin'>
            <section><ProductsTable /></section>
        </div>
    )
};
