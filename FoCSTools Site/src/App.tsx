import "./App.css";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";
import DFA from "./pages/DFA";
import Landing from "./pages/Landing";
import TuringMachine from "./pages/TuringMachine";
import { useState, useEffect } from "react";

export default function App() {
  const paths: { [id: string]: JSX.Element } = {
    "/placeholder": <Test />,
    "/DFA": <DFA />,
    "/TuringMachine": <TuringMachine />,
    "/Landing": <Landing />,
  };

  const [component, setComponent] = useState<JSX.Element>(<Landing />);

  useEffect(() => {
    const path: string = window.location.pathname;
    if (path in paths) {
      setComponent(paths[path]);
    } else {
      setComponent(<Landing />);
    }
  }, []);
  return (
    <>
      <Navbar />
      {component}
    </>
  );
}
