import "./Navbar.css";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <img
          src="logo.svg"
          className="logo"
          style={{ paddingLeft: "5px" }}
          onClick={() => {
            window.location.href = "/Home";
          }}
        />
        <div className="flex" style={{ justifyContent: "center", gap: "20px" }}>
          <Link to="/DFA">
            <button className="DFA">DFA</button>
          </Link>
          <Link to="/CFG">
            <button className="CFG">CFG</button>
          </Link>
          <Link to="/TuringMachine">
            <button className="TU">Turing</button>
          </Link>
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
