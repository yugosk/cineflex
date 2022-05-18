import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";

export default function Home() {
    return (
        <>
        <Header />
        <MainHome />
        </>
    );
}

function MainHome() {
    <div className="home">
        <div className="select">
            <h2>Selecione o filme</h2>
        </div>
        <Banners />
    </div>
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
        <div className="main">
            {movies.map((banner, index) => 
            (
                <div className="banner" key={index}>
                    <img src={banner.posterURL} />
                </div>
            ))}
        </div>
    );
}