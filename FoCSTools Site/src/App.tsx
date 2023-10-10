import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DFA from "./pages/DFA";
import Landing from "./pages/Landing";
import TuringMachine from "./pages/TuringMachine";
import CFG from "./pages/CFG";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" Component={Landing} />
          <Route path="/Home" Component={Home} />
          <Route path="/DFA" Component={DFA} />
          <Route path="/CFG" Component={CFG} />
          <Route path="/TuringMachine" Component={TuringMachine} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
