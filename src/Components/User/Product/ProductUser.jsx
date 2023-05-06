import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProduct, getProduct } from '../../../redux/API/apiRequestProduct';
import { addCart } from '../../../redux/API/apiRequestcart';
import { Row, CardGroup, Col, Card, Button } from 'react-bootstrap';
import { Link, useParams,useNavigate  } from 'react-router-dom';
import './productUser.scss';

const ProductUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const productDetail = useSelector((state) => state.products.detailProduct?.product);
  // const { loading, error, product } = productDetail;
  const [quantity, setQuantity] = useState(1);
  const userId = user?._id;
  const navigate = useNavigate();



  const handleAddCart = (e) => {
    e.preventDefault();
    //  addCart(user?.accessToken, dispatch, userId,id,quantity,);
     // const newProduct = {}\
    // navigate(`/cart/${userId}?quantity=${quantity}&productId=${id}`);
    const newPorduct = {
      productId: id,
      name: productDetail.name,
      price: productDetail.price,
      img: productDetail.img,
      quantity
    }
    addCart(newPorduct,dispatch,navigate,userId)
  };

  useEffect(() => {
    getProduct( dispatch, id);
  }, [id]);

  return (
    <section className="product_section layout_padding">
      <div className="container cart-product">
        <form onSubmit={handleAddCart}> 
          <div class="infor-Product">
            <h2>
              <span>Thông tin sản phẩm</span>
            </h2>
          </div>
          <div className="card_detail">
            <div className="card_image">
              <img src={productDetail?.img} alt="product image"/>
            </div>
            <div className="card_content text-center">
              <div>
                Mã giày:<input name="productId" value={productDetail?._id}  readOnly/>
                Tên giày:<input name="name" value={productDetail?.name}   readOnly/>
                Giá giày:<input name="price" value={productDetail?.price}  readOnly/>
                số lượng mua:<input name="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                <p>description: {productDetail?.description}</p>
              </div>
              <div class="d-grid gap-2 col-6 mx-auto">
                <button type="submit" class="btn btn-outline-danger"  >
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