import axios from 'axios';
import {getCartFailed,getCartsStart,getCartsSuccess} from '../cartSlide'


export const getCart = async(accessToken, dispatch,userId) => {
   dispatch(getCartsStart());
    try{
        const res = await axios.get(`/cart/${userId}`, {
            headers: {token: `${accessToken}`}
        })
        console.log(res);
        dispatch(getCartsSuccess(res.data))
    }catch(err) {
        dispatch(getCartFailed())
    }
}

export const getCarts = async(accessToken, dispatch) => {
    dispatch(getCartsStart());
     try{
         const res = await axios.get(`/cart/`, {
             headers: {token: `${accessToken}`}
         })
         console.log(res);
         dispatch(getCartsSuccess(res.data))
     }catch(err) {
         dispatch(getCartFailed())
     }
 }