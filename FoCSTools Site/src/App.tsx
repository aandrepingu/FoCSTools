import "./App.css";
import Navbar from "./components/Navbar";
import Canvas from "./components/Canvas";

export default function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Canvas />
      </div>
    </div>
  );
}
