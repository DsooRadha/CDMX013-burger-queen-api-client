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
    };

    useEffect(() => {
        getOrders()
    }, []);

    // console.log(':::::::::::::::', orderKitchen[0].items[0].product.product)
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
                                <CloseIcon key={item.id} />
                                <p> {item.name}</p>
                                <p>{item.hour}</p>
                            </section>
                            <div>
                                {item.items.map((element) =>
                                    <div className="OrderItem" key={element.id}>
                                       <p> {element.qty} </p>
                                       <p> {element.product.product}</p>
                                    </div>
                                )}
                            </div>
                            <CheckIcon key={item.id} />
                        </div>
                    )}

                </section>
            </div>
        </section>
    )

}