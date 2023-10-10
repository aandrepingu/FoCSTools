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
          <div className="sidebar" style={{ paddingLeft: "0px" }}>
            <div style={{ paddingTop: "4px" }}>
              <button
                className="sidebar_Button"
                onClick={() => dispatch({ type: "add_node" })}
              >
                1
              </button>
              <button className="sidebar_Button">2</button>
              <button className="sidebar_Button">3</button>
              <button className="sidebar_Button">4</button>
            </div>
            <div style={{ paddingTop: "3px" }}>
              <button className="sidebar_Button">1</button>
              <button className="sidebar_Button">2</button>
              <button className="sidebar_Button">3</button>
              <button className="sidebar_Button">4</button>
            </div>
            <div style={{ paddingTop: "3px" }}>
              <button className="sidebar_Button">1</button>
              <button className="sidebar_Button">2</button>
              <button className="sidebar_Button">3</button>
              <button className="sidebar_Button">4</button>
            </div>
            <div style={{ paddingTop: "3px" }}>
              <button className="sidebar_Button">1</button>
              <button className="sidebar_Button">2</button>
              <button className="sidebar_Button">3</button>
              <button className="sidebar_Button">4</button>
            </div>
            <div style={{ paddingTop: "3px" }}>
              <button className="sidebar_Button">1</button>
              <button className="sidebar_Button">2</button>
              <button className="sidebar_Button">3</button>
              <button className="sidebar_Button">4</button>
            </div>
            <div style={{ paddingTop: "3px" }}>
              <button className="sidebar_Button">1</button>
              <button className="sidebar_Button">2</button>
              <button className="sidebar_Button">3</button>
              <button className="sidebar_Button">4</button>
            </div>
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
