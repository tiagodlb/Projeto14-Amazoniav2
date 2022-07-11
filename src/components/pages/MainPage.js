import styled from "styled-components";
import React, { useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FaBars} from "react-icons/fa"
import {AiOutlineClose} from "react-icons/ai"
import axios from "axios";


import Logo from "./../../assets/icons/logodriven.svg";
import { sidebarData } from "./SidebarData.js";
import LoadingBox from "../LoadingBox";
import Product from "../Product";
import MessageBox from "../MessageBox";
import UserContext from "../context/UserContext";

function MainPage() {
  const [sidebar, setSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {user} = useContext(UserContext)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("https://drivazon.herokuapp.com/products");
        setLoading(false);
        console.log(data)
        console.log(user)
        setProducts(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function handleSidebar(){
    setSidebar(!sidebar)
  }

  return (
    <>
      <Header>
        <div className="Title ">
          <Link to="#" className="menu-bars">
          <FaBars className="fabars" onClick={handleSidebar}/>
          </Link>
          <img src={Logo} alt="Logo driven  " />
        </div>
        <div className="navbar"> {/* Actually it's the Sidebar */}
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className="nav-menu-items" onClick={handleSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="menu-bars">
                  <AiOutlineClose />
                </Link>
              </li>
              {sidebarData.map((item,index) => {
                return(
                  <li key={index} className={item.className}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>
                        {item.title}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
        <NavBar> {/* A ideia aqui é pra cada um dos elementos ter um dropdown */}
          <Link to="/contact" className="Options">Contact Us</Link>
          <div className="Options"><strong>Cart</strong></div>
        </NavBar>
      </Header>
      <Main>
        <section>
          <Message>Welcome to Drivazon</Message>
        </section>
        <section>
          {loading ? ( 
            <LoadingBox></LoadingBox>
          ): error ? (
            <MessageBox variant = "danger"></MessageBox>
          ) : (
            <article>
              <div className="rows center">
                {products.map((product) => (
                  <Product className="product" key={product._id} product={product} />
                ))}
              </div>
            </article>
          )}
        </section>
      </Main>
          <Footer>All rights reserved</Footer>
    </>
  );
}

export default MainPage;

const Header = styled.header`
  width: 100%;
  height: 60px;
  background-color: #ff7dae;
  display: flex;
  align-items: center;
  justify-content: space-between;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .fabars{
    margin-right: 10px;
    width: 20px;
    margin-top: 7px;
  }

  .Title {
    display:flex;
    align-items:center;
    justify-content: center;
    margin-left: 30px;
  }

  .navbar{
    background-color: green;
    height: 80px;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  
  .menu-bars{
    margin-left: 2rem;
    font-size: 2rem;
    background: none;
  }
  
  .nav-menu{
    background-color:green;
    width: 450px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: -100%;
    transition: 850ms;
  }
  
  .nav-menu.active{
    left:0;
    transition: 350ms;
  }
  
  .nav-text{
    display:flex;
    justify-content: start;
    align-items: center;
    padding: 8px 0px 8px 16px;
    list-style: none;
    height: 60px;
  }
  
  .nav-text a{
    text-decoration: none;
    color: black;
    font-size: 18px;
    width: 95%;
    height: 100%;
    display:flex;
    align-items: center;
    padding: 0 16px;
    border-radius: 4px;
  }
  
  .nav-text a:hover{
    background-color: #eadead;
  }
  
  .nav-menu-items{
    width: 100%;
  }
  
  .navbar-toggle{
    background-color: green;
    width: 100%;
    height: 80px;
    display:flex;
    justify-content: start;
    align-items: center;
  }
  
  span{
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
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 44px;
  color: #000000;
`;

const Main = styled.main`
  width: 100%;
  height: 124.5rem;
  backgroud-color: #ffffff;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  section{
    width:100%;
    height: 300px;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    text-align: center;
    justify-content: center;
    background-color: purple;
  }

  article{
    width:100%;
    height: 400px;
    display:flex;
    flex-wrap: wrap;
    justify-content;
    align-items:center;
    background-color:orange;
  }

  section div{
    display:flex;
    flex-wrap: wrap;
    align-items:center;
    justify-content:center;
    background-color: green;
  }

`;

const Message = styled.h1`
  font-family: 'Reem Kufi';
  font-style: normal;
  font-weight: 700;
  font-size: 96px;
  line-height: 144px;

  display: flex;
  align-items: center;
  text-align: center;

  color: #000000;
`

const Footer = styled.footer`
  position: absolute;
  bottom: auto;
  width: 100%;
  display: flex;
  text-align: center;
  justify-content: center;
  font-family: 'Nunito';
  font-weight: 700;
  font-size: 32px;
  line-height: 44px;
  background-color: orange;
`
