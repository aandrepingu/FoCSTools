//import Navbar from "../components/Navbar";
import { NodeType } from "src/App";

export default function Test({ nodes }: { nodes: { [id: string]: NodeType } }) {
  return <>{nodes.forEach((node) => {})}</>;
}
