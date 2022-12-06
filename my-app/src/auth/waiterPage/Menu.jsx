import React, { useEffect, useState } from "react";
import axios from "axios";

export const Menu = ({ addProductOrder }) => {
    const [mainMenu, setMainMenu] = useState([]);

    const getBreakfast = async () => {
        const result = await axios.get('https://637265f4025414c6370eb684.mockapi.io/api/bq/Products?menu=24hrs.')
        setMainMenu(result.data);
    };

    useEffect(() => {
        getBreakfast();
    }, []);

    return (
        <div>
            {mainMenu.map((item) =>
                <button className="container-item" onClick={() => addProductOrder(item)} key={item.id}>
                    <p className="productName">{item.product}</p>
                    <p>${item.price}</p>
                </button>
            )}
        </div>
    )
};