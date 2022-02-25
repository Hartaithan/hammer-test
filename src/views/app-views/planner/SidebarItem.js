import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from ".";

const sidebarItemStyles = {
  border: "1px dashed gray",
  backgroundColor: "white",
  padding: "0.5rem 1rem",
  cursor: "move",
  marginBottom: "8px",
  textAlign: "center",
};

const SideBarItem = ({
  id,
  left,
  top,
  title,
  location,
  hideSourceOnDrag,
  children,
}) => {
  const [{ isDragging, opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.ITEM,
      item: { left, top, title, location },
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  return (
    <div
      className="sideBarItem"
      ref={drag}
      style={{ ...sidebarItemStyles, opacity }}
    >
      {children}
    </div>
  );
};
export default SideBarItem;
