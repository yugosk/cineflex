import Home from "./Home";
import Sessions from "./Sessions";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyle";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sessoes/:idFilme" element={<Sessions />} />
              <Route path="/assentos/:idSessao" element={<Seats />} />  
            </Routes>
        </BrowserRouter>
    );
}