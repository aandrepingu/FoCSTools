import { useState } from "react";
import "./Sidebar.css";
import { NodeType } from "src/pages/DFA";

export default function Sidebar({
  dispatch,
  setInputString,
  startTraverse,
  inputString,
}: {
  dispatch: React.Dispatch<{
    type: string;
    payload?: string | undefined;
  }>;
  inputString: string;
  setInputString: (e: string) => void;
  startTraverse: () => void;
}) {
  const [show, setShow] = useState(true);
  //
  function handleClick() {
    setShow(!show);
  }
  const processInputString = () => {
    if (inputString.length === 0) return;
    for (const c of inputString) {
      if (c != "0" && c != "1") {
        alert("Input string must only consist of 1s and 0s!");
        return;
      }
    }
  };
  return (
    <>
      <div className="flexBox">
        {show && (
          // <div className="sidebar" style={{ paddingLeft: "0px" }}>
          // <div style={{ paddingTop: "4px" }}>
          <div
            style={{
              display: "flex",
              backgroundColor: "gray",
              width: "max-content",
              flexDirection: "column",
            }}
          >
            <button
              className="sidebar_Button"
              onClick={() => {
                dispatch({ type: "add_node" });
              }}
            >
              Add Node
            </button>
            <button
              className="sidebar_Button"
              onClick={() => {
                dispatch({ type: "add_start_node" });
              }}
            >
              Add Start Node
            </button>
            <button
              className="sidebar_Button"
              onClick={() => {
                dispatch({ type: "add_end_node" });
              }}
            >
              Add End Node
            </button>
            <button
              className="sidebar_Button"
              onClick={() => {
                dispatch({ type: "clear" });
              }}
            >
              Clear
            </button>
            <button
              className="sidebar_Button"
              onClick={() => {
                startTraverse();
              }}
            >
              {inputString.length === 0 ? "Input String:" : "Run Input String"}
              <input
                onClick={(e) => {
                  e.stopPropagation();
                }}
                onChange={(e) => {
                  setInputString(e.target.value);
                }}
              />
            </button>
          </div>
        )}

        <div>
          <button className="sidebar_Minimize_Button" onClick={handleClick}>
            <img
              style={{
                width: "100",
                height: "100px",
                position: "relative",
                left: "-20px",
              }}
              src="./minimize.png"
              alt="my image"
            />
          </button>
        </div>
      </div>
    </>
  );
}
