import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

export default function Sessions(props) {
    const [times, setTimes] = useState([]);
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${props.movieId}/showtimes`);
        promise.then(response => {
            setTimes(response.data);
        });
    }, []);

    return (
        <>
        <Header />
        <MainSessions times={times.days}/>
        <Footer movieBanner={times.posterURL} movieName={times.title} />
        </>
    );
}

function MainSessions(props) {
    return (
    <div className="sessions">
        <div className="select">
            <h2>Selecione o horário</h2>
        </div>
        <SessionTimes times={props.times}/>
    </div>
    );

}

function SessionTimes(props) {
    return (
        <div className="main">
            {
                props.times.map((time, index) => (
                    <div className="movieSession" key={index}>
                        <div className="day">
                            <p>{time.weekday} - {time.date}</p>
                        </div>
                        <div className="times">
                        {
                            props.times[index].showtimes.map((showtime,index) => (
                                <div className="button" key={index}>
                                    <p>{showtime.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}

function Footer(props) {
    return (
        <footer>
            <div className="banner">
                <img src={props.movieBanner} />
            </div>
            <div className="text">
                <p>{props.movieName}</p>
            </div>
        </footer>
    );
}