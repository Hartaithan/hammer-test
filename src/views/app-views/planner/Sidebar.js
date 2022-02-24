import React from "react";
import { Card } from "antd";
import SideBarItem from "./SidebarItem";

const sidebarItems = {
  с: { top: 10, left: 20, title: "Drag me too" },
};

const Sidebar = () => {
  return (
    <Card
      bodyStyle={{ padding: "5", height: "100%", width: "100%" }}
      style={{ width: "15%" }}
    >
      {Object.keys(sidebarItems).map((key) => {
        const { left, top, title } = sidebarItems[key];
        return (
          <SideBarItem
            key={key}
            id={key}
            left={left}
            top={top}
            title={title}
            hideSourceOnDrag={true}
          >
            {title}
          </SideBarItem>
        );
      })}
    </Card>
  );
};

export default Sidebar;
