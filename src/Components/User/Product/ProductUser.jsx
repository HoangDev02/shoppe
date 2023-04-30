import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {getAllProduct,getProduct} from '../../../redux/API/apiRequestProduct'
import {Row,CardGroup ,Col,Card,Button } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import './productUser.scss'
const ProductUser = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.auth.login?.currentUser);
    const productDetail = useSelector((state) => state.products.detailProduct)
    const {loading,error,product} = productDetail
    
    useEffect(() => {
       getProduct(user?.accessToken,dispatch,id)
    },[id]) 
    
    
    return (
        <section className='product_section layout_padding'>
            <div className='container'>
                <form >
                <div class="heading_container heading_center">
                    <h2>
                    <span>{product?.name}</span>
                    </h2>
                </div>
                <div className='card_detail'>
                    <div className='card_image'>
                        <img src={product?.img}></img>
                    </div >
                    <div className="card_content text-center">
                        <div >
                        Mã giày:<input name="product_Id" value={product?._id} readonly/>
                        Tên giày:<input name="name" value={product?.name} readonly/>
                        Giá giày:<input name="price" value={product?.price} readonly/>
                        số lượng mua:<input name="quantity" type="number" value="1"/>
                        <p>description: {product?.description}</p>
                        </div>
                        <div class="d-grid gap-2 col-6 mx-auto">
                            <button type="submit" class="btn btn-outline-danger">
                            Buy Now
                        </button>
                        </div>
                    </div>

                </div>
                </form>
            </div>
        </section>
    );
};

export default ProductUser;