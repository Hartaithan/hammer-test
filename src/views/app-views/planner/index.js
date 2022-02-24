import React from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import Sidebar from "./Sidebar";
import Board from "./Board";

export const ItemTypes = {
  ITEM: "item",
  SIDEBAR_ITEM: "sidebarItem",
};

export const Planner = () => {
  const [boxes, setBoxes] = React.useState({
    a: { top: 20, left: 80, title: "Drag me around" },
    b: { top: 180, left: 20, title: "Drag me too" },
  });
  const moveBox = React.useCallback(
    (id, left, top, title) => {
      console.log(id);
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top, title },
          },
        })
      );
    },
    [boxes, setBoxes]
  );
  const [, drop] = useDrop(
    () => ({
      accept: [ItemTypes.ITEM, ItemTypes.SIDEBAR_ITEM],
      drop(item, monitor) {
        if (!boxes[item.id]) {
          setBoxes({
            ...boxes,
            [item.id]: { top: item.top, left: item.left, title: item.title },
          });
        }
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        moveBox(item.id, left, top, item.title);
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
