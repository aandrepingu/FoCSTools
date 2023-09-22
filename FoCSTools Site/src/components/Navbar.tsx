import "./Navbar.css";

export default function Navbar() {
  return (
    <>
      <div className="navbar">
        <div
          className="grid"
          style={{ paddingLeft: "20px", gridTemplateColumns: "1fr 1fr" }}
        >
          <div className="flex">LOGO</div>
          <div className="flex" style={{ justifyContent: "center" }}>
            TITLE
          </div>
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
