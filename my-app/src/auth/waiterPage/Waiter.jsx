import Logo from "../elements/Logo"
import EditIcon from '@mui/icons-material/Edit';
import './waiter.css'
import { useEffect } from 'react';
import { useState } from 'react';
<<<<<<< HEAD
// import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Order, getProductsData } from "./Order"
=======
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Counter } from "./Counter";
>>>>>>> 21a5088188263e75bf710998c50e0e5945058a57

export const Waiter = () => {
    const [products, setProducts] = useState([])
    const [currentMenu, setCurrentMenu] = useState([])
    const [prueba, setPrueba] = useState({
        product: '',
        price: '',
    })

    const breakfastMenu = () => {
        const breakfastRender = products.filter((products => products.menu === 'Desayuno'));
        setCurrentMenu(breakfastRender)
    }

    const mainMenu = () => {
        const mainMenuRender = products.filter((products => products.menu === '24 hrs.'));
        setCurrentMenu(mainMenuRender)
    }


    useEffect(() => {
        getProductsData(setProducts)
    }, []);

    const navigate = useNavigate();
    const logOut = () => {
        navigate('/')
    }

<<<<<<< HEAD
    const showOrder = (prueba) => {
        console.log(prueba)
        setPrueba({
            product: prueba.product,
            precie: prueba.price
        })
    }
console.log(prueba)
=======
    const addProductOrder = (productOrder) => {
        // console.log(productOrder.price)
        setProductOrder({...productOrder,
            product:[productOrder.product],
            // price: {productOrder.price}
        })
        setShowContent(true)
    }
    console.log(productOrder);

    // const addProudctOrder = (item) =>{
    //     return {product:item.product, price:item.price}
    // }
>>>>>>> 21a5088188263e75bf710998c50e0e5945058a57

    return (
        <section className='waiterView'>
            <div className='newOrder'>
                <button className='btnViolet'>NUEVA ORDEN</button>
                <Logo />
                <button className='btnExit' onClick={logOut}>SALIR</button>
            </div>
            <div className='menu'>
                <section>
                    <button className='btnGray' onClick={breakfastMenu}>DESAYUNO</button>
                    <button className='btnViolet' onClick={mainMenu}>24 HORAS</button>
                </section>
                <div className="container-menu">
<<<<<<< HEAD
                    <section>
                        {currentMenu.map((item) =>
                            <button className="container-item" key={item.id} 
                            onClick={()=>showOrder(item)}
                            >
                                <p className="productName">{item.product}</p>
                                <p>${item.price}</p>

                            </button>
                        )}

                    </section>
=======
                    {currentMenu.map((item) =>
                        <button className="container-item"
                            onClick={() => addProductOrder({product:item.product, price:item.price})} key={item.id}>
                            <p className="productName">{item.product}</p>
                            <p>${item.price}</p>
                        </button>
                    )}
>>>>>>> 21a5088188263e75bf710998c50e0e5945058a57
                </div>
            </div>
            <div className='client'>
                <section className='idOrder'>
                    <input type="text" />
                    <EditIcon />
                </section>
                <div className='orderProducts'>COMANDA
<<<<<<< HEAD
                    <Order producto={prueba.product} precio={prueba.price} />
=======
                    {showContent && <Counter productName={productOrder.product} productPrice={productOrder.price}/>}
>>>>>>> 21a5088188263e75bf710998c50e0e5945058a57
                </div>
                <div className='total'> TOTAL</div>
                <section className="btnOrder">
                    <button className='btnRed'>CANCELAR</button>
                    <button className='btnGreen'>ENVIAR</button>
                </section>
            </div>
        </section>
    )
}