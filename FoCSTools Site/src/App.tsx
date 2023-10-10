import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import DFA from "./pages/DFA";
import Landing from "./pages/Landing";
import TuringMachine from "./pages/TuringMachine";
import CFG from "./pages/CFG";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect, useReducer } from "react";
import { v4 as uuid } from "uuid";


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
  action: { type: string; payload?: ID }
): Map<ID, NodeType> => {
  if (action.type === "add_node") {
    console.log("adding_node");
    const uniqueID = uuid();
    const newNode: NodeType = {
      id: uniqueID,
      incoming: [],
      outgoing: { 0: null, 1: null },
    };
    const newState = new Map(state);
    newState.set(uniqueID, newNode);
    console.log(newState);
    return newState;
  } else if (action.type === "remove_node") {
    if (!action.payload) {
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
  }
  return state;
};

export default function App() {
  const [path, setPath] = useState("/Landing");
  const [graphType, setGraphType] = useState<GraphType>("DFA");
  const [nodeState, dispatch] = useReducer(
    nodeReducer,
    new Map<ID, NodeType>()
  );


  useEffect(() => {
    const windowPath: string = window.location.pathname;
    if (windowPath in paths) {
      setPath(windowPath);
    } else {
      setPath("/Landing");
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" Component={Landing}/>
          <Route path="/Home" Component={Home} />
          <Route path="/DFA" Component={DFA} />
          <Route path="/CFG" Component={CFG} />
          <Route path="/TuringMachine" Component={TuringMachine} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
