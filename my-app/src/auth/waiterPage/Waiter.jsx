import { useState } from 'react';
import './waiter.css'
import axios from "axios";
import { Ticket } from "./Ticket";
import { Modal } from '../elements/Modal.jsx'
import { MenuBQ } from "./MenuBQ";
import { Buttons } from "./Buttons";
import { MessageError } from '../../noauth/MessageError';

export const Waiter = ({ setUser }) => {
    const [productsOrder, setProductsOrder] = useState([])
    const [currentMenu, setCurrentMenu] = useState('Desayuno');
    const [client, setClient] = useState("");
    const [modal, setModal] = useState(false);
    const[showMessageError, setShowMessageError]=useState(false)

    const breakfastMenu = () => {
        setCurrentMenu('Desayuno')
    }

    const mainMenu = () => {
        setCurrentMenu('24hrs')
    }

    const addProductOrder = (product) => {
        setShowMessageError(false)
        if (!productsOrder.find((item) => item.product.id === product.id)) {
            setProductsOrder((state) => {
                return [...state, { product, qty: 1 }]
            })
        } else {
            const currentProduct = productsOrder.find((item) => item.product.id === product.id)
            setProductsOrder((state) => {

                const newCurrentProduct = state.map((item) => {
                    if (item.product.id === product.id) {
                        return { product, qty: currentProduct.qty + 1 }
                    } else {
                        return item
                    }
                });
                return newCurrentProduct
            })
        }
    }

    const decreaseProductOrder = (product) => {
        const currentProduct = productsOrder.find((item) => item.product.id === product.id)
        setProductsOrder((state) => {
            const newCurrentProduct = state.map((item) => {
                if (item.product.id === product.id) {
                    return { product, qty: currentProduct.qty - 1 }
                }
                return item
            });
            return newCurrentProduct
        })
    };

    const deleteProduct = (product) => {
        const filterProducts = productsOrder.filter((item) => item.product.id !== product.id)
        setProductsOrder(filterProducts)
    };

    const totalPrice = () => {
        return productsOrder.reduce((prev, item) => prev + item.qty * item.product.price, 0);
    };

    const handleApi = () => {
        const date = new Date();
        const hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        const clientOrder = {
            name: client,
            hour: hour,
            date: date,
            items: productsOrder,
            total: totalPrice(),
            status: 'pending'
        };

        axios.post('https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder', clientOrder)
        clearOrder()
        setModal(false);
    };

    const clearOrder = () => {
        setProductsOrder([]);
        setClient('')
        setShowMessageError(false)
    };

    const closeModal = () => {
        setModal(false);
    };

    const showModal = () => {
        client === '' || productsOrder.length < 1 ?setShowMessageError(true) : setModal(true);
    };

    return (
        <section className='waiterView'>
            <Buttons message='NUEVA ORDEN' setUser={setUser} />
            <div className='menu'>
                <section>
                    <button className='btnGray' onClick={breakfastMenu}>DESAYUNO</button>
                    <button className='btnViolet' onClick={mainMenu}>24 HORAS</button>
                </section>
                <MenuBQ currentMenu={currentMenu} addProductOrder={addProductOrder}></MenuBQ>
            </div>
            <div className='client'>
                <section className='idOrder'>
                    <input type="text" placeholder="Customer name" value={client} onChange={(e) => setClient(e.target.value)} />
                </section>
                <div className='orderProducts'>
                    {showMessageError && <MessageError message='Llena los campos requeridos (Cliente y productos)'/>}
                    {productsOrder.length > 0 && productsOrder.map((item) => <Ticket addProductOrder={addProductOrder}
                        deleteProductOrder={decreaseProductOrder} item={item} key={item.product.id}
                        deleteItem={() => deleteProduct(item.product)} />)}
                </div>
                <div className='total'> TOTAL ${totalPrice()}.00</div>
                <section className="btnOrder">
                    <button className='btnRed' onClick={clearOrder}>CANCELAR</button>
                    <button className='btnGreen' onClick={showModal}>ENVIAR</button>
                    {modal && <Modal modalFunction={handleApi} closeFunction={closeModal} message='¿Deseas enviar esta orden?' />}
                </section>
            </div>
        </section>
    )
};