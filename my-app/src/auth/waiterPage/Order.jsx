import { Counter } from "./Counter";
import axios from "axios"

 export const Order=({producto, precio, cantidad})=>{
return(
    <div>
          <p>{cantidad}</p>
        <p>{producto}</p>
        <Counter  /> 
        <p>{precio}</p>
    </div>
)
}

export const getProductsData = async (setAlgo) => {
    const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/Products')
    const productData = result.data
    setAlgo(productData);
};