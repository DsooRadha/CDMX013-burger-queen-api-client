import { useNavigate } from 'react-router-dom';
import Logo from "../elements/Logo"

export const Buttons = ({message, setUser}) => {
    const navigate = useNavigate();

    const logOut = () => {
        navigate('/')
        setUser(null)
    };

    return (
        <div className='newOrder'>
            <button className='btnViolet'>{message}</button>
            <Logo />
            <button className='btnExit' onClick={logOut}>SALIR</button>
        </div>
    )
};