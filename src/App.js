import Home from "./Home";
import Sessions from "./Sessions";
import Success from "./Success";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Seats from "./Seats";
import GlobalStyle from "./GlobalStyle";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sessoes/:idFilme" element={<Sessions />} />
                <Route path="/assentos/:idSessao" element={<Seats />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes>
            <GlobalStyle />
        </BrowserRouter>
    );
}