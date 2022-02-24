import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from ".";

const SideBarItem = ({ id, left, top, title, hideSourceOnDrag, children }) => {
  const [{ isDragging, opacity }, drag] = useDrag(
    () => ({
      type: ItemTypes.ITEM,
      item: { id, left, top, title },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, left, top]
  );
  if (isDragging && hideSourceOnDrag) {
    return <div ref={drag} />;
  }

  return (
    <div className="sideBarItem" ref={drag} style={{ opacity }}>
      {children}
    </div>
  );
};
export default SideBarItem;
