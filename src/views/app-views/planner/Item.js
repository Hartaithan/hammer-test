import { useDrag } from "react-dnd";

const itemStyles = {
	position: "absolute",
	border: "1px dashed gray",
	backgroundColor: "white",
	padding: "0.5rem 1rem",
	cursor: "move",
};

const ItemTypes = {
  ITEM: "item",
};

const Item = ({ id, left, top, hideSourceOnDrag, children }) => {
	const [{ isDragging }, drag] = useDrag(
		() => ({
			type: ItemTypes.ITEM,
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
		<div ref={drag} style={{ ...itemStyles, left, top }} role="Box">
			{children}
		</div>
	);
};

export default Item