import React from "react";
import Header from "./Header";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

export default function Success() {
    const { state } = useLocation();
    return (
        <>
        <Header />
        <StyledSuccess>
            <p>Pedido feito <br/> com sucesso!</p>
        </StyledSuccess>
        <MovieSuccess>
            <h2>Filme e sessão</h2>
            <p>{state.completedOrder.title}</p>
            <p>{state.completedOrder.day} {state.completedOrder.time}</p>
        </MovieSuccess>
        <MovieSuccess>
            <h2>Ingressos</h2>
        {
            state.completedOrder.seatsNumbers.map((number, index) => {
                <p key={index}>Assento {number}</p>
            })
        }
        </MovieSuccess>
        <MovieSuccess>
            <h2>Comprador</h2>
            <p>Nome: {state.completedOrder.name}</p>
            <p>CPF: {state.completedOrder.cpf}</p>
        </MovieSuccess>
        <Link to="/">
            <ButtonHome>Voltar para Home</ButtonHome>
        </Link>
        </>
    );
}

const ButtonHome = styled.div`
    width: 60%;
    height: 42px;
    background-color: #e8833a;
    border: none;
    border-radius: 3px;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
    margin-top: 75px;     
`

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