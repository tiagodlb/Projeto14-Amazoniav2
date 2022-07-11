import React from "react";
import { Link } from "react-router-dom";

export default function ProductScreen(props){
    const product = data.products.find(x => x._id === props.match.params.id);
    if (!product){
        return <div>Produto não encontrado</div>
    }
    return (
        <div>
            <Link to="/">Voltar para a página inicial</Link>
        <div className="row top">
            <div className="col-2">
                <img className="large" src={product.image} alt={product.name}></img></div>
            <div className="col-1">
            <ul>
                <li>
                    <h1>{product.name}</h1>
                </li>
                <li>Preço:R${product.price}</li>
                <li>Descrição:
                <p>{product.description}</p>
                </li>
            </ul>
            </div>
            <div className="col-1">
            <div className="card card-body">
                <ul>
                    <li>
                        <div className="row">
                            <div>Status</div>
                            <div className="price">R${product.price}</div>
                        </div>
                    </li>
                    <li>
                        <button className="primary block">Adicionar ao carrinho</button>
                    </li>
                </ul>
            </div>
            </div>

                    
    </div>
    </div>);
}