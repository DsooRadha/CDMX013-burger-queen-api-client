import { useState } from 'react';
import axios from "axios";
import './waiter.css'
import { Ticket } from "./Ticket";
import Modal from '../elements/Modal.jsx'
import { Breakfast } from "./Breakfast";
import { Menu } from "./Menu";
import { Buttons } from "./Buttons";

export const Waiter = () => {
    const [productsOrder, setProductsOrder] = useState([])
    const [client, setClient] = useState("");
    const [modal, setModal] = useState(false);
    const [menu, setMenu] = useState(true);
    const [menu24, setMenu24] = useState(false);
    const [allMenu, setAllMenu] = useState(false)

    const breakfastMenu = () => {
        // setMenu(true)
        // setMenu24(false)

        setAllMenu(false)
        console.log('cambio a falso');
    }

    const mainMenu = () => {
        // setMenu(false)
        // setMenu24(true)
        setAllMenu(true)
        console.log('cambio a true');
    }

    const addProductOrder = (product) => {
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

    const deleteProductOrder = (product) => {
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
            items: productsOrder,
            total: totalPrice()
        }
        axios.post('https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder', clientOrder)
        clearOrder()
        setClient('')
        setModal(false);
    };


    const clearOrder = () => {
        setProductsOrder([]);
    };

    const closeModal = () => {
        setModal(false);
    };

    const showModal = () => {
        setModal(true);
    };


    return (
        <section className='waiterView'>
            <Buttons />
            <div className='menu'>
                <section>
                    <button className='btnGray' onClick={breakfastMenu}>DESAYUNO</button>
                    <button className='btnViolet' onClick={mainMenu}>24 HORAS</button>
                </section>
                {/* {menu &&<Breakfast className="container-menu" addProductOrder={addProductOrder} /> }
                {menu24 && <Menu  className="container-menu" addProductOrder={addProductOrder} /> } */}

                <Menu className="container-menu" addProductOrder={addProductOrder} url={allMenu ? 'https://637265f4025414c6370eb684.mockapi.io/api/bq/Products?menu=24hrs.'
                    : 'https://637265f4025414c6370eb684.mockapi.io/api/bq/Products?menu=Desayuno'} />

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