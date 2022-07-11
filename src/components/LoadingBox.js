import React from "react";
import styled from "styled-components";

export default function LoadingBox(){
    return(
        <>
            <Loader className="loader"></Loader>
        </>
    )
}

const Loader = styled.div`
    border: 16px solid #f3f3f3;
    border-top: 16px solid #3498db;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
    margin-left: calc(50% - 120px + 5rem)
    margin-top: 150px;

    @keyframes spin {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }
    }
`