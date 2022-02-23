/* eslint-disable jsx-a11y/aria-role */
import React from "react";
import { Card } from "antd";
import { useDrag, useDrop } from "react-dnd";
import update from "immutability-helper";

const boxStyles = {
  position: "absolute",
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
};

const containerStyles = {
  width: "100%",
  height: "100%",
  border: "1px solid black",
  position: "relative",
};

const ItemTypes = {
  BOX: "box",
};

const Box = ({ id, left, top, hideSourceOnDrag, children }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.BOX,
      item: { id, left, top },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }
  return (
    <div ref={drag} style={{ ...boxStyles, left, top }} role="Box">
      {children}
    </div>
  );
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
      accept: ItemTypes.BOX,
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
      <Card
        bodyStyle={{ padding: "5", height: "100%", width: "100%" }}
        style={{ width: "15%" }}
      >
        asdasdasd
      </Card>
      <Card
        bodyStyle={{ padding: "5", height: "100%", width: "100%" }}
        style={{ width: "85%", marginLeft: "20px" }}
      >
        <div ref={drop} style={containerStyles}>
          {Object.keys(boxes).map((key) => {
            const { left, top, title } = boxes[key];
            return (
              <Box
                key={key}
                id={key}
                left={left}
                top={top}
                hideSourceOnDrag={true}
              >
                {title}
              </Box>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Planner;
