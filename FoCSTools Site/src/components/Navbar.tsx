import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div style={{ width: "30px", height: "30px" }}>
          <img src="logo.svg" className="logo" />
        </div>
        <div className="flex" style={{ justifyContent: "center" }}>
          <button>1</button>
          <button>2</button>
          <button>3</button>
        </div>
        <div
          className="flex"
          style={{ justifyContent: "flex-end", paddingRight: "20px" }}
        >
          save
        </div>
      </div>
    </>
  );
}
