import { createSlice } from "@reduxjs/toolkit";

const productSlide = createSlice(
    {
        name:"products",
        initialState: {
            products: {
                allProduct: null,
                isFetching: false,
                error: false
            },
            detailProduct: {
                product: [],
                isFetching: false,
                error: false
            }
        },
        reducers: {
            getProductsStart: (state) => {
                state.products.isFetching = true;
            },
            getProductsSuccess: (state, action) => {
                state.products.isFetching = false;
                state.products.allProduct = action.payload
            },
            getProductsFailed: (state) => {
                state.products.isFetching = false;
                state.products.error = true;
            },

            getSingleProductStart: (state) => {
                state.detailProduct.isFetching = true;
            },
            getSingleProductSuccess: (state, action) => {
                state.detailProduct.isFetching = false;
                state.detailProduct.product = action.payload
            },
            getSingleProducFailed: (state) => {
                state.detailProduct.isFetching = false;
                state.detailProduct.error = true;
            },
        }
    },
)
export const {
    getProductsFailed,
    getProductsStart,
    getProductsSuccess,
    getSingleProducFailed,
    getSingleProductStart,
    getSingleProductSuccess
} = productSlide.actions

export default productSlide.reducer