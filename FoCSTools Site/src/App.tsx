import "./App.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
}
