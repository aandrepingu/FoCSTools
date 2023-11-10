import Node from "../components/Node";
import { useEffect, useReducer, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Xarrow, { Xwrapper } from "react-xarrows";

type ID = string;

export interface NodeType {
  id: ID;
  start?: boolean;
  end?: boolean;
  incoming: ID[];
  outgoing: {
    0: ID;
    1: ID;
  };
}

const nodeReducer = (
  state: Map<ID, NodeType>,
  action: { type: string; payload?: ID | number; target?: ID; source?: ID }
): Map<ID, NodeType> => {
  if (action.type === "add_start_node") {
    if (Array.from(state.values()).some((node) => node.start)) {
      alert("There can only be one start node");
      return state;
    }
  }
  if (
    action.type === "add_node" ||
    action.type === "add_start_node" ||
    action.type === "add_end_node"
  ) {
    const uniqueID = uuid();
    const newNode: NodeType = {
      id: uniqueID,
      incoming: [],
      outgoing: { 0: uniqueID, 1: uniqueID },
      start: action.type === "add_start_node",
      end: action.type === "add_end_node",
    };
    const newState = new Map(state);
    newState.set(uniqueID, newNode);
    return newState;
  } else if (action.type === "link_node") {
    if (!action.source || !action.target) {
      console.log("no source or target in action", action);
      return state;
    }
    if (action.payload === undefined || typeof action.payload !== "number") {
      console.log("no payload on link", action);
      return state;
    }
    const newState = new Map(state);
    const sourceNode = newState.get(action.source);
    if (!sourceNode) {
      console.log("source node not found");
      return state;
    }
    const newOutgoing = {
      ...sourceNode.outgoing,
      [action.payload]: action.target,
    };
    newState.set(action.source, { ...sourceNode, outgoing: newOutgoing });
    return newState;
  } else if (action.type === "remove_node") {
    if (!action.payload || typeof action.payload !== "string") {
      return state;
    }
    const newState = new Map(state);
    if (!newState.has(action.payload)) {
      return state;
    }

    newState.get(action.payload)?.incoming.forEach((id) => {
      const node = newState.get(id);
      if (!node) {
        return state;
      }
      if (node?.outgoing[0] === action.payload) {
        node.outgoing[0] = node.id;
      }
      if (node?.outgoing[1] === action.payload) {
        node.outgoing[1] = node.id;
      }
    });
    newState.delete(action.payload);
    return newState;
  } else if (action.type === "clear") {
    const newState = new Map(state);
    newState.clear();
    return newState;
  }
  return state;
};

export default function DFA() {
  const [nodeState, dispatch] = useReducer(
    nodeReducer,
    new Map<ID, NodeType>()
  );
  const [changing0, setChanging0] = useState<ID | null>(null);
  const [changing1, setChanging1] = useState<ID | null>(null);
  const [inputString, setInputString] = useState("");
  const [traversing, setTraversing] = useState(false);
  const [speed, setSpeed] = useState(0);
  useEffect(() => {
    console.log(nodeState, "CHANGING");
  }, [nodeState]);
  const [highlightedNode, setHighlightedNode] = useState<ID | null>(null);
  const startNode = Array.from(nodeState.values()).find((node) => node.start);
  const timerRef = useRef<number | null>(null);

  function startTraverse() {
    if (inputString.length === 0) {
      alert("No input string");
      return;
    }
    for (const c of inputString) {
      if (c != "0" && c != "1") {
        alert("Input string must only consist of 1s and 0s!");
        return;
      }
    }
    if (!startNode) {
      alert("No start node");
      return;
    }
    setHighlightedNode(startNode.id);
    setTraversing(true);
    setSpeed(1000);
  }

  function changeSpeed(up: boolean) {
    if (up) {
      setSpeed(speed / 2);
    } else {
      setSpeed(speed * 2);
    }
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (highlightedNode) {
        const node = nodeState.get(highlightedNode);
        if (!node) {
          setTraversing(false);
          return;
        }
        if (node.outgoing[0] && inputString[0] === "0") {
          setHighlightedNode(node.outgoing[0]);
          setInputString(inputString.slice(1));
        } else if (node.outgoing[1] && inputString[0] === "1") {
          setHighlightedNode(node.outgoing[1]);
          setInputString(inputString.slice(1));
        } else if (inputString.length === 0 && node.end) {
          alert("Accepted");
          setHighlightedNode(null);
          setTraversing(false);
        } else {
          alert("Rejected");
          setHighlightedNode(null);
          setTraversing(false);
        }
      }
    }, speed);
  }, [highlightedNode, inputString]);

  return (
    <>
      <Navbar />
      <Sidebar
        dispatch={dispatch}
        inputString={inputString}
        setInputString={setInputString}
        startTraverse={startTraverse}
        changeSpeed={changeSpeed}
        traversing={traversing}
      />
      <Xwrapper>
        {Array.from(nodeState.values()).map((node) => (
          <Node
            node={node}
            onClick={() => {
              if (!changing0 && !changing1) return;
              dispatch({
                type: "link_node",
                payload: changing0 ? 0 : changing1 ? 1 : undefined,
                source: changing0 || changing1 || undefined,
                target: node.id,
              });
              setChanging0(null);
              setChanging1(null);
            }}
            dispatch={dispatch}
            setChanging0={setChanging0}
            setChanging1={setChanging1}
            changing={
              (changing0 !== null && changing0 !== node.id) ||
              (changing1 !== null && changing1 !== node.id)
            }
            highlightedNode={
              highlightedNode ? highlightedNode === node.id : false
            }
          />
        ))}
        {Array.from(nodeState.values()).map((node) => {
          return (
            <>
              {node.outgoing[0] && node.outgoing[0] !== node.id && (
                <Xarrow
                  start={node.id}
                  end={node.outgoing[0]}
                  labels={node.outgoing[0] !== node.outgoing[1] ? "0" : "0,1"}
                  path={"straight"}
                />
              )}
              {node.outgoing[1] && node.outgoing[1] !== node.id && (
                <Xarrow
                  start={node.id}
                  end={node.outgoing[1]}
                  labels={node.outgoing[0] !== node.outgoing[1] ? "1" : "0,1"}
                  path={"straight"}
                />
              )}
            </>
          );
        })}
      </Xwrapper>
    </>
  );
}
