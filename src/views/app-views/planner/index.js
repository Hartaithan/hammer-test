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
  const getBoxes = JSON.parse(localStorage.getItem("boxes"));
  const [boxes, setBoxes] = React.useState(getBoxes ? getBoxes : {});
  const moveBox = React.useCallback(
    (id, left, top, title) => {
      const editedBoxes = update(boxes, {
        [id]: {
          $merge: { left, top, title },
        },
      });
      setBoxes(editedBoxes);
      localStorage.setItem("boxes", JSON.stringify(editedBoxes));
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
        if (item.location === "board") {
          moveBox(item.id, left, top, item.title);
        } else {
          const keys = Object.keys(boxes);
          const index =
            keys.length === 0 ? 0 : Number(keys[keys.length - 1]) + 1;
          const newBoxes = { ...boxes };
          newBoxes[index] = { top, left, title: item.title, location: "board" };
          setBoxes(newBoxes);
          localStorage.setItem("boxes", JSON.stringify(newBoxes));
        }
        return undefined;
      },
    }),
    [moveBox]
  );

  function saveBoxes() {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(boxes)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "boxes.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function eraseBoxes() {
    setBoxes({});
    localStorage.removeItem("boxes");
  }

  async function uploadBoxes(file) {
    const data = await file.text();
    setBoxes(JSON.parse(data));
    localStorage.setItem("boxes", data);
  }

  return (
    <div className="d-flex h-100 w-100">
      <Sidebar
        saveBoxes={saveBoxes}
        uploadBoxes={uploadBoxes}
        eraseBoxes={eraseBoxes}
      />
      <Board drop={drop} boxes={boxes} />
    </div>
  );
};

export default Planner;
