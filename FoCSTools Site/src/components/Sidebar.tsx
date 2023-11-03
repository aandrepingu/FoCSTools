import { useState } from "react";
import "./Sidebar.css";

type ID = string;

export interface NodeType {
  id: ID;
  start?: boolean;
  end?: boolean;
  incoming: ID[];
  outgoing: {
    0: ID | null;
    1: ID | null;
  };
}

export default function Sidebar({
  dispatch, 
  inputString,
  setInputString
}: {
  dispatch: React.Dispatch<{
    type: string;
    payload?: string | undefined;
  }>;
  inputString: string;
  setInputString: (e: string) => void;
}) {
  const [show, setShow] = useState(true);
  //
  function handleClick() {
    setShow(!show);
  }
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
              flexDirection: "column"
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
            <button className="sidebar_Button" onClick={() => {
              console.log(inputString);
            }}>
              Input String:
              <input onChange={(e) => {setInputString(e.target.value)}}/>
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
