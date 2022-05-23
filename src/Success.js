import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

export default function Success({ tickets }) {
    return (
        <>
        <Header />
        <StyledSuccess>
            <p>Pedido feito <br/> com sucesso!</p>
        </StyledSuccess>
        <MovieSuccess>
            <h2>Filme e sessão</h2>
            <p>Enola Holmes</p>
            <p>24/06/2021 15:00</p>
        </MovieSuccess>
        </>
    );
}

const StyledSuccess = styled.div`
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;

    p{
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: #247a6b;    
    }
`

const MovieSuccess = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 28px;
    justify-content: space-around;
    align-items: flex-start;

    h2{
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: #293845;
        margin-bottom: 10px;    
    }

    p{
        font-family: 'Roboto', sans-serif;
        font-size: 22px;
        font-weight: 400;
        text-align: center;
        color: #293845;
        margin-bottom: 2px;    
    }
`