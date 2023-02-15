import { Buttons } from "../waiterPage/Buttons";
import axios from "axios";
import './kitchen.css';
import { useEffect, useState } from "react";
import PendingItem from "./PendingItem";

export const Kitchen = ({ setUser }) => {

    const [ordersPending, setOrdersPending] = useState([]);
    const [buttonDone, setButtonDone] = useState(true);

    const getOrders = async () => {
        const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder?status=pending')
        const orders = result.data;
        setOrdersPending(orders.filter((orders => orders.status === 'pending')));
        setButtonDone(true);
    };

    const done = async () => {
        const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder?status=done')
        setOrdersPending(result.data);
        setButtonDone(false);
    };

    useEffect(() => {
        getOrders();
    }, []);


    const deleteOrder = async (item) => {
        await axios.delete(`https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder/${item.id}`, item)
        item.status === 'done' ? done() : getOrders();
    };

    const addKeyProducts = async (order) => {

        const date = new Date();
        const hour = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

        let delta = Math.abs(new Date(order.date) - date) / 1000;

        const days = Math.floor(delta / 86400);
        delta -= days * 86400;

        const hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;

        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;

        const seconds = Math.floor(delta) % 60;

        const orderDone = {
            ...order,
            done: hour,
            status: 'done',
            time: hours + 'hrs ' + minutes + 'min ' + seconds + 'seg'
        };
        await axios.put(`https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder/${order.id}`, orderDone)
        getOrders();
    };

    return (
        <section className="backKitchen">
            <Buttons message='PEDIDOS' setUser={setUser} />
            <div className="kitchen">
                <div className="kitchenButtons">
                    <button onClick={() => getOrders()} className='btnPending'>
                        <p>PENDIENTES</p>
                    </button>
                    <button onClick={() => done()} className='btnReady' >
                        <p>LISTOS</p>
                    </button>
                </div>
                <section className="orders">
                    {ordersPending.length > 0 && ordersPending.map((item) => <PendingItem 
                    item={item} deleteOrder={deleteOrder} buttonDone={buttonDone} addKeyProducts={addKeyProducts} />)}
                </section>
            </div>
        </section>
    )
};

