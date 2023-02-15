import { useNavigate} from 'react-router-dom';
import React from 'react';
import "./admin.css";
import Logo from '../elements/Logo.jsx'

export const ButtonsMenu = ({setUser}) => {
    const navigate = useNavigate();
    const logOut = () => {
        navigate('/')
        setUser(null)
    }

    const employeeButton = () => {
        navigate('employees')
    }

    const productsButton = () => {
        navigate('products')
    }

        return (
            <section className='menuBtn'>
                <button id="emplBtn" onClick={employeeButton} >EMPLEADOS</button><br></br>
                <button id="prodBtn" onClick={productsButton}>PRODUCTOS</button>
                <Logo />
                <button id="exit" onClick={logOut}>SALIR</button>
            </section>
        )
    }