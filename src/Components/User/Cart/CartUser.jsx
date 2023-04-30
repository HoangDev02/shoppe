import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getCart } from '../../../redux/API/apiRequestcart';
import {  useParams, useNavigate } from 'react-router-dom';
import { createAxios } from "../../../redux/createInstance";
import { logoutSuccess } from "../../../redux/authSlice";

const CartUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state)=> state.auth.login.currentUser);
  const carts = useSelector((state) => state.carts.cart);
  const accessToken = user?.accessToken;
  

  const { loading,error,allcart } = carts;

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
  }, [userId]);

  return (
    <div>
      {
        carts?.allCart.map((item) => {
          return(
            <div>
              <p>{item.subtotal}</p>
              {item.products.map((product) => {
                return (
                  <div key={product.id}>
                    <h1>{product.name}</h1>
                    {/* <img src={product.img}></img> */}
                  </div>
                );
              })}
            </div>
          )
        })
      }
    </div>
  );
};

export default CartUser;