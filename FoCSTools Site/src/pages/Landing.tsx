import "./Landing.css";

export default function Landing() {
  return (
    <>
      <img
        src="logo.svg"
        className="landinglogo"
        onClick={() => {
          window.location.href = "/Test";
        }}
      />
    </>
  );
}
