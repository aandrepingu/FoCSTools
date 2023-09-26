import "./App.css";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
    </>
  );
}
/* 
import './App.css';
import NavBar from './components/Navbar';
import Home from './pages/Home'
import { useState, useEffect } from 'react';

function App() {
  const paths = {
    "/placeholder": <Home />,
  };

  let [component, setComponent] = useState(<Home />);

  useEffect(() => {
    const path = window.location.pathname;
    if (path in paths) {
      setComponent(paths[path]);
    } else {
      setComponent(<Home />);
    }
  }, []);
  return (
    <>
      <NavBar />
      {component}
    </>

  );
}

export default App
*/