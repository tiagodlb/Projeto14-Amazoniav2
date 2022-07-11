import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Logo from "./../../assets/icons/logodriven.svg";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigator = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/signup", {
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
            Login
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
  }

  .signUp {
    margin: 10px;
    line-height: 20px;
  }
`;
