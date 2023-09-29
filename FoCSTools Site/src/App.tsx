import "./App.css";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";
import DFA from "./pages/DFA";
import TuringMachine from "./pages/TuringMachine";
import { useState, useEffect } from "react";

export type GraphType = "DFA" | "CFG" | "TU";

export default function App() {
  const paths: { [id: string]: JSX.Element } = {
    "/placeholder": <Test />,
    "/DFA": <DFA />,
    "/TuringMachine": <TuringMachine />,
  };

  const [component, setComponent] = useState<JSX.Element>(<Test />);
  // const [graphType, setGraphType] = useState<GraphType>("DFA");

  useEffect(() => {
    const path: string = window.location.pathname;
    if (path in paths) {
      setComponent(paths[path]);
    } else {
      setComponent(<Test />);
    }
  }, []);
  return (
    <>
      <Navbar />
      {component}
    </>
  );
}
