//import Navbar from "../components/Navbar";
import Node from "../components/Node";
import { NodeType } from "src/App";

export default function Test({ nodes }: { nodes: NodeType[] }) {
  return (
    <>
      {nodes.map((node, ind) => {
        <Node {...node} />;
      })}
    </>
  );
}
