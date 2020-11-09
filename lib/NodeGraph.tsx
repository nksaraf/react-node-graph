import React, { useState, useRef } from "react";
import { computeOutOffsetByIndex, computeInOffsetByIndex } from "./Util";
import { Spline } from "./Spline";
import { Node } from "./Node";
import { visibleNodeIDs } from "./store";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

function Nodes({ nodeIDs }) {
  return (
    <>
      {nodeIDs.map((id) => {
        return <Node nodeId={id} key={id} />;
      })}
    </>
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
  const [nodeIDs] = useRecoilState(visibleNodeIDs);
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
      style={{ height: "100vh", position: "relative" }}
      //   className={dragging ? "dragging" : ""}
      //   onMouseMove={onMouseMove}
      //   onMouseUp={onMouseUp}
    >
      <Nodes nodeIDs={nodeIDs} />
      {/* <svg
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          zIndex: 9000,
        }}
        ref={svgRef}
      >
        {data.connections.map((connector) => {
          // console.log(data);
          // console.log(connector);
          let fromNode = getNodeById(data.nodes, connector.from_node);
          let toNode = getNodeById(data.nodes, connector.to_node);

          let splinestart = computeOutOffsetByIndex(
            fromNode.x,
            fromNode.y,
            computePinIdxfromLabel(fromNode.fields.out, connector.from)
          );
          let splineend = computeInOffsetByIndex(
            toNode.x,
            toNode.y,
            computePinIdxfromLabel(toNode.fields.in, connector.to)
          );

          return (
            <Spline
              start={splinestart}
              end={splineend}
              key={splineIdx++}
              mousePos={mousePos}
              onRemove={() => handleRemoveConnector(connector)}
            />
          );
        })}
        {newConn}
      </svg>
    </div> */}
      {/* //       </TransformComponent> */}
    </motion.div>
  );
};

function Tools({ zoomIn, zoomOut, resetTransform }) {
  return (
    <div className="tools">
      <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button>
      <button onClick={resetTransform}>x</button>
    </div>
  );
}
