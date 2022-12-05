import React from 'react';
import "./login.css";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Logo from "../auth/elements/Logo"
import MessageError from "./MessageError"


const Welcome = () => {    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorInput, setError] = useState(false);
    const [message, setMessage] = useState(false);

    const navigate = useNavigate();

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
  
    const handleApi = (e) => {
        e.preventDefault()
      
        if (email === '' || password === '') {
            setMessage(false)
            setError(true)
        } else {

            axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/users').then(result => {
                const data = result.data;
                data.forEach(element => {

                    if (element.password === password && element.email === email) {

                        if (element.area === 'Administrador') {
                            navigate('admin')
                        }
                        if (element.area === 'Cocina') {
                            console.log('Cocina');
                        }
                        if (element.area === 'Meserx') {
                            navigate('waiter')
                        }
                    } else {
                        setMessage(true)
                        setError(true)
                    }
                });
            })
    }
    }
    return <div data-testid='welcome' className='welcome'>
        <section>
            <h1>Bienvenidx</h1>
            {errorInput &&
                <MessageError 
                message={message ? 'Credenciales Invalidas' : 'Rellena los campos'} 
                />
            }
            <p>Correo Electrónico</p>
            <input
                value={email}
                onChange={handleEmail}
                type={'email'} />
            <p>Contraseña</p>
            <input
                value={password}
                onChange={handlePassword}
                type={'password'} />
            <br />
            <button onClick={handleApi} className='buttonLogin'>Iniciar Sesión</button>
            <br />

        </section>
        <Logo />
    </div>
};

export default Welcome