import { useState } from "react"

export const Counter = () =>{
    let [value, setValue]=useState(1)
// console.log(value)
    const addProduct = () => {
        setValue(value+1)
    }

    const removeProduct = () => {
        setValue(value-1) 
    }

    return(
        <div className="orderButton">
        <button onClick={addProduct}  >+</button>
        <p>{value<1?value=1:value}</p>
        <button  onClick={removeProduct} >-</button>
    </div>
    )
}