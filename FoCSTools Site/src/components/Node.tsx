import Draggable from "react-draggable";
import { NodeType } from "src/pages/DFA";
import "./Node.css";
import { useState } from "react";

export default function Node({
  node,
  dispatch,
}: {
  node: NodeType;
  dispatch: React.Dispatch<{
    type: string;
    payload?: string | undefined;
  }>;
}) {
  const [name, setName] = useState("name");
  const [isEditing, setIsEditing] = useState(false);
  const [beforeUnderscore, setBeforeUnderscore] = useState(name);
  const [afterUnderscore, setAfterUnderscore] = useState("");

  function SplitName(word: string) {
    const nameSplit = word.split("_");
    if (nameSplit.length === 2) {
      setBeforeUnderscore(nameSplit[0]);
      setAfterUnderscore(nameSplit[1]);
    } else {
      setBeforeUnderscore(word);
      setAfterUnderscore("");
    }
  }

  return (
    <>
      <Draggable>
        <div>
          {isEditing && (
            <div className={"editBox"}>
              Name:
              <br />
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  SplitName(e.target.value);
                }}
                style={{ width: "100px" }}
              />
              <br />
              Edit:
              <br />
              <div className={"editButtons"}>
                <button className={"editButton"}>Change 0</button>
                <button className={"editButton"}>Change 1</button>
                <br />
                <button
                  className={"editButton"}
                  onClick={() =>
                    dispatch({ type: "remove_node", payload: node.id })
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          )}
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
            <div>
              <span style={{ color: "white" }}>{beforeUnderscore}</span>
              <span style={{ fontSize: "10px", color: "white" }}>
                {" "}
                {afterUnderscore}
              </span>
            </div>
          </div>
        </div>
      </Draggable>
    </>
  );
}
