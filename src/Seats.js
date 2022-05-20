import React from "react";
import axios from "axios";
import Header from "./Header";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";
import { Select } from "./Home";

export default function Seats() {
    const { idSessao } = useParams();

    const [seats, setSeats] = React.useState([]);
    React.useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSessao}/seats`);

        promise.then((response) => {
            setSeats(response.data);
        });
    }, []);

    return (
        <>
        <Header />
        <MainSeats />
        </>
    );
}

function MainSeats(props) {
    return (
        <StyledSeats>
            <Select>
                <h2>Selecione o(s) assento(s)</h2>
            </Select>
            <SeatsListing>
                {
                    props.seats.map((seat, index) => (
                        <SeatsButton available={seat.isAvailable} key={index}>

                        </SeatsButton>
                    ))
                }
            </SeatsListing>
        </StyledSeats>
    );
}

const SeatsListing = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 36%;
`

const SeatsButton = styled.div`
    background-color: ${props => props.available === true ? "#c3cfd9" : "#fbe192"};
    border-color: ${props => props.available === true ? "#7b8b99" : "#f7c52b"};
    border: 1px solid;
`

const StyledSeats = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 67px);
`