import { useState } from 'react'
import { Info } from './Info'
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import InfoIcon from '@mui/icons-material/Info';

export default function PendingItem({ item, deleteOrder, buttonDone, addKeyProducts }) {

    const [infoOrder, setInfoOrder] = useState(false)

    const info = () => setInfoOrder(!infoOrder)

    return (
        <div style={{ border: item.status === 'pending' ? "0.5vh solid #EAAC40" : "0.5vh solid #087711" }}  className='kitchenTicket' key={item.id}> 
            <section style={{ background: item.status === 'pending' ? "#EAAC40" : "#087711" }}className="headerOrder">
                <button key={item.id} onClick={() => deleteOrder(item)}> <CloseIcon /></button>
                <p> {item.name}</p>
               {item.status==='pending'?<p>Llego:{item.hour}</p>:null} 
            </section>
            <div>
                {item.items.map((element) =>
                    <div className="OrderItem" key={element.id}>
                        <p> {element.qty} </p>
                        <p> {element.product.product}</p>
                    </div>
                )}
            </div>
            {buttonDone ? <button className='done' key={item.id} onClick={() => addKeyProducts(item)}><CheckIcon className='checkIcon' /></button> :
                <InfoIcon className='infoBtnKitchen' onClick={() => info(item)}></InfoIcon>}
            {infoOrder ? <Info item={item} time={item.time} llego={item.hour} finalizo={item.done} /> : null}
        </div>
        )
}