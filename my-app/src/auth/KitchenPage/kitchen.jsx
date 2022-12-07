import { Buttons } from "../waiterPage/Buttons"
import axios from "axios"
import './kitchen.css'
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

export const Kitchen = () => {

    const [orderKitchen, setOrderKitchen] = useState([])

    const getOrders = async () => {
        const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/clientorder')
        setOrderKitchen(result.data);
        console.log(result.data)
        
    };

    useEffect(() => {
        getOrders()
    }, []);

    console.log(':::::::::::::::', orderKitchen.sort((a, b) =>  b.id - a.id))
    return (
        <section className="backKitchen">
            <Buttons message='PEDIDOS' />
            <div className="kitchen">
                <div className="kitchenButtons">
                    <button className='btnPending'>PENDIENTES</button>
                    <button className='btnReady' >LISTOS</button>
                </div>
                <section className="orders">
                    {orderKitchen.length > 0 && orderKitchen.map((item) =>
                        <div className='kitchenTicket' key={item.id} >
                            <section className="headerOrder">
                            <button className="delete"><CloseIcon key={item.id} /></button>
                                <p> {item.name}</p>
                                <p>{item.hour}</p>
                            </section>
                            <div className="command">
                                {item.items.map((element) =>
                                    <div className="OrderItem" key={element.id}>
                                       <p> {element.qty} </p>
                                       <p> {element.product.product}</p>
                                    </div>
                                )}
                           <button className="footerOrders"> <CheckIcon key={item.id} /></button>
                           </div>
                        </div>
                    )}

                </section>
            </div>
        </section>
    )

}