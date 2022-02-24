import React from "react";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";
import Sidebar from "./Sidebar";
import Board from "./Board";

const ItemTypes = {
  ITEM: "item",
};

export const Planner = () => {
  const [boxes, setBoxes] = React.useState({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });
  const moveBox = React.useCallback(
    (id, left, top) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.ITEM,
      drop(item, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );
  return (
    <div className="d-flex h-100 w-100">
      <Sidebar />
      <Board drop={drop} boxes={boxes} />
    </div>
  );
};

export default Planner;
