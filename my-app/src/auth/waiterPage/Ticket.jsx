import DeleteIcon from '@mui/icons-material/Delete';

export const Ticket = ({ item, deleteItem, addProductOrder, deleteProductOrder}) => {
  
    const addProduct = () => {
        // setValue(value + 1)
        addProductOrder(item.product)
    }

    const removeProduct = () => {
        // setValue(value - 1)
        deleteProductOrder(item.product)
    }

    return (
        <div className="orderButton">

            <div className='productsOrder'>{item.product.product} </div>
            <p> $ {item.product.price * item.qty}</p>
            <button onClick={addProduct}  >+</button>
            <p>{item.qty<1?item.qty=1:item.qty}</p>
            {/* <p>{item.qty}</p> */}
            <button onClick={removeProduct} >-</button>
            <DeleteIcon onClick={deleteItem} />
        </div>
    )
}