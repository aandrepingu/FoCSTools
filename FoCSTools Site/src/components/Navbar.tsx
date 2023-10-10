import "./Navbar.css";
import { BrowserRouter as Router, Route, Link, BrowserRouter } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <img src="logo.svg" className="logo" style={{ paddingLeft: "5px" }} onClick={() => {
            window.location.href = "/Home";
          }}/>
        <div className="flex" style={{ justifyContent: "center", gap: "20px" }}>
            <button
              className="DFA"
            >
              <Link to="/DFA">DFA</Link>
            </button>
            <button
              className="CFG"
            >
              <Link to="/CFG">CFG</Link>
            </button>
            <button
              className="TU"
            >
              <Link to="/TuringMachine">Turing</Link>
            </button>
        </div>
        <div
          className="flex"
          style={{ justifyContent: "flex-end", paddingRight: "40px" }}
        >
          save
        </div>
      </div>
    </>
  );
}
