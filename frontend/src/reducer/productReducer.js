import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCESS, PRODUCT_LIST_FAIL,PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCESS,PRODUCT_DETAIL_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCESS, PRODUCT_SAVE_FAIL } from "../constants/productConstants";

const initialState = {
    products: []
}

function productListReducer(state=initialState, action) {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};
        case PRODUCT_LIST_SUCESS:
            return {loading:false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productDetailsReducer(state={ product: {}}, action) {
    switch(action.type){
        case PRODUCT_DETAIL_REQUEST:
            return {loading: true};
        case PRODUCT_DETAIL_SUCESS:
            return {loading:false, sucess:true, product: action.payload};
        case PRODUCT_DETAIL_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productSaveReducer(state={ product: {}}, action) {
    switch(action.type){
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCESS:
            return {loading:false, product: action.payload};
        case PRODUCT_SAVE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}
export {productListReducer, productDetailsReducer, productSaveReducer};