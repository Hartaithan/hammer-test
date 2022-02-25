import React from "react";
import { Card } from "antd";
import SideBarItem from "./SidebarItem";

const sidebarItems = {
  0: { top: 0, left: 0, title: "Стул", location: "sidebar" },
  1: { top: 0, left: 0, title: "Стол", location: "sidebar" },
  2: { top: 0, left: 0, title: "Кровать", location: "sidebar" },
  3: { top: 0, left: 0, title: "Шкаф", location: "sidebar" },
  4: { top: 0, left: 0, title: "Кресло", location: "sidebar" },
};

const Sidebar = () => {
  return (
    <Card
      bodyStyle={{ padding: "5", height: "100%", width: "100%" }}
      style={{ width: "15%" }}
    >
      {Object.keys(sidebarItems).map((key) => {
        const { left, top, title, location } = sidebarItems[key];
        return (
          <SideBarItem
            key={key}
            id={key}
            left={left}
            top={top}
            title={title}
            location={location}
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
