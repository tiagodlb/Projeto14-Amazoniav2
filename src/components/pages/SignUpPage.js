import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { ThreeDots } from  'react-loader-spinner'

import dotenv from "dotenv"
import Logo from "./../../assets/icons/logodriven.svg";

function SignUpPage() {
  dotenv.config()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false)


  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });

      alert("Cadastro feito com sucesso!");
      navigator("/signin");
    } catch (error) {
      alert(
        "Ops! Infelizmente deu alguma coisa errada :(\nTenta novamente mais tarde..."
      );
      console.log(error);
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
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
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
          <input
            type="password"
            value={confirmPassword}
            placeholder="Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>
          {loading ? ( <ThreeDots heigth="50" width="50" color="white" /> ) : ("Sign Up")}
          </button>
        </form>
        <div className="signUp">
          <Link to="/signin">
            <p>Already have an account? Sign in here!</p>
          </Link>
        </div>
      </Main>
    </>
  );
}

export default SignUpPage;

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
`;
