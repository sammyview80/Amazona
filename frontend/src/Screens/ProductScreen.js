import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { detailProducts } from '../actions/productAction';

function ProductScreen (props) {
    // const product = data.products.find(x => x._id === props.match.params.id)
    const [qty, setQty] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {product, loading, error} = productDetails;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(detailProducts(props.match.params.id));
    } , [])
    const handleAddToCart = () => {
        props.history.push('/cart/' + props.match.params.id + "?qty=" + qty)
      }
    return(
        <div>
            <div className="black-to-result">
                <Link to='/'>Back to result</Link>
            </div>
            {loading ? <div>loading...</div>:
            error? <div> {error}</div> :
            (<div className="details">
                <div className="details-image">
                    <img src={product.image} alt={'productImage'}></img>
                </div>
                <div className="details-info">
                    <ul>
                        <li><h4>{product.name}</h4></li>
                        <li>
                            {product.rating} Stars ({product.numReviews} Reviews)
                        </li>
                        <li>
                            <b>Price: ${product.price}</b>
                        </li>
                        <li>
                            Discription:
                            <div>
                                {product.description}
                            </div>
                        </li>
                    </ul>
                </div>
            <div className="details-action">
                <ul>
                    <li>
                        Price: ${product.price}
                    </li>
                    <li>
                        Status: {product.countInStock>0 ? 'In Stock' : 'Unavailable'}
                    </li>
                    <li>
                        Qty: <select value={qty} onChange={e => setQty(e.target.value)}>
                            {[...Array(product.countInStock).keys()].map(x => 
                                <option key={x} value={x+1}>{x+1}</option>)}
                        </select>
                    </li>
                    <li>
                        {product.countInStock>0 && <button onClick={handleAddToCart} className='button'>Add to cart</button>}
                        
                    </li>
                </ul>
            </div>
            </div>)}
        </div>
    )
}

export default ProductScreen;