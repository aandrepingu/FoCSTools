import "./Navbar.css";
import { GraphType } from "src/App";

export default function Navbar({
  graphType,
  setGraphType,
}: {
  graphType: GraphType;
  setGraphType: (graphType: GraphType) => void;
}) {
  return (
    <>
      <div className="navbar">
        <img src="logo.svg" className="logo" style={{ paddingLeft: "5px" }} />
        <div className="flex" style={{ justifyContent: "center", gap: "20px" }}>
          <button
            className={graphType === "DFA" ? "button-selected" : undefined}
            onClick={() => {
              setGraphType("DFA");
            }}
          >
            DFA
          </button>
          <button
            className={graphType === "CFG" ? "button-selected" : undefined}
            onClick={() => {
              setGraphType("CFG");
            }}
          >
            CFG
          </button>
          <button
            className={graphType === "TU" ? "button-selected" : undefined}
            onClick={() => {
              setGraphType("TU");
            }}
          >
            Turing
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
