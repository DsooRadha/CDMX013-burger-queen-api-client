import Logo from "../elements/Logo"
import './waiter.css'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Ticket } from "./Ticket";
import Modal from '../elements/Modal.jsx'


export const Waiter = () => {
    const [products, setProducts] = useState([]);
    const [currentMenu, setCurrentMenu] = useState([]);
    const [productsOrder, setProductsOrder] = useState([])
    const [showContent, setShowContent] = useState(false)
    const [client, setClient] = useState("");
    const [modal, setModal] = useState(false);


    const getProductsData = async () => {
        const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/Products')
        const productData = result.data
        setProducts(productData);
    };

    const breakfastMenu = () => {
        const breakfastRender = products.filter((products => products.menu === 'Desayuno'));
        setCurrentMenu(breakfastRender)
    }

    const mainMenu = () => {
        const mainMenuRender = products.filter((products => products.menu === '24hrs.'));
        setCurrentMenu(mainMenuRender)
    }


    useEffect(() => {
        getProductsData()
    }, []);

    const navigate = useNavigate();
    const logOut = () => {
        navigate('/')
    }

    const addProductOrder = (product) => {
        if (!productsOrder.find((item) => item.product.id === product.id)) {
            setProductsOrder((state) => {
                return [...state, { product, qty: 1 }]
            })
            setShowContent(true)
        } else {
            setProductsOrder((state) => {

                const newCurrentProduct = state.map((item) => {
                  
                    if (item.product.id === product.id) {
                        const nuevoProducto = item
                        nuevoProducto.qty = item.qty + 0.5
                        return nuevoProducto
                    } 
                        return item
                });
                
                return newCurrentProduct
            })
        }
    }

    const deleteProductOrder = (product) => {
        // const currentProduct = productsOrder.find((item) => item.product.id === product.id)

        setProductsOrder((state) => {

            const newCurrentProduct = state.map((item) => {
                console.log(product.id, '::HOLA:::')
                if (item.product.id === product.id) {
                    console.log(item.product.id, ':::::ACA::::::');
                    const nuevoProducto = item
                    nuevoProducto.qty = item.qty - 0.5
                    return nuevoProducto
                } 
                    return item
            });

            return newCurrentProduct
            // return [...state.filter((item) => item.product.id !== product.id), { product, qty: currentProduct.qty - 1 }]
        })
    }

    const deleteProduct = (product) => {
        const filterProducts = productsOrder.filter((item) => item.product.id !== product.id)
        setProductsOrder(filterProducts)
    }

    const totalPrice = () => {
        return productsOrder.reduce((prev, item) => prev + item.qty * item.product.price, 0);
    }

    const handleApi = () => {
        const hoy = new Date();
        console.log(hoy,'-------O_o------')
       const hour = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        const clientOrder = {
            name: client,
            items: productsOrder,
            total: totalPrice(),
            hour: hoy,
        }
        console.log(clientOrder)
        axios.post('https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder', clientOrder)
        clearOrder()
        setClient('')
        setModal(false);
    }


    const clearOrder = () => {
        setProductsOrder([]);
    }

    const closeModal = () => {
        setModal(false);
    }

    const showModal = (user) => {
        setModal(true);

    };

    console.log(productsOrder, '::::::::::.');
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
                    {currentMenu.map((item) =>
                        <button className="container-item" onClick={() => addProductOrder(item)} key={item.id}>
                            <p className="productName">{item.product}</p>
                            <p>${item.price}</p>
                        </button>
                    )}
                </div>
            </div>
            <div className='client'>
                <section className='idOrder'>
                    <input type="text" placeholder="Customer name" value={client} onChange={(e) => setClient(e.target.value)} />
                </section>
                <div className='orderProducts'>
                    {productsOrder.length > 0 && productsOrder.map((item) => <Ticket addProductOrder={addProductOrder}
                        deleteProductOrder={deleteProductOrder} item={item} key={item.product.id}
                        deleteItem={() => deleteProduct(item.product)} />)}
                </div>
                <div className='total'> TOTAL ${totalPrice()}.00</div>
                <section className="btnOrder">
                    <button className='btnRed' onClick={clearOrder}>CANCELAR</button>
                    <button className='btnGreen' onClick={showModal}>ENVIAR</button>
                    {modal && <Modal
                        modalFunction={handleApi}
                        closeFunction={closeModal}
                        message='¿Deseas enviar esta orden?'
                    />
                    }
                </section>
            </div>
        </section>
    )
}