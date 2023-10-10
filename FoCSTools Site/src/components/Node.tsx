import Draggable from "react-draggable";
import { NodeType } from "src/pages/DFA";
import "./Node.css";
import { useState } from "react";

export default function Node({ node }: { node: NodeType }) {
  const [name, setName] = useState("name");
  return (
    <>
      <Draggable>
        <div className={"node"} id={node.id}>
          {name}
        </div>
      </Draggable>
    </>
  );
}
