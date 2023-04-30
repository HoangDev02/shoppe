import axios from 'axios';
import {getProductsFailed,getProductsSuccess, getProductsStart, getSingleProductStart, getSingleProductSuccess} from '../productSlide'



export const getAllProduct = async(accessToken, dispatch) => {
    dispatch(getProductsStart());
    try{
        const res = await axios.get("/product/",{
            headers: {token: ` ${accessToken}`}
        })
        dispatch(getProductsSuccess(res.data))
    }catch(err) {
        dispatch( getProductsFailed())
    }
};

export const getProduct = async(accessToken,dispatch, id) => {
    dispatch(getSingleProductStart());
    try{
        const res = await axios.get(`/product/${id}`,{
            headers: {token: ` ${accessToken}`}
        })
        dispatch(getSingleProductSuccess(res.data))
    }catch(err) {
        dispatch(getProductsFailed())
    }
}