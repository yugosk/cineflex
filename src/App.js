import Home from "./Home";
import Sessions from "./Sessions";
import Success from "./Success";
import { BrowserRouter, Routes, Route, useNa } from "react-router-dom";
import Seats from "./Seats";
import GlobalStyle from "./GlobalStyle";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/asd" element={<Home />} />
                <Route path="/sessoes/:idFilme" element={<Sessions />} />
                <Route path="/" element={<Seats />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes>
            <GlobalStyle />
        </BrowserRouter>
    );
}