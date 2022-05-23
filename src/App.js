import Home from "./Home";
import Sessions from "./Sessions";
import Success from "./Success";
import { BrowserRouter, Routes, Route, useNa } from "react-router-dom";
import Seats from "./Seats";
import "./assets/components/reset.css"
import GlobalStyle from "./GlobalStyle";

export default function App() {
    //<Route path="/asd" element={<Home />} />
    //<Route path="/sessoes/:idFilme" element={<Sessions />} />
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Seats />} />
            </Routes>
        </BrowserRouter>
    );
    //<Route path="/sucesso" element={<Success />} /> 
}