import Draggable from "react-draggable";
import { NodeType } from "src/App";
import "./Node.css";

export default function Node({ node }: { node: NodeType }) {
  return (
    <>
      <Draggable>
        <div className={"node"} id={"sin_city"}>
          {node.id}
        </div>
      </Draggable>
    </>
  );
}
