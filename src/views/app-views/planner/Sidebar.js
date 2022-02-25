import React from "react";
import { Button, Card } from "antd";
import SideBarItem from "./SidebarItem";

const sidebarItems = {
  0: { top: 0, left: 0, title: "Стул", location: "sidebar" },
  1: { top: 0, left: 0, title: "Стол", location: "sidebar" },
  2: { top: 0, left: 0, title: "Кровать", location: "sidebar" },
  3: { top: 0, left: 0, title: "Шкаф", location: "sidebar" },
  4: { top: 0, left: 0, title: "Кресло", location: "sidebar" },
};

const Sidebar = ({ saveBoxes, uploadBoxes, eraseBoxes }) => {
  const inputRef = React.useRef();

  function handleInput(e) {
    const file = e.target.files[0];
    uploadBoxes(file);
  }

  return (
    <Card
      bodyStyle={{ padding: "5", height: "100%", width: "100%" }}
      style={{ width: "15%" }}
    >
      <div className="d-flex flex-column h-100">
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
        <div className="mt-auto align-self-end">
          <Button
            className="mb-2"
            type="primary"
            block
            onClick={() => saveBoxes()}
          >
            Скачать расстановку
          </Button>
          <Button
            className="mb-2"
            type="primary"
            block
            onClick={() => inputRef.current?.click()}
          >
            Загрузить расстановку
          </Button>
          <input
            ref={inputRef}
            type="file"
            onChange={handleInput}
            style={{ display: "none" }}
          />
          <Button type="primary" block onClick={() => eraseBoxes()}>
            Очистить расстановку
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
