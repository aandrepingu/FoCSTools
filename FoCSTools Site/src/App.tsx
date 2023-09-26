import "./App.css";
import Navbar from "./components/Navbar";
import Test from "./pages/Test";
import { useState, useEffect } from 'react';

export default function App() {
  const paths = {
    "/placeholder": <Test />,
  };

  let [component, setComponent] = useState(<Test />);

  useEffect(() => {
    const path = window.location.pathname;
    if (path in paths) {
      setComponent(paths[path]);
    } else {
      setComponent(<Test />);
    }
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
}