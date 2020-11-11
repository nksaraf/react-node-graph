import Head from "next/head";
import React, { useState } from "react";
import { RecoilRoot, useSetRecoilState } from "recoil";
import { NodeGraph } from "../lib/NodeGraph";

import { RecoilLogger } from "../lib/RecoilLogger";
import { exampleGraph, writeGraph } from "../lib/exampleGraph";
import { motion } from "framer-motion";

const App = () => {
  const write = useSetRecoilState(writeGraph);
  React.useEffect(() => {
    write(exampleGraph);
  }, [write]);

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

  return <NodeGraph />;
};

export default function Index() {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
}
