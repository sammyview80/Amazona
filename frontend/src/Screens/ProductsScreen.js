import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { useSelector, useDispatch, useStore } from 'react-redux';
import { saveProduct, listProducts } from '../actions/productAction';

function ProductsScreen (props) {
    const [modelVisible, setModelVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [description, setDiscription] = useState('');
    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;
    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, sucess: sucessSave, error: errorSave} = productSave;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listProducts())
    } , [])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({name, price, countInStock, description, category, brand, image}));
    }
    const openModel =(product) => {
        setModelVisible(True)
        setId(product._id);
        setName(product.name);
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setPrice(product.price)
        setDiscription(product.description);
    }
    return(
    <div className="content content-margined">
        <div className="product-header">
            <h3>Products</h3>
            <button>Create Product</button>
        </div>
        <div className="form">
            <form onSubmit={submitHandler} >
                <ul className="form-container">
                    <li>
                        <h2>Create Product</h2>
                    </li>
                    <li>
                        {loadingSave && <div>Loading...</div>}
                        {errorSave && <div>{errorSave}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                        <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="price">
                            Price
                        </label>
                        <input type="text" name="price" id="price" onChange={(e) => setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="image">
                            Image
                        </label>
                        <input type="file" name="image" id="image" onChange={(e) => setImage(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="category">
                        Category
                        </label>
                        <input type="text" name="category" id="category" onChange={(e) => setCategory(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="brand">
                        Brand
                        </label>
                        <input type="text" name="brand" id="brand" onChange={(e) => setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="countInStock">
                        InStock
                        </label>
                        <input type="text" name="countInStock" id="countInStock" onChange={(e) => setCountInStock(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="Discription">
                        Discription
                        </label>
                        <input type="text" name="Discription" id="Discription" onChange={(e) => setDiscription(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit" className="button primary" >Create</button>
                    </li>
                   
                </ul>
            </form>
        </div>
        <div className="product-list">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product._id}>
                            <td>{product._id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>
                                <button >Edit</button>
                                <button> Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
        
    )
}

export default ProductsScreen;