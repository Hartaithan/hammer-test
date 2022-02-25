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
  const [boxes, setBoxes] = React.useState({});
  const moveBox = React.useCallback(
    (id, left, top, title) => {
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
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        console.log("item.location", item.location);
        if (item.location === "board") {
          moveBox(item.id, left, top, item.title);
        } else {
          const keys = Object.keys(boxes);
          const index =
            keys.length === 0 ? 0 : Number(keys[keys.length - 1]) + 1;
          const newBoxes = { ...boxes };
          newBoxes[index] = { top, left, title: item.title, location: "board" };
          setBoxes(newBoxes);
        }
        // localStorage.setItem("boxes", JSON.stringify(boxes));
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
