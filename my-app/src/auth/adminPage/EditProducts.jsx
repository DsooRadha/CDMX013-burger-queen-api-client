import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import Logo from "../elements/Logo";
import './EditProducts.css'
import axios from "axios";

export const EditProducts = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    product: '',
    price: '',
    menu: '',
  });
  const navigate = useNavigate();

  const getProductsData = async () => {
    const result = await axios.get(`https://637265f4025414c6370eb684.mockapi.io/api/bq/Products/${id}`)
    setProduct(result.data);
  };

  useEffect(() => {
    getProductsData()
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct((prevState) => ({ ...prevState, [name]: value }))
  }

  const editData = async (product) => {
    await axios.put(`https://637265f4025414c6370eb684.mockapi.io/api/bq/Products/${id}`, product)
    navigate('/admin/products')
  }

  return (
    <div className="backDiv"><h1>PRODUCTOS</h1>
      <section className="editInp">
        <div className='edit'>
          <p>Producto</p>
          <input name="product" value={product.product} onChange={handleInputChange} />
          <p>Precio</p>
          <input name="price" value={product.price} onChange={handleInputChange} />
          <p>Horario</p>
          <select name="menu" value={product.menu} onChange={handleInputChange} >
            <option></option>
            <option>Desayuno</option>
            <option>24 hrs.</option>
          </select>
          <br />
          <button className='btnEdit' onClick={() => editData(product)} >GUARDAR</button>
        </div>
        <Logo />
      </section>
    </div>
  )
}