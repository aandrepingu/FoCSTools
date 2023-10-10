import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import DFA from "./pages/DFA";
import Landing from "./pages/Landing";
import TuringMachine from "./pages/TuringMachine";
import CFG from "./pages/CFG"
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
//export type GraphType = "DFA" | "CFG" | "TU";

export default function App() {
  /*const [path, setPath] = useState("/Landing");
  const [graphType, setGraphType] = useState<GraphType>("DFA");

  const paths: { [id: string]: JSX.Element } = {
    "/Test": <Test />,
    "/DFA": <DFA />,
    "/TuringMachine": <TuringMachine />,
    "/Landing": <Landing setComponent={() => setPath("/Test")} />,
  }
  useEffect(() => {
    const windowPath: string = window.location.pathname;
    if (windowPath in paths) {
      setPath(windowPath);
    } else {
      setPath("/Landing");
    }
  }, []);
  */
  /*const [path, setPath] = useState("/Landing");
  const state: {[id: string]: JSX.Element} = {
    "/Test": <Test />,
    "/Landing": <Landing/>
  }
  useEffect(() => {
    const windowPath: string = window.location.pathname;
    if(windowPath in state){
      setPath(windowPath);
    } else { 
      setPath("/Landing");
    }
  }, []);*/

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" Component={Landing}/>
          <Route path="/Home" Component={Home} />
          <Route path="/DFA" Component={DFA} />
          <Route path="/CFG" Component={CFG} />
          <Route path="/TuringMachine" Component={TuringMachine} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
