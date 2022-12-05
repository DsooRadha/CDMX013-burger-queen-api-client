import { useEffect, useState } from "react"
import axios from "axios"
import "./productsTable.css"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '../elements/Modal.jsx';
import MessageError from '../../noauth/MessageError';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const ProductsTable = () => {
    const [products, setProducts] = useState([])
    const [modal, setModal] = useState(false);
    const [deleteProduct, setDeleteProduct] = useState(null)
    const [errorInput, setError] = useState(false);

    const URL = 'https://637265f4025414c6370eb684.mockapi.io/api/bq/Products'

    const [data, setData] = useState({
        product: '',
        price: '',
        menu: '',
    })

    const handleInputChange = (e) => {

        const { name, value } = e.target
        setData((prevState) => ({ ...prevState, [name]: value }))
    }

    const getProductsData = async () => {
        const result = await axios.get(URL)
        setProducts(result.data);
    };

    useEffect(() => {
        getProductsData()
    }, []);

    const handleApi = () => {
        if (data.product === '' || data.price === '' || data.menu === '') {
            setError(true)
        } else {
            const newProduct = {
                product: data.product,
                price: data.price,
                menu: data.menu,
            }
            axios.post('https://637265f4025414c6370eb684.mockapi.io/api/bq/Products', newProduct)
                .then((res) => {
                    setProducts([...products, res.data])
                    setData({
                        product: '',
                        price: '',
                        menu: '',
                    })
                })
                setError(false)
        }

    }

    const showModal = (user) => {
        setModal(true);
        setDeleteProduct(user)
    };

    const closeModal = () => {
        setModal(false);
    }

    const deleteData = async () => {
        console.log(deleteProduct);
        await axios.delete(`https://637265f4025414c6370eb684.mockapi.io/api/bq/Products/${deleteProduct.id}`, deleteProduct)
        setModal(false)
        getProductsData()
    }

    // const navigate = useNavigate();
    return (
        <div className="productsTable">
            <div className='employee'>
                <input name="product" value={data.product} onChange={handleInputChange} placeholder='Producto' className='inputAdm'></input>
                <input name="price" value={data.price} onChange={handleInputChange} placeholder='Precio' className='inputAdm'></input>
                <input name="menu" value={data.menu} onChange={handleInputChange} placeholder='Menu' className='inputAdm'></input>
                <button id="addEmployee" onClick={handleApi}>AGREGAR</button>
            </div>
            {errorInput && <MessageError message='Llena todos los campos' />}
            {/* <h3>Productos</h3> */}
            <table id='products'>
                <tbody>
                    <tr>
                        <th className="columna">PRODUCTO</th>
                        <th className="columna">PRECIO</th>
                        <th className="columna">MENU</th>
                        <th className="botones"></th>
                        <th className="botones"></th>
                    </tr>
                    {products.map((item, i) =>
                        <tr className='row' key={i}>
                            <td>{item.product}</td>
                            <td>$ {item.price}</td>
                            <td>{item.menu}</td>
                            <td><Link to={`${item.id}`}><EditIcon >Editar </EditIcon></Link></td>
                            <td><DeleteIcon onClick={() => showModal(item)}>Borrar</DeleteIcon></td>
                        </tr>
                    )};
                </tbody>
            </table>
            {
                modal && <Modal
                    modalFunction={deleteData}
                    closeFunction={closeModal} 
                    message='¿Deseas eliminar este producto?'
                    />
            }
        </div>
    )
}