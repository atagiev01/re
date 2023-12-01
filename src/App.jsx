import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MoreInfo from "./components/MoreInfo";
import ModalReliefFund from "./components/Modal/ModalReliefFund"
import './css/style.css'

import Cards from "./components/Cards";
import Admin from "./components/Admin";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<Home />} />
          <Route path="/modal/:id" element={<MoreInfo />} />
          <Route path="/cards" element={<Cards/>} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/help" element={<ModalReliefFund/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
