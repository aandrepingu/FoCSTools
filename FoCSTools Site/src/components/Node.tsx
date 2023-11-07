import Draggable from "react-draggable";
import { NodeType } from "src/pages/DFA";
import "./Node.css";
import { useState } from "react";
import { useXarrow } from "react-xarrows";

export default function Node({
  node,
  dispatch,
  onClick,
  setChanging0,
  setChanging1,
  changing,
  highlightedNode,
}: {
  node: NodeType;
  dispatch: React.Dispatch<{
    type: string;
    payload?: string | undefined;
  }>;
  onClick: () => void;
  setChanging0: React.Dispatch<React.SetStateAction<string | null>>;
  setChanging1: React.Dispatch<React.SetStateAction<string | null>>;
  changing: boolean;
  highlightedNode: boolean;
}) {
  const [name, setName] = useState("name");
  const [isEditing, setIsEditing] = useState(false);
  const [beforeUnderscore, setBeforeUnderscore] = useState(name);
  const [afterUnderscore, setAfterUnderscore] = useState("");
  const updateXarrow = useXarrow();

  function splitName(word: string) {
    const nameSplit = word.split("_");
    if (nameSplit.length === 2) {
      setBeforeUnderscore(nameSplit[0]);
      setAfterUnderscore(nameSplit[1]);
    } else {
      setBeforeUnderscore(word);
      setAfterUnderscore("");
    }
  }
  function noop() {}

  return (
    <>
      <Draggable onDrag={updateXarrow} onStop={updateXarrow}>
        <div onClick={changing ? onClick : noop}>
          {isEditing && (
            <div className={"editBox"}>
              Name:
              <br />
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  splitName(e.target.value);
                }}
                style={{ width: "100px" }}
              />
              <br />
              Edit:
              <br />
              <div className={"editButtons"}>
                <button
                  className={"editButton"}
                  onClick={() => {
                    setChanging0(node.id);
                  }}
                >
                  Change 0
                </button>
                <button
                  className={"editButton"}
                  onClick={() => {
                    setChanging1(node.id);
                  }}
                >
                  Change 1
                </button>
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
          <div
            className={"node"}
            id={node.id}
            style={{
              backgroundColor: highlightedNode
                ? "brown"
                : changing
                ? "#F5BF03"
                : node.start
                ? "#4ed964"
                : node.end
                ? "#ff443b"
                : "#4a17f0",
            }}
          >
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
