import { useEffect, useState } from "react";
import axios from "axios";
import './waiter.css'

export const MenuBQ = ({ currentMenu, addProductOrder }) => {
    const [productsBreakfast, setProductsBreakfast] = useState([]);
    const [productsMainMenu, setProductsMainMenu] = useState([]);

    const getBreakfastMenu = async () => {
        const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/Products?menu=desayuno')
        const productDataBreakfast = result.data
        setProductsBreakfast(productDataBreakfast);
    };

    const getMainMenu = async () => {
        const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/Products?menu=24hrs')
        const productDataMainMenu = result.data
        setProductsMainMenu(productDataMainMenu);
    };

    useEffect(() => {
        getBreakfastMenu()
        getMainMenu()
    }, []);
    
    return (
        <div className="container-menu">
          {currentMenu === "Desayuno"
            && productsBreakfast.map((item) =>
            <button className="container-item" onClick={() => addProductOrder(item)} key={item.id}>
                <p className="productName">{item.product}</p>
                <p>${item.price}</p>
            </button>
        )}
          {currentMenu === "24hrs"
            && productsMainMenu.map((item) =>
            <button className="container-item" onClick={() => addProductOrder(item)} key={item.id}>
                <p className="productName">{item.product}</p>
                <p>${item.price}</p>
            </button>
        )}
        </div>
      );
    };
