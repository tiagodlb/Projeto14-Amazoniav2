import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Product(props) {
  const { product } = props;
  return (
    <ProductDiv key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name}></img>
      </Link>
      <div className="card-body">
        <Category>{product.category}</Category>
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <Price className="price">${product.price}</Price>
      </div>
    </ProductDiv>
  );
}

const Category = styled.div`
  color: gray;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 28px;
`;

const Price = styled.div`
  width: 100%;
`

const ProductDiv = styled.div`
  width: 400px;
  height: 420px;
  display:flex;
`;
