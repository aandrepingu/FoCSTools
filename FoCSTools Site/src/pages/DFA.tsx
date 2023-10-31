import Node from "../components/Node";
import { useEffect, useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Xarrow, { useXarrow, Xwrapper } from "react-xarrows";

type ID = string;

export interface NodeType {
  id: ID;
  start?: boolean;
  end?: boolean;
  incoming: ID[];
  outgoing: {
    0: ID | null;
    1: ID | null;
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
      outgoing: { 0: null, 1: null },
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
        node.outgoing[0] = null;
      }
      if (node?.outgoing[1] === action.payload) {
        node.outgoing[1] = null;
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

  useEffect(() => {
    console.log(nodeState, "CHANGING");
  }, [nodeState]);

  return (
    <>
      <Navbar />
      <Sidebar dispatch={dispatch} />
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
              (changing0 != null && changing0 != node.id) ||
              (changing1 != null && changing1 != node.id)
            }
          />
        ))}
        {Array.from(nodeState.values()).map((node) => {
          return (
            <>
              {node.outgoing[0] && (
                <Xarrow
                  start={node.id} //can be react ref
                  end={node.outgoing[0]} //or an id
                  labels={node.outgoing[0] !== node.outgoing[1] ? "0" : "0,1"}
                />
              )}
              {node.outgoing[1] && (
                <Xarrow
                  start={node.id} //can be react ref
                  end={node.outgoing[1]} //or an id
                  labels={node.outgoing[0] !== node.outgoing[1] ? "1" : "0,1"}
                />
              )}
            </>
          );
        })}
      </Xwrapper>
    </>
  );
}
