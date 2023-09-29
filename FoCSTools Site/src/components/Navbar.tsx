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
        <div
          className="flex"
          style={{ paddingLeft: "40px", paddingTop: "20px" }}
        ></div>
        <div className="flex" style={{ justifyContent: "space-between" }}>
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
