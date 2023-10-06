import "./App.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Test from "../pages/Test";
import DFA from "../pages/DFA";
import Landing from "../pages/Landing";
import TuringMachine from "../pages/TuringMachine";
import { useState, useEffect } from "react";

export type GraphType = "DFA" | "CFG" | "TU";

export default function App() {
  const [path, setPath] = useState("/Landing");
  const [graphType, setGraphType] = useState<GraphType>("DFA");

  const paths: { [id: string]: JSX.Element } = {
    "/Test": <Test />,
    "/DFA": <DFA />,
    "/TuringMachine": <TuringMachine />,
    "/Landing": <Landing setComponent={() => setPath("/Test")} />,
  };

  useEffect(() => {
    const windowPath: string = window.location.pathname;
    if (windowPath in paths) {
      setPath(windowPath);
    } else {
      setPath("/Landing");
    }
  }, []);

  return (
    <div>
      <div>
        <Navbar graphType={graphType} setGraphType={setGraphType} />
        {paths[path]}
      </div>
      <div>{path !== "/Landing" && <Sidebar />}</div>
    </div>
  );
}
