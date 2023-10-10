import Draggable from "react-draggable";
import { NodeType } from "src/App";
import "./Node.css";

export default function Node({
  id,
  order,
  outgoing,
  children,
}: { children?: JSX.Element } & NodeType) {
  console.log(outgoing);
  return (
    <>
      <Draggable>
        <div className={"node"} id={"sin city"}>
          {id}
          {order}

          {children}
        </div>
      </Draggable>
    </>
  );
}
