import { atomFamily, atom, selector } from "recoil";
import { exampleGraph } from "../pages";
export const visibleNodeIDs = atom({
  key: "visibleNodeIDs",
  default: [],
});

export const connectionIDs = atom({
  key: "connectionIDs",
  default: [],
});

export const connectionParamsByID = atomFamily({
  key: "connectionParams",
  default: (param) => ({
    fromNode: "",
    toNode: "",
    inputField: "",
    outputField: "",
  }),
});

export const nodePositionByID = atomFamily({
  key: "nodePosition",
  default: (param) => ({ x: 100, y: 100 }),
});
export const inputIDsByNodeID = atomFamily({
  key: "inputIDsByNode",
  default: (param) => [],
});
export const inputStateByID = atomFamily({
  key: "inputState",
  default: (param) => ({ name: "input", parentNode: null, index: -1 }),
});
export const outputStateByID = atomFamily({
  key: "outputState",
  default: (param) => ({ name: "input", parentNode: null, index: -1 }),
});
export const writeGraph = selector({
  key: "store",
  get: () => {
    return null;
  },
  set: ({ set, get }, val: typeof exampleGraph) => {
    val.nodes.map((node) => {
      const nodeId = `${node.nid}`;
      set(nodeTypeByID(nodeId), node.type);
      set(nodePositionByID(nodeId), { x: node.x, y: node.y });
      set(
        inputIDsByNodeID(nodeId),
        node.fields.in.map(
          (field, index) => `${nodeId}/input/${index}/${field.name}`
        )
      );
      node.fields.in.forEach((field, index) => {
        set(inputStateByID(`${nodeId}/input/${index}/${field.name}`), {
          name: field.name,
          parentNode: nodeId,
          index,
        });
      });
      set(
        outputIDsByNodeID(nodeId),
        node.fields.out.map(
          (field, index) => `${nodeId}/output/${index}/${field.name}`
        )
      );
      node.fields.out.forEach((field, index) => {
        set(outputStateByID(`${nodeId}/output/${index}/${field.name}`), {
          name: field.name,
          parentNode: nodeId,
          index,
        });
      });
    });
    set(
      visibleNodeIDs,
      val.nodes.map((node) => `${node.nid}`)
    );
  },
});
export const outputIDsByNodeID = atomFamily({
  key: "outputIDsByNode",
  default: (param) => [],
});
export const nodeTypeByID = atomFamily({
  key: "nodeType",
  default: (param) => "Hello",
});
