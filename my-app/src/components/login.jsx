import React from 'react';
import ReactDOM from 'react-dom/client';
import "./login.css";
import { useState, useNavigate } from "react";
import axios from "axios";

const Welcome = () => {
    const [email, setEmail] = useState('');
    const [miLogin, setLogin] = useState('false')
    const [password, setPassword] = useState('');
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleApi = (e) => {
        if (email === 'yeri@admin.com' || password === '123') {
            console.log(setLogin('true'));
        } else {
            setLogin('false');

        }
        console.log({ email, password });
        axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/users').then(result => {
            console.log(result.data);
        })

    }
    return <div className='welcome'>
        <h1>Bienvenidx</h1>
        <p>Correo Electrónico</p>
        <input value={email} onChange={handleEmail} type={'email'} />
        <p className='messageError'></p>
        <p>Contraseña</p>
        <input value={password} onChange={handlePassword} type={'password'} /> <br />
        <p className='messageError'></p>
        <button onClick={handleApi} className='buttonLogin'>Iniciar Sesión</button>
        {miLogin === 'true' && <Admin />}
    </div>
};

const Admin = () => {
    return <div className='logo'>
        <h1>Hola Mundo</h1>
    </div>
};

const Logo = () => {
    return <div className='logo'>
        <img src="https://user-images.githubusercontent.com/101679628/201446330-4a95197e-4311-4ec2-88d2-401155646188.png" alt="BurgerQueenLogo" />
    </div>
};

export const login = ReactDOM.createRoot(document.getElementById('root'));
login.render(<div className='login'>
    <Welcome></Welcome>
    <Logo></Logo>
</div>);