//import Navbar from "../components/Navbar";
import { NodeType } from "src/App";
import Node from "../components/Node";

type ID = string;

export default function Test({ nodes }: { nodes: Map<ID, NodeType> }) {
  return (
    <>
      {Array.from(nodes.values()).map((node) => (
        <Node node={node} />
      ))}
    </>
  );
}
