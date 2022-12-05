import axios from 'axios'
import * as React from 'react';
import "./admin.css";
import { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Modal from '../elements/Modal.jsx'
import MessageError from '../../noauth/MessageError';
// import { ProductsTable } from './ProductsTable';

export const AdminTable = ({ modified }) => {

    const [data, setData] = useState({
        name: '',
        area: '',
        email: '',
        password: ''
    })

    const [modal, setModal] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState({
        name: '',
        area: '',
        email: '',
        password: '',
    })
    const [edit, setEdit] = useState('');
    const [deleteUser, setDeleteUser] = useState(null)
    const [errorInput, setError] = useState(false);
    // const [message, setMessage] = useState(false);

    const URL = 'https://637265f4025414c6370eb684.mockapi.io/api/bq/users'

    const editRow = (row) => {
        setSelectedUser(row)
        setEdit(row.id)
    }
    const saveData = () => {
        setEdit('')
        editData(selectedUser)
    }

    const handleInputChange = (e) => {

        const { name, value} = e.target

        setSelectedUser((prevState) => ({ ...prevState, [name]: value }))
    }

    // const getData = () => {
    //     axios.get(URL).then(result => {
    //         const data = result.data;
    //         // console.log(data);
    //         setUsers(data);
    //     })
    // };
    const editData = async (datafinal) => {
        await axios.put(`https://637265f4025414c6370eb684.mockapi.io/api/bq/users/${datafinal.id}`, datafinal)
        console.log(datafinal)
        getData()

    }

    const deleteData = async () => {
        await axios.delete(`https://637265f4025414c6370eb684.mockapi.io/api/bq/users/${deleteUser.id}`, deleteUser)
        setModal(false)
        getData()
    }

    const getData = async () => {
        const result = await axios.get(URL)
        const data = result.data;
        setUsers(data);
    };

    const handleData = (e) => {
        const { name, value } = e.target

        setData((prevState) => ({ ...prevState, [name]: value }))
       
    }


    const handleApi = (e) => {
        e.preventDefault()

        if (data.email === '' || data.password === '' || data.name === '' || data.area === '') {
            setError(true)
        } else {

            const newUser = {
                name: data.name,
                area: data.area,
                email: data.email,
                password: data.password
            }
            axios.post('https://637265f4025414c6370eb684.mockapi.io/api/bq/users', newUser)
                .then((res) => {
                    setUsers([...users, res.data])
                    setData({
                        name: '',
                        area: '',
                        email: '',
                        password: '',
                    })
                })

            setError(false)
        }
    }

    useEffect(() => {
        getData()
    }, []);

    const showModal = (user) => {
        console.log(user);
        setModal(true);
        setDeleteUser(user)
    };

    const closeModal = () => {
        setModal(false);
    }
    const columns = [
        {
            name: 'NOMBRE',
            id: "name",
            selector: row => edit === row.id ? <input name="name" value={selectedUser.name} onChange={handleInputChange}>
            </input> : row.name
        },
        {
            name: 'AREA',
            id: "area",
            selector: row => edit === row.id ? <select name="area" onChange={handleInputChange}>
                <option>Cocina</option>
                <option>Administrador</option>
                <option>Meserx</option>
            </select> : row.area
        },
        {
            name: 'CORREO',
            id: "e-mail",
            selector: row => edit === row.id ? <input name="email" value={selectedUser.email} onChange={handleInputChange}>
            </input> : row.email
        },
        {
            name: 'CONTRASEÑA',
            id: "password",
            selector: row => edit === row.id ? <input name="password" value={selectedUser.password} onChange={handleInputChange}>
            </input> : row.password
        },
        {
            name: '',
            id: "editbtn",
            selector: row => edit === row.id ? <SaveIcon onClick={() => saveData(row)}>OK</SaveIcon>
                : <EditIcon onClick={() => editRow(row)} >editar</EditIcon>
        },
        {
            name: '',
            id: "deletebtn",
            selector: row => <DeleteIcon onClick={() => showModal(row)}
            >Eliminar</DeleteIcon>
        },
    ]
    return (<>
        <div className='employee'>
            <input name="name" value={data.name} onChange={handleData} placeholder='Nombre' className='inputAdm'></input>
            <input name="area" value={data.area} onChange={handleData} placeholder='Área' className='inputAdm'></input>
            <input name="email" value={data.email} onChange={handleData} placeholder='Correo' type='email' className='inputAdm'></input>
            <input name="password" value={data.password} onChange={handleData} placeholder='Contraseña' className='inputAdm'></input>
            <button id="addEmployee" onClick={handleApi}>AGREGAR</button>
        </div>
        {errorInput && <MessageError message='Llena todos los campos' />}
        <div className='Table'>
            <DataTable
                columns={columns}
                data={users}
            />
            {
                modal && <Modal
                    modalFunction={deleteData}
                    closeFunction={closeModal}
                    message='¿Deseas eliminar este empleado?' />
            }
        </div>
    </>
    )
}

