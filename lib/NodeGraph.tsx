import React, { useState, useRef } from "react";
import { computeOutOffsetByIndex, computeInOffsetByIndex } from "./Util";
import { Spline } from "./Spline";
import { Node } from "./Node";
import {
  nodeIDs,
  nodePositionByID,
  connectionParamsByID,
  inputIDsByNodeID,
  inputStateByID,
  outputStateByID,
  connectionIDs,
} from "./store";
import { useRecoilState, selectorFamily, useRecoilValue } from "recoil";
import { motion } from "framer-motion";

function Nodes() {
  const allNodeIDs = useRecoilValue(nodeIDs);

  return (
    <>
      {allNodeIDs.map((id) => {
        return <Node nodeID={id} key={id} />;
      })}
    </>
  );
}

const connectionGeometryByID = selectorFamily({
  key: "connectionGeometry",
  get: (id) => ({ get }) => {
    const params = get(connectionParamsByID(id));

    const fromNode = get(nodePositionByID(params.fromNode));
    const toNode = get(nodePositionByID(params.toNode));

    const toField = get(inputStateByID(params.inputField));
    const fromField = get(outputStateByID(params.outputField));

    let splinestart = computeOutOffsetByIndex(
      fromNode.x,
      fromNode.y,
      fromField.index
    );
    let splineend = computeInOffsetByIndex(toNode.x, toNode.y, toField.index);

    return { start: splinestart, end: splineend };
  },
});

function Connection({ connectionID }) {
  const { start, end } = useRecoilValue(connectionGeometryByID(connectionID));

  return (
    <Spline
      start={start}
      end={end}
      //   mousePos={mousePos}
      //   onRemove={() => handleRemoveConnector(connector)}
    />
  );
}

function Connections() {
  const allConnectionIDs = useRecoilValue(connectionIDs);

  const svgRef = useRef();
  return (
    <svg
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: 9000,
      }}
      ref={svgRef}
    >
      {allConnectionIDs.map((id) => {
        return <Connection connectionID={id} key={id} />;
      })}
    </svg>
  );
}

export const NodeGraph = (
  {
    //   data,
    //   onNodeDeselect,
    //   onNodeMove,
    //   onNodeStartMove,
    //   onNodeSelect,
    //   onNewConnector,
    //   onRemoveConnector,
  }
) => {
  //   const [dataS, setDataS] = useState(data);
  const [source, setSource] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const svgRef = useRef();

  //   const onMouseMove = (e) => {
  //     let [pX, pY] = [e.clientX, e.clientY];
  //     e.stopPropagation();
  //     e.preventDefault();

  //     const svgRect = svgRef.current.getBoundingClientRect();
  //     // console.log(svgRect);
  //     setMousePos((old) => {
  //       return {
  //         ...old,
  //         ...{ x: pX - svgRect.left, y: pY - svgRect.top },
  //       };
  //     });
  //   };

  //   const onMouseUp = (e) => {
  //     setDragging(false);
  //   };

  //   const handleNodeStart = (nid) => {
  //     onNodeStartMove(nid);
  //   };

  //   const handleNodeStop = (nid, pos) => {
  //     onNodeMove(nid, pos);
  //   };

  //   const handleNodeMove = (idx, pos) => {
  //     let dataT = dataS;
  //     dataT.nodes[idx].x = pos.x;
  //     dataT.nodes[idx].y = pos.y;

  //     // console.log(dataT);
  //     // console.log({...dataS,...dataT});
  //     setDataS((old) => {
  //       return {
  //         ...old,
  //         ...dataT,
  //       };
  //     });
  //   };

  //   const handleStartConnector = (nid, outputIdx) => {
  //     let newSrc = [nid, outputIdx];

  //     setDragging(true);
  //     setSource(newSrc); // Not sure if this will work...
  //   };

  //   const handleCompleteConnector = (nid, inputIdx) => {
  //     if (dragging) {
  //       let fromNode = getNodeById(data.nodes, source[0]);
  //       let fromPinName = fromNode.fields.out[source[1]].name;
  //       let toNode = getNodeById(data.nodes, nid);
  //       let toPinName = toNode.fields.in[inputIdx].name;

  //       onNewConnector(fromNode.nid, fromPinName, toNode.nid, toPinName);
  //     }
  //     setDragging(false);
  //   };

  //   const handleRemoveConnector = (connector) => {
  //     if (onRemoveConnector) {
  //       onRemoveConnector(connector);
  //     }
  //   };

  //   const handleNodeSelect = (nid) => {
  //     if (onNodeSelect) {
  //       onNodeSelect(nid);
  //     }
  //   };

  //   const handleNodeDeselect = (nid) => {
  //     if (onNodeDeselect) {
  //       onNodeDeselect(nid);
  //     }
  //   };

  //   const computePinIdxfromLabel = (pins, pinLabel) => {
  //     let reval = 0;

  //     for (let pin of pins) {
  //       if (pin.name === pinLabel) {
  //         return reval;
  //       } else {
  //         reval++;
  //       }
  //     }
  //   };

  //   const getNodeById = (nodes, nid) => {
  //     let reval = 0;

  //     for (const node of nodes) {
  //       if (node.nid === nid) {
  //         return nodes[reval];
  //       } else {
  //         reval++;
  //       }
  //     }
  //   };

  //   let newConn = null;
  //   //   let i = 0;

  //   // console.log(dragging);
  //   if (dragging) {
  //     let sourceNode = getNodeById(dataS.nodes, source[0]);
  //     let connectorStart = computeOutOffsetByIndex(
  //       sourceNode.x,
  //       sourceNode.y,
  //       source[1]
  //     );
  //     let connectorEnd = {
  //       x: mousePos.x,
  //       y: mousePos.y,
  //     };

  //     // console.log(mousePos);
  //     newConn = <Spline start={connectorStart} end={connectorEnd} />;
  //   }

  let splineIdx = 0;

  return (
    // <TransformWrapper
    //   defaultScale={1}
    //   defaultPositionX={200}
    //   defaultPositionY={100}
    // >
    //   {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
    //     <>
    //       <Tools {...{ zoomIn, zoomOut, resetTransform }} />
    //       <TransformComponent>
    <motion.div
      className='full'
      //   className={dragging ? "dragging" : ""}
      //   onMouseMove={onMouseMove}
      //   onMouseUp={onMouseUp}
    >
      <Nodes />
      <Connections />
    </motion.div>
  );
};
