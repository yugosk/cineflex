import styled from "styled-components";

export default function Header() {
    return (
        <StyledHeader>
            <h1>CINEFLEX</h1>
        </StyledHeader>
    );
}

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #c3cfd9;
    height: 67px;
    width: 100%;

    h1 {
        font-family: 'Roboto', sans-serif;
        font-size: 34px;
        font-weight: 400;
        color: #e8833a;
        text-align: center;
        line-heigth: 28px;  
    }
`