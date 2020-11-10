import Head from "next/head";
import React, { useState } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { NodeGraph } from "../lib/NodeGraph";

import { RecoilLogger } from "../lib/RecoilLogger";
import { exampleGraph, writeGraph } from "../lib/exampleGraph";

const App = () => {
  const write = useSetRecoilState(writeGraph);
  React.useEffect(() => {
    write(exampleGraph);
  }, [write]);
  //   const [state, setState] = useState(exampleGraph);

  //   const onNewConnector = (fromNode, fromPin, toNode, toPin) => {
  //     let connections = [
  //       ...state.connections,
  //       {
  //         from_node: fromNode,
  //         from: fromPin,
  //         to_node: toNode,
  //         to: toPin,
  //       },
  //     ];

  //     console.log({ ...state, ...connections });
  //     setState((old) => {
  //       return {
  //         ...old,
  //         connections: connections,
  //       };
  //     });
  //   };

  //   const onRemoveConnector = (connector) => {
  //     let connections = [...state.connections];
  //     connections = connections.filter((connection) => {
  //       return connection !== connector;
  //     });

  //     setState((old) => {
  //       return {
  //         ...old,
  //         connections: connections,
  //       };
  //     });
  //   };

  //   const onNodeMove = (nid, pos) => {
  //     console.log(`end move:`, nid, pos);
  //   };

  //   const onNodeStartMove = (nid) => {
  //     console.log(`start move:`, nid);
  //   };

  //   const handleNodeSelect = (nid) => {
  //     console.log(`node selected:`, nid);
  //   };

  //   const handleNodeDeselect = (nid) => {
  //     console.log(`node deselected:`, nid);
  //   };

  return (
    <NodeGraph
    //   data={state}
    //   onNodeMove={(nid, pos) => onNodeMove(nid, pos)}
    //   onNodeStartMove={(nid) => onNodeStartMove(nid)}
    //   onNewConnector={(n1, o, n2, i) => onNewConnector(n1, o, n2, i)}
    //   onRemoveConnector={(connector) => onRemoveConnector(connector)}
    //   onNodeSelect={(nid) => handleNodeSelect(nid)}
    //   onNodeDeselect={(nid) => handleNodeDeselect(nid)}
    />
  );
};

export default function Index() {
  return (
    <RecoilRoot>
      <RecoilLogger />
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
        />
      </Head>
      <App />
    </RecoilRoot>
  );
}
