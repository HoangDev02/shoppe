import axios from 'axios';
import {getProductsFailed,getProductsSuccess, getProductsStart, getSingleProductStart, getSingleProductSuccess} from '../productSlide'



export const getAllProduct = async(dispatch) => {
    dispatch(getProductsStart());
    try{
        const res = await axios.get("/product/",)
        dispatch(getProductsSuccess(res.data))
    }catch(err) {
        dispatch( getProductsFailed())
    }
};

export const getProduct = async(dispatch, id) => {
    dispatch(getSingleProductStart());
    try{
        const res = await axios.get(`/product/${id}`)
        dispatch(getSingleProductSuccess(res.data))
    }catch(err) {
        dispatch(getProductsFailed())
    }
}