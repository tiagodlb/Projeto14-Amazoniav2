import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "./../context/UserContext";
import axios from "axios";
import { ThreeDots } from  'react-loader-spinner'

import Logo from "./../../assets/icons/logodriven.svg";

function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)

  const { user, setUser } = useContext(UserContext);
  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const body = { email, password };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signin`, body);
      const { token, name } = response.data;
      setUser({ name, token });
      navigator("/home");
    } catch (error) {
      alert(
        "Ops! Infelizmente aconteceu algum erro, por favor tente novamente mais tarde."
      );
      console.log(error.response);
    }
  }
  return (
    <>
      <Main>
        <div>
          <Link to={"/"}>
            <img src={Logo} alt="Logo Drivazon"></img>
          </Link>
        </div>
        <form>
          <input
            type="text"
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>
            {loading ? ( <ThreeDots heigth="50" width="50" color="white" /> ) : ("Login")}
          </button>
        </form>
        <div className="signUp">
          <Link to="/signup">
            <p>First time? Sign up here!</p>
          </Link>
        </div>
      </Main>
    </>
  );
}

export default SignInPage;

const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #ff7dae;

  form {
    display: flex;
    flex-direction: column;
  }

  input {
    width: 350px;
    padding: 10px;
    border: 0px;
    border-radius: 5px;
    margin-top: 10px;
  }

  button {
    margin-top: 10px;
    border: 0px;
    border-radius: 5px;
    background-color: #091a60;
    line-height: 20px;
    font-weight: bold;
    color: #ffffff;
    cursor: pointer;
    width: 350px;
    height: 25px;
    display:flex;
    align-items: center;
    justify-content: center;
  }

  .signUp {
    margin: 10px;
    line-height: 20px;
  }

  ThreeDots{
    witdh: 10px;
  }
`;
