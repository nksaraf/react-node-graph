import React from "react";
import { Spline } from "./Spline";
import { selectorFamily, useRecoilValue } from "recoil";
import {
  connectionParamsByID,
  nodePositionByID,
  inputStateByID,
  outputStateByID,
} from "./store";
import { computeOutOffsetByIndex, computeInOffsetByIndex } from "./utils";

export const connectionGeometryByID = selectorFamily({
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

export const Connection = React.memo(
  ({ connectionID }: { connectionID: string }) => {
    const { start, end } = useRecoilValue(connectionGeometryByID(connectionID));

    return <Spline start={start} end={end} />;
  }
);
