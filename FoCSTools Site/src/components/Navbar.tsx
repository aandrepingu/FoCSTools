import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <img src="logo.svg" className="logo" style={{ paddingLeft: "5px" }} />
        <div className="flex" style={{ justifyContent: "center", gap: "20px" }}>
          <button
            className="DFA"
            onClick={()=>{}}
          >
            DFA
          </button>
          <button
            className="CFG"
            onClick={() => {}}
          >
            CFG
          </button>
          <button
            className="TU"
            onClick={() => {}}
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
