import styled from "styled-components";
import {Link, useNavigate} from "react-router-dom"
import Logo from "./../../assets/icons/logodriven.svg";

function MainPage() {
  function handleSearch(e) {
    e.preventDefault();
    alert("Essa função ainda não foi implementada");
  }
  return (
    <>
      <Header>
        <div className="Title">
          <img src={Logo} alt="Logo driven  " />
        </div>
        <Search>
          <SearchBar></SearchBar>
          <div className="search" onClick={handleSearch}>
            <ion-icon name="search-outline" size="small" />
          </div>
        </Search>
        <NavBar> {/* A ideia aqui é pra cada um dos elementos ter um dropdown */}
          <div className="Options flag">🇺🇸</div>
          <Link to="/signin" className="Options signIn">Hello, Sign in <strong>Account & Lists</strong></Link>
          <div className="Options history">Returns <strong> & Orders</strong></div>
          <div className="Optionsd"><strong>Cart</strong></div>
        </NavBar>
      </Header>
      <Main></Main>
      <Footer></Footer>
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

  .Title {
    margin-left: 30px;
  }

  ion-icon {
    width: 20px;
    height: 40px;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;

  .search {
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #febd69;
    border-radius: 0px 10px 10px 0px;
    cursor: pointer;
  }
  `;

const SearchBar = styled.input`
  width: 400px;
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #fffffe;
  padding: 10px;
  border: 0px;
  border-radius: 10px 0px 0px 10px;
`;

const NavBar = styled.nav`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color:#d6d6d6;

  .Options{
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    font-family: Arial,sans-serif;
    color: #ffffff;
    margin-right: 20px;
  }

  .flag{
    font-size: 24px;
  }

  .signIn{
    display:flex;
    flex-direction: column;
    font-size:12px;
  }

  strong{
    font-size: 14px;
    font-weight: bold;
  }

  .history{
    display:flex;
    flex-direction:column;
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  backgroud-color: #eaeded;
`;

const Footer = styled.footer`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #ff7dae;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
