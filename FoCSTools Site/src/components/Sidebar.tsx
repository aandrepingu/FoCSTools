import { useState } from "react";
import "./Sidebar.css";

export default function Sidebar({
  dispatch,
}: {
  dispatch: React.Dispatch<{
    type: string;
    payload?: string | undefined;
  }>;
}) {
  const [show, setShow] = useState(true);
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
          </div>

          //  </div>
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
