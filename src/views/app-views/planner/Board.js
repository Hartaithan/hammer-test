import React from "react";
import { Card } from "antd";
import Item from "./Item";

const boardStyles = {
	width: "100%",
	height: "100%",
	border: "1px solid black",
	position: "relative",
};

const Board = ({ drop, boxes }) => {
	return (
		<Card
			bodyStyle={{ padding: "5", height: "100%", width: "100%" }}
			style={{ width: "85%", marginLeft: "20px" }}
		>
			<div ref={drop} style={boardStyles}>
				{Object.keys(boxes).map((key) => {
					const { left, top, title } = boxes[key];
					return (
						<Item
							key={key}
							id={key}
							left={left}
							top={top}
							hideSourceOnDrag={true}
						>
							{title}
						</Item>
					);
				})}
			</div>
		</Card>
	);
};

export default Board;
