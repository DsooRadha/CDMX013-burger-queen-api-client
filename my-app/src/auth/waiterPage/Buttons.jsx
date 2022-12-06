import { useNavigate } from 'react-router-dom';
import Logo from "../elements/Logo"

export const Buttons = () => {
    const navigate = useNavigate();

    const logOut = () => {
        navigate('/')
    }

    return (
        <div className='newOrder'>
            <button className='btnViolet'>NUEVA ORDEN</button>
            <Logo />
            <button className='btnExit' onClick={logOut}>SALIR</button>
        </div>
    )
}