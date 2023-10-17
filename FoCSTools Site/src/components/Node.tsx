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
        <div>
          {isEditing && <div className={"editBox"}>
            Edit<br/>
            <button className={"editButton"}>Change 0</button>
            <button className={"editButton"}>Change 1</button><br/>
            <button className={"editButton"}>Delete</button>
            <button className={"editButton"}>Change Name</button>
          </div>}
          <div className={"node"} id={node.id}>
            <div
              style={{
                position: "absolute",
                right: "5px",
                top: "8px",
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
