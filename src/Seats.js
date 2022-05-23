import React from "react";
import axios from "axios";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
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

    const [formsName, setFormsName] = React.useState("");
    const [formsCPF, setFormsCPF] = React.useState("");
    const [formsSeats, setFormsSeats] = React.useState([]);
    const [seatsOrdered, setSeatsOrdered] = React.useState([]);
    const [order, setOrder] = React.useState({});
    let navigate = useNavigate();

    function placeOrder() {
        const regex = /^\d{11}$/
        setOrder({
               ids: formsSeats,
               name: formsName,
               cpf: formsCPF
            });
        const orderSuccess = {
            ...order,
            title: seats.movie.title,
            day: seats.day.date,
            time: seats.name,
            seatsNumbers: seatsOrdered
        }
        if (order.ids.length>0 && order.name !== "" && order.cpf.match(regex)) {
            axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", order);
            navigate("/sucesso", {state:orderSuccess});
        } else {
            alert("Preencha os campos corretamente");
        }
    }

return (
        <>
        <Header />
        <StyledSeats>
            <MainSeats seats={seats.seats} formSeats={formsSeats} setFormsSeats={setFormsSeats} seatsOrdered={seatsOrdered} setSeatsOrdered={setSeatsOrdered} />
            <Forms>
                <label htmlFor="nome">Nome do comprador:</label>
                <input id="nome" placeholder="Digite seu nome..." onChange={e => {setFormsName(e.target.value)}}></input>
                <label htmlFor="cpf">CPF do comprador:</label>
                <input id="cpf" placeholder="Digite seu CPF..." onChange={e => {setFormsCPF(e.target.value)}}></input>
                <button onClick={() => placeOrder()}>Reservar assento(s)</button>
            </Forms>
        </StyledSeats>
        <LastFooter>
            <BannerLastFooter>
                <img src={seats.posterURL}/>
            </BannerLastFooter>
        </LastFooter>
        </>
    );
//            <TextLastFooter>
//                <p>{seats.movie.title}</p>
//                <p>{seats.day.weekday} - {seats.name}</p>
//            </TextLastFooter>
}

function MainSeats({ seats, formsSeats, setFormsSeats, seatsOrdered, setSeatsOrdered }) {
    return (
        <>
            <Select>
                <h2>Selecione o(s) assento(s)</h2>
            </Select>
            {/* <SeatsListing>
                {
                    seats.map((seat, index) => (
                        <>
                        <Button availability={seat.isAvailable} formsSeats={formsSeats} setFormsSeats={setFormsSeats} seatsOrdered={seatsOrdered} setSeatsOrdered={setSeatsOrdered} number={index + 1} key={index} id={seat.id} />
                        </>
                    ))
                }
            </SeatsListing> */}
            <StyledExample>
                <SeatsExample>
                    <SelectedSeat></SelectedSeat>
                    <p>Selecionado</p>
                </SeatsExample>
                <SeatsExample>
                    <SeatsButton background={"#c3cfd9"} border={"#7b8b99"}></SeatsButton>
                    <p>Disponível</p>
                </SeatsExample>
                <SeatsExample>
                    <SeatsButton background={"#fbe192"} border={"#f7c52b"}></SeatsButton>
                    <p>Indisponível</p>
                </SeatsExample>
            </StyledExample>
        </>
    );
}


function Button({ id, number, availability, formsSeats, setFormsSeats, seatsOrdered, setSeatsOrdered }) {
    const [statusSeat, setStatusSeat] = React.useState(availability);

    function selectSeat(id, number) {
        const arraySeats = formsSeats;
        const seatsNumbers = seatsOrdered;
        if (arraySeats.length === 0) {
            arraySeats.push(id);
            seatsNumbers.push(number);
            setStatusSeat("selected");
        } else {
            if (arraySeats.includes(id)) {
                arraySeats.filter((seat) => seat !== id);
                seatsNumbers.filter((seat) => seat !== number);
                setStatusSeat(true);
            } else {
                arraySeats.push(id);
                seatsNumbers.push(number);
                setStatusSeat("selected");
            }
        }
        setFormsSeats(arraySeats);
        setSeatsOrdered(seatsNumbers);
    }

    function busySeat() {
        alert("Esse assento não está disponível.");
    }

    switch(statusSeat) {
        case true:
            return (
            <SeatsButton background={"#c3cfd9"} border={"#7b8b99"} onClick={() => selectSeat(id, number)}>
                <p>{number}</p>
            </SeatsButton>
            );
        case false:
            return (
            <SeatsButton background={"#fbe192"} border={"#f7c52b"} onClick={() => busySeat}>
                <p>{number}</p>
            </SeatsButton>

            );
        case "selected":
            return (
            <SeatsButton background={"#8dd7cf"} border={"#1aae9e"} onClick={() => selectSeat(id, number)}>
                <p>{number}</p>
            </SeatsButton>
            );
    }
}

const LastFooter = styled.div`
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
const BannerLastFooter = styled.div`
    width: 64px;
    height: 88px;
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

const TextLastFooter = styled.div`
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


const Forms = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 87%;
    margin-top: 33px;

    input{
        width: 87%;
        height: 51px;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        font-weight: 400;
        text-align: left;
        color: #afafaf; 
        font-style: italic;
        padding-left: 18px;
        margin-top: 2px;
        margin-bottom: 2px;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
    }

    label{
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        font-weight: 400;
        text-align: center;
        color: #293845;
        line-height: 21px;   
        margin-top: 7px;         
    }

    button{
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
        position: relative;
        left: 17%;
        margin-top: 55px;     
    }
`
const SeatsListing = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 350px;
`

const StyledExample = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-evenly;
`
const SeatsExample = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        font-family: 'Roboto', sans-serif;
        font-size: 13px;
        font-weight: 400;
        text-align: center;
        color: #4e5a65;   
        text-align: center; 
    }    
`
const SelectedSeat = styled.div`
    background-color: #8dd7cf;
    border-color: #1aae9e;
    border: 1px solid;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 7px;
    margin-bottom: 18px;

    p{
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        font-weight: 400;
        text-align: center;
        color: #000000;   
        text-align: center;

`

const SeatsButton = styled.div`
    background-color: ${props => props.background};
    border-color: ${props => props.border};
    border: 1px solid;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 7px;
    margin-bottom: 18px;

    p{
        font-family: 'Roboto', sans-serif;
        font-size: 11px;
        font-weight: 400;
        text-align: center;
        color: #000000;   
        text-align: center;
    }
`

const StyledSeats = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 67px);
    align-items: center;
    justify-content: center;
    padding-left: 24px;
    padding-bottom: 130px;
`