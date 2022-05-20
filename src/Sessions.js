import React from "react";
import axios from "axios";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Select } from "./Home";

export default function Sessions() {
    const { idFilme } = useParams();

    const [times, setTimes] = React.useState([]);

    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilme}/showtimes`);

        promise.then((response) => {
            setTimes(response.data);
        });
    }, []);


    return (
        <>
        <Header />
        <MainSessions times={times}/>
        <Footer movieBanner={times.posterURL} movieName={times.title} />
        </>
    );
}

function MainSessions(props) {
    console.log(props.times);
    return (
    <StyledSessions>
        <Select>
            <h2>Selecione o horário</h2>
        </Select>
        <SessionTimes times={props.times.days}/>
    </StyledSessions>
    );

}


function SessionTimes(props) {
    return (
        <StyledMain>
            {
                props.times.days.map((time, index) => (
                    <MovieSession key={index}>
                        <Day>
                            <p>{time.weekday} - {time.date}</p>
                        </Day>
                        <Times>
                        {
                            props.times.days[index].showtimes.map((showtime, index) => (
                                <Link to={`assentos/${showtime.id}`}>
                                    <Button key={index}>
                                        <p>{showtime.name}</p>
                                    </Button>
                                </Link>
                            ))}
                        </Times>
                    </MovieSession>
                ))}
        </StyledMain>
    );
}

const Button = styled.div`
    background-color: #e8833a;
    width: 83px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    margin-right: 8px;

    p{
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #ffffff;   
    }
`

const StyledMain = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 24px;
`

const MovieSession = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const Day = styled.div`

    p {
        font-family: 'Roboto', sans-serif;
        font-size: 20px;
        font-weight: 400;
        text-align: start;
        color: #293845;       
    }
`

const Times = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`

function Footer(props) {
    return (
        <StyledFooter>
            <BannerFooter>
                <img src={props.movieBanner} />
            </BannerFooter>
            <TextFooter>
                <p>{props.movieName}</p>
            </TextFooter>
        </StyledFooter>
    );
}

const StyledFooter = styled.div`
    width: 100%;
    height: 117px;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-directiom: row;
    z-index: 1;
    background-color: #dfe6ed;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;
`
const BannerFooter = styled.div`
    width: 13%;
    height: 62%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    border: 8px solid #ffffff;

    img {
        width: 100%;
        height: 100%;
    }
`
const TextFooter = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 15px;

    p {
        font-family: 'Roboto', sans-serif;
        font-size: 26px;
        font-weight: 400;
        text-align: start;
        color: #293845;    
    }
`

const StyledSessions = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 67px);
`