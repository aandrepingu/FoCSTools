import "./App.css";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
=======
import Test from "./pages/Test";
import DFA from "./pages/DFA";
import TuringMachine from "./pages/TuringMachine";
import { useState, useEffect } from "react";

>>>>>>> d1b1bb648b65bafc3548fe4b6118e36e46dd12bc
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
<<<<<<< HEAD
      <div> hello</div>
=======
      {component}
>>>>>>> d1b1bb648b65bafc3548fe4b6118e36e46dd12bc
    </>
  );
}
