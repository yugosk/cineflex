import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
        <Header />
        <MainHome />
        </>
    );
}

function MainHome() {
    return (
        <HomeMain>
            <Select>
                <h2>Selecione o filme</h2>
            </Select>
            <Banners />
        </HomeMain>
    );
}

function Banners() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setMovies(response.data);
        });
    }, []);

    return (
        <BannerMain>
            {movies.map((banner, index) => 
            (
                <Banner key={index}>
                    <Link to={`/sessoes/${banner.id}`}><img src={banner.posterURL} /></Link>
                </Banner>
            ))}
        </BannerMain>
    );
}

const HomeMain = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 67px);
    background-color: #e5e5e5
`

export const Select = styled.div`
    height: 90px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
        padding-top: 12px; 
        font-family: 'Roboto', sans-serif;
        font-size: 24px;
        font-weight: 400;
        text-align: center;
        color: #293845;
    }
`

const BannerMain = styled.div`
        height: calc(100% - 102px);
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
`

const Banner = styled.div`
    width: 38.7%;
    height: 29.5%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin-bottom: 12px;

    img {
        width: 100%;
        height: 100%;
        border: 8px solid #ffffff;
    }
`