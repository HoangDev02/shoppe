import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addCart, deleteCart, getCart } from '../../../redux/API/apiRequestcart';
import {  useParams, useNavigate,useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './cartUser.css'

const CartUser = () => {
  // window.scrollTo(0,0)
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const location = useLocation();
  // const productId = new URLSearchParams(location.search).get('productId');
  // const quantity = new URLSearchParams(location.search).get('quantity');

  const user = useSelector((state)=> state.auth.login.currentUser);
  const carts = useSelector((state) => state.carts.cartItems?.allCart);
  const accessToken = user?.accessToken;
  const [quantity, setQuantity] = useState(1);
  const msg = useSelector((state) => state.carts?.msg)

  const handleDeleteCart = (productId) => {
    // e.preventDefault();

    // const newProduct =  {
    //   productId : productId
    // }
    // console.log(productId)
    deleteCart(productId,dispatch,userId)
  }

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if(!carts) {
      navigate('/')
    }
    if (user?.accessToken) {      
      getCart(accessToken, dispatch,userId); 
    }
    // if(productId) {
    //  addCart(user?.accessToken, dispatch, userId,productId,quantity,);
    // }

  }, [userId]);

  return (
    <div>
      {
        // cart?.map((item) => {
        //   return(
          <div className="container">
              <div className="card pt-3 ">
              <div className="cart-header">Total cart product</div>
              {carts?.products.map((product) => {
                return (
                 <div className="card-body">
                  {/* <div></div> */}
                   <img  src={product.img}  className="img"/>
                   <div key={product.id}>
                    <div className="cardName">{product.name}</div>
                    <div className="cardQuantity">
                      {product.quantity}
                    </div>
                  <div className="CardPrice">${product.price}</div>
                  </div>
                  <button onClick={() => handleDeleteCart(product.productId)}>Delete</button>
                 </div>
                );
              })}
            </div>
            <h3>Total:${carts?.subtotal}</h3>
          </div>
          // )
        }
      {/* ) */}
      {/* // } */}
      {/* <div>{msg}</div> */}
    </div>
  );
};

export default CartUser;