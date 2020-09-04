import { PRODUCT_LIST_SUCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_SAVE_SUCESS, PRODUCT_SAVE_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_SAVE_REQUEST,  PRODUCT_DETAIL_SUCESS,PRODUCT_DETAIL_FAIL } from"../constants/productConstants";
import axios from "axios";

const listProducts = () => (
    async (dispatch) => {
        try {
            dispatch({type: PRODUCT_LIST_REQUEST});
            const {data} = await axios.get('http://localhost:5000/api/products');
            dispatch({type: PRODUCT_LIST_SUCESS, payload: data});
        }
        catch(error){
            dispatch({type: PRODUCT_LIST_FAIL, payload: error.message});
        }
    }
)

const saveProduct = (product) =>(
    async (dispatch, getState) => {
        try{
            dispatch({type: PRODUCT_SAVE_REQUEST, payload: product});
            const { userSignin: {userInfo}} = getState();
            const {data} = await axios.post('http://localhost:5000/api/products', {
                headers: {
                    'Authorization': 'Bearer' + userInfo.token
                },
                ...product
            });
            dispatch({type: PRODUCT_SAVE_SUCESS, payload: data})
        }catch(error){
            dispatch({type: PRODUCT_SAVE_FAIL, payload: error.message});
        }
    }
)

const detailProducts = (productId) => (
    async (dispatch) => {
        try{
            dispatch({type: PRODUCT_DETAIL_REQUEST, payload:productId});
            const {data} = await axios.get('http://localhost:5000/api/products/' + productId + '/');
            dispatch({type: PRODUCT_DETAIL_SUCESS, payload: data});
    }
    catch(error){
        dispatch({type: PRODUCT_DETAIL_FAIL, payload: error})
    }
}
)

export {listProducts, detailProducts, saveProduct};