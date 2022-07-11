import styled from "styled-components";
import React, { useState, useEffect, useContext } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai" ;
import dotenv from "dotenv";

import Logo from "./../../assets/icons/logodriven.svg";
import { sidebarData } from "./SidebarData.js";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import UserContext from "./../context/UserContext";

export default function CartPage() {
  dotenv.config()
  const [sidebar, setSidebar] = useState(false);
  const { id } = useParams();
  const navigator = useNavigate();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const productID = id;
  const quantity = search ? Number(search.split("=")[1]) : 1;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { cart, setCart } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [productID, quantity]);

  function handleSidebar() {
    setSidebar(!sidebar);
  }

  const removeFromCartHandler = (id) => {
    // delete
    alert("Not working yet.")
  };

  const checkoutHandler = () => {
    if (cart.length === 0)
      return alert("Your cart is empty, please buy something first.");
    else {
      setCart(cart);
      navigator("/checkout");
    }
  };

  return (
    <>
      <Header>
        <div className="Title ">
          <Link to="#" className="menu-bars">
            <FaBars className="fabars" onClick={handleSidebar} />
          </Link>
          <img src={Logo} alt="Logo driven  " />
        </div>
        <div className="navbar">
          {" "}
          {/* Actually it's the Sidebar */}
          <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
            <ul className="nav-menu-items" onClick={handleSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiOutlineClose />
                </Link>
              </li>
              {sidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.className}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <NavBar>
          {" "}
          {/* A ideia aqui é pra cada um dos elementos ter um dropdown */}
          <Link to="/" className="Options">
            Store
          </Link>
          <div className="Options">
            <strong>Cart</strong>
          </div>
        </NavBar>
      </Header>
      <Main>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <Message>Shopping Cart</Message>
            <Container className="rows center">
              <div className="row top">
                <div className="col-2">
                  {console.log(cart)}
                  {cart.length === 0 ? (
                    <MessageBox>
                      Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                  ) : (
                    <ul>
                      {cart.map((item) => (
                        <li key={item.product}>
                          <CartImage className="row">
                            <div>
                              {console.log(item.productsDetails._id)}
                              <img
                                src={item.productsDetails.image}
                                alt={item.productsDetails.name}
                                className="small"
                              ></img>
                            </div>
                            <div className="min-30">
                              <Link to={`/product/${item.productsDetails._id}`}>
                                {item.productsDetails.name}
                              </Link>
                            </div>
                            <div>
                              <select value={item.qty}>
                                  <option key={1} value={1}>
                                    1
                                  </option>
                              </select>
                            </div>
                            <div>${item.price}</div>
                            <div>
                              <button
                                type="button"
                                onClick={() =>
                                  removeFromCartHandler(
                                    item.productsDetails.product
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </CartImage>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="col-1">
                  <div className="card card-body">
                    <ul>
                      <li>
                        <h2>
                          Subtotal ({cart.reduce(() => cart.length, 0)} items) :
                          $
                          {cart.reduce(
                            (accumlator, object) =>
                              object.productsDetails.price * cart.length,
                            0
                          )}
                        </h2>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={checkoutHandler}
                          className="primary block"
                        >
                         <p>
                         Proceed to Checkout
                          </p>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Container>
          </>
        )}
      </Main>
    </>
  );
}

const Header = styled.header`
  width: 100%;
  height: 60px;
  background-color: #ff7dae;
  display: flex;
  align-items: center;
  justify-content: space-between;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .fabars {
    margin-right: 10px;
    width: 20px;
    margin-top: 7px;
  }

  .Title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 30px;
  }

  .navbar {
    background-color: green;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  .menu-bars {
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }

  .nav-menu {
    background-color: green;
    width: 450px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }

  .nav-menu.active {
    left: 0;
    transition: 350ms;
  }

  .nav-text {
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }

  .nav-text a {
    text-decoration: none;
    color: black;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }

  .nav-text a:hover {
    background-color: #eadead;
  }

  .nav-menu-items {
    width: 100%;
  }

  .navbar-toggle {
    background-color: green;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  span {
    margin-left: 16px;
  }
`;

const NavBar = styled.nav`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  text-align: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 44px;
  color: #000000;
`;

const Main = styled.main`
  width: 100%;
  height: 100vh;
  backgroud-color: #ffffff;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  button {
    width: 200px;
    height: 50px;
    background: #ff516a;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
    display:flex;
    align-items:center;
    justify-content:center;

    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 44px;
    color: white;

    margin-top: 25px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-top: 50px;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  div .card {
    width: 300px;
  }
`;

const CartImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img{
    width: 200px;;
    margin-left: 30px;
  }

  button{
    width: 100px;
    margin-left: 100px;
    display:flex;
    align-items:center;
    justify-content: center;
    margin-bottom: 25px;
  }
`;

const Message = styled.h1`
  display:flex;
  justify-content: center;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 20px;
  margin-top: 10px;

  color: #000000;
`;
