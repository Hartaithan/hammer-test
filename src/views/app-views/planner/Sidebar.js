import React from "react";
import { Card } from "antd";
import Item from "./Item";
import SideBarItem from "./SidebarItem";

const sidebarItems = [
	{
		id: 1,
		type: "sidebarItem",
		component: {
			type: "input",
			content: "Some input"
		}
	},
	{
		id: 2,
		type: "sidebarItem",
		component: {
			type: "name",
			content: "Some name"
		}
	},
	{
		id: 3,
		type: "sidebarItem",
		component: {
			type: "email",
			content: "Some email"
		}
	}
]

const Sidebar = () => {
	return (
		<Card
			bodyStyle={{ padding: "5", height: "100%", width: "100%" }}
			style={{ width: "15%" }}
		>
			asdasd
		</Card>
	);
};

export default Sidebar;
