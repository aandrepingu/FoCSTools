import "./Landing.css";

export default function Landing({
  setComponent,
}: {
  setComponent: () => void;
}) {
  return (
    <>
      <div className="landing">
        <img
          src="logo.svg"
          className="landinglogo"
          onClick={() => {
            window.location.href = "/Test";
            setComponent();
          }}
        />
      </div>
    </>
  );
}
