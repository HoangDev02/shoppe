import { createSlice } from "@reduxjs/toolkit";

const cartSlide = createSlice(
    {
        name:"carts",
        initialState: {
            cart: {
                allCart: null,
                isFetching: false,
                error: false
            }
        },
        reducers: {
            getCartsStart: (state) => {
                state.cart.isFetching = true;
            },
            getCartsSuccess: (state, action) => {
                state.cart.isFetching = false;
                state.cart.allCart = action.payload;
            },
            getCartFailed: (state) => {
                state.cart.isFetching = false;
                state.cart.error = true;
            }
        }
    }
)
export const {
    getCartFailed,
    getCartsStart,
    getCartsSuccess
} = cartSlide.actions

export default cartSlide.reducer