import "./Landing.css";

export default function Landing() {
  return (
    <>
      <div className="landing">
        <img
          src="logo.svg"
          className="landinglogo"
          onClick={() => {
            window.location.href = "/DFA";
          }}
        />
      </div>
    </>
  );
}
