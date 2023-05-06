import { createSlice  } from "@reduxjs/toolkit";

const cartSlide = createSlice (
    {
        name:"carts",
        initialState: {
            cartItems: {
                allCart: [],
                isFetching: false,
                error: false
            },
            msg:"",
        },
        reducers: {
            getCartsStart: (state) => {
                state.cartItems.isFetching = true;
            },
            getCartsSuccess: (state, action) => {
                state.cartItems.isFetching = false;
                state.cartItems.allCart = action.payload;
                state.cartItems.error = false;
            },
            getCartFailed: (state) => {
                state.cartItems.isFetching = false;
                state.cartItems.error = true;
            },
            addCartStart: (state) => {
                state.cartItems.isFetching = true
            },
            addCartSuccess: (state,action) => {
                state.cartItems.isFetching = false;
                state.cartItems.error = false;
                state.cartItems.allCart = action.payload
            },
            addCartFailed: (state) =>{
                state.cartItems.isFetching = false;
                state.cartItems.error = false
            },
            deleteCartStart: (state) => {
                state.cartItems.isFetching = true
            },
            deleteCartSuccess: (state, action) => {
                state.cartItems.isFetching = false;
                state.msg = action.payload
            },
            deleteCartFails: (state,action) => {
                state.cartItems.isFetching = false;
                state.cartItems.error = true;
                state.msg = action.payload
            }
        }
    }
)
export const {
    getCartFailed,
    getCartsStart,
    getCartsSuccess,
    addCartStart,
    addCartFailed,
    addCartSuccess,
    deleteCartFails,
    deleteCartStart,
    deleteCartSuccess
} = cartSlide.actions

export default cartSlide.reducer