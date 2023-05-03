import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import "./navbar.css";
import { logOut } from "../../redux/apiRequest"
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../../redux/createInstance";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faSearch
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const user = useSelector((state)=> state.auth.login.currentUser);
  const id = user?._id;
  const accessToken = user?.accessToken;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user,dispatch,logoutSuccess);
  
  const handleLogout = () =>{
    logOut(dispatch,id,navigate, accessToken, axiosJWT);
  }

  return (
      <Navbar expand="lg" variant="light" bg="light">
        <Container>
        <Navbar.Brand href="#home">
            <img
              src="https://classic.vn/wp-content/uploads/2022/04/logo-shopee.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
            Shoppe
          </Navbar.Brand>
        
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="justify-content-center flex-grow-1 pe-3">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/">Page</Nav.Link>
              <Nav.Link href="/product">Products</Nav.Link>
              <Nav.Link href="#pricing">blog</Nav.Link>
              <Nav.Link href="#pricing">Contact us</Nav.Link>
              <NavDropdown title="Shop" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <FontAwesomeIcon icon={faSearch} className="searchNavBar"></FontAwesomeIcon>
              <Link  to={`cart/${id}`}><FontAwesomeIcon icon={faCartShopping} className="icon icon-shoping"/></Link>
            {user? (
                <Nav>
                <Nav.Link >Hi, <span> {user.username}  </span> </Nav.Link>
                <Nav.Link to="/logout" className="navbar-logout" onClick={handleLogout}> Log out</Nav.Link>
                </Nav>
              ) : (    
                <Nav>
                <Link to="/login" className="account navbar-login"> Login </Link>
                <Link to="/register" className="account navbar-register"> Register</Link>
              </Nav>
            )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
};

export default NavBar;
