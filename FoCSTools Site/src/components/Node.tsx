import Draggable from "react-draggable";
import { NodeType } from "src/pages/DFA";
import "./Node.css";
import { useState } from "react";

export default function Node({ node }: { node: NodeType }) {
  const [name, setName] = useState("name");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Draggable>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {isEditing && <div className={"editBox"}>hi</div>}
          <div className={"node"} id={node.id}>
            <div
              style={{
                position: "absolute",
                right: "5px",
                top: isEditing ? "80px" : "8px",
                cursor: "pointer",
              }}
              onClick={() => {
                setIsEditing(!isEditing);
              }}
            >
              <div className={"edit"}>e</div>
            </div>

            {name}
          </div>
        </div>
      </Draggable>
    </>
  );
}
