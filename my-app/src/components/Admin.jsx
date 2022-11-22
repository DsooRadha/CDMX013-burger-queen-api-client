import React from 'react';
import { Table } from './AdminTable';
import "./admin.css";
import Logo from './Logo.jsx'

const ButtonsMenu = () => {
    return (
        <section className='menuBtn'>
            <button id="emplBtn">EMPLEADOS</button><br></br>
            <button id="prodBtn">PRODUCTOS</button>
            <Logo color ='red' />
            <button id="exit">SALIR</button>

        </section>
    )
}

const InputEmployee = () => {
    return (
        <section className='tabEmpl'>
            <div className='employee'>
                <input placeholder='Nombre' className='inputAdm'></input>
                <input placeholder='Área' className='inputAdm'></input>
                <input placeholder='Correo' className='inputAdm'></input>
                <input placeholder='Contraseña' className='inputAdm'></input>
                <button id="addEmployee">AGREGAR</button>
            </div>
            <Table></Table>
        </section>
    )
}

const Admin = () => {
    return (
        <div className='backAdmin'>
            <ButtonsMenu />
            <InputEmployee />
        </div>
    )
}

export default Admin
