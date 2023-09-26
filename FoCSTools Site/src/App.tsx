import "./App.css";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";
import DFA from "./pages/DFA";
import TuringMachine from "./pages/TuringMachine";
import { useState, useEffect } from "react";

export default function App() {
  const paths: { [id: string]: JSX.Element } = {
    "/placeholder": <Test />,
    "/DFA": <DFA />,
    "/TuringMachine": <TuringMachine />,
  };

  const [component, setComponent] = useState<JSX.Element>(<Test />);

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
