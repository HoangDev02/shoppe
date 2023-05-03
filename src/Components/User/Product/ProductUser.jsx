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
  const productDetail = useSelector((state) => state.products.detailProduct);
  const { loading, error, product } = productDetail;
  const [quantity, setQuantity] = useState(1);
  const userId = user?._id;
  const navigate = useNavigate();
  
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")



  const handleAddCart = (e) => {
    e.preventDefault();
    //  addCart(user?.accessToken, dispatch, userId,id,quantity,);
     // const newProduct = {}\
    // navigate(`/cart/${userId}?quantity=${quantity}&productId=${id}`);
    const newPorduct = {
      productId: id,
      name: product.name,
      price: product.price,
      img: product.img,
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
              <img src={product?.img} alt="product image"/>
            </div>
            <div className="card_content text-center">
              <div>
                Mã giày:<input name="productId" value={product._id} onChange={(e) => setName(e.target.value)}  readOnly/>
                Tên giày:<input name="name" value={product.name} onChange={(e) => setName(e.target.value)}  readOnly/>
                Giá giày:<input name="price" value={product.price} onChange={(e) => setPrice(e.target.value)}  readOnly/>
                số lượng mua:<input name="quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                <p>description: {product?.description}</p>
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