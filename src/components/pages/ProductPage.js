import React from "react";
import Rating from "./../Rating.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import LoadingBox from "../LoadingBox.js";
import MessageBox from "../MessageBox.js";
import Logo from "./../../assets/icons/logodriven.svg";
import { sidebarData } from "./SidebarData.js";
import UserContext from "./../context/UserContext";

export default function ProductPage(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [productsDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const { cart, setCart } = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://drivazon.herokuapp.com/products/${id}`
        );
        setLoading(false);
        console.log("0133")
        setProductDetails(data);
      } catch (error) {
        if (error.response && error.response.data.message)
          setError(error.response.data.message);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function addToCartHandler() {
    for(let i = 0; i < quantity; i++){
      setCart((previusvalue) => [...previusvalue,{productsDetails: productsDetails}])
    }
    console.log(cart)
    alert("Product added to the cart!")
    
  }

  function handleSidebar() {
    setSidebar(!sidebar);
  }

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
            <strong>
              <Link to="/cart">
                Cart
              </Link>
            </strong>
          </div>
        </NavBar>
      </Header>
      <Main>
        <section>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Main className="rows center">
              <Link to={"/"}>
                <p>Back to Result</p>
              </Link>
              <div>
                <div className="row top">
                  <div className="col-2">
                    <img
                      className="large"
                      src={productsDetails.image}
                      alt={productsDetails.name}
                    />
                  </div>
                  <div className="col-1">
                    <ul>
                      <li>
                        <h1>{productsDetails.name}</h1>
                      </li>
                      <li>
                        <Rating
                          rating={productsDetails.rating}
                          numReviews={productsDetails.numReviews}
                        ></Rating>
                      </li>
                      <li>Price : ${productsDetails.price}</li>
                      <li>
                        Description: <p>{productsDetails.descripttion}</p>
                      </li>
                    </ul>
                    <div className="col-1">
                      <div className="card card-body">
                        <ul>
                          <li>
                            <div className="row">
                              <div>Price</div>
                              <div className="price">{productsDetails.price}</div>
                            </div>
                          </li>
                          <li>
                            <div className="row">
                              <div>Status</div>
                              <div>
                                {productsDetails.countInStock > 0 ? (
                                  <span className="success">In Stock</span>
                                ) : (
                                  <span className="error">Unavailable</span>
                                )}
                              </div>
                            </div>
                          </li>
                          {productsDetails.countInStock > 0 && (
                            <>
                              <li>
                                <div className="row">
                                  <div className="label">Qty</div>
                                  <div>
                                    <select
                                      value={quantity}
                                      onChange={(event) =>
                                        setQuantity(event.target.value)
                                      }
                                    >
                                      {[
                                        ...Array(
                                          productsDetails.countInStock
                                        ).keys(),
                                      ].map((x) => (
                                        <option key={x + 1} value={x + 1}>
                                          {x + 1}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </li>
                              <li>
                                <button
                                  onClick={addToCartHandler}
                                  className="primary block"
                                >
                                  Add to cart
                                </button>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Main>
          )}
        </section>
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

  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
  }

  .firstRow {
    width: calc(365px * 2);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .firstRow input {
    width: 355.5px;
    height: 50px;
    margin-right: 7.5px;
    margin-left: 7.5px;
    background: #f3f3f3;
    border: 0px;
    border-radius: 5px;
  }

  .secondRow {
    width: calc(365px * 2);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }

  .secondRow textarea {
    width: calc(365px * 2);
    height: 200px;
    background: #f3f3f3;
    border: 0px;
    border-radius: 5px;
  }

  button {
    width: 200px;
    height: 50px;
    background: #ff516a;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;

    font-family: "Nunito";
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    line-height: 44px;
    color: white;

    margin-top: 25px;
  }
`;

const Message = styled.h1`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 700;
  font-size: 52px;
  line-height: 71px;
  margin-top: 50px;
  display: flex;
  text-align: center;

  color: #000000;
`;
