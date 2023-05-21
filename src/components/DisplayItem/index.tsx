import React, { useContext } from "react";
import { context } from "../FunzoneContext";

const DisplayItem = ({ id }) => {
	const { items, rows } = useContext(context);

	const type = rows.includes(id) ? "row" : items?.[id]?.type;

	return (
		<div className="bg-white shadow-lg relative min-h-[65px] text-xs flex justify-center items-center rounded-md border">
			{/* <Markup {...props} /> */}
			<span className="border rounded-full py-1 px-4 border-gray-300">
				{type}
			</span>
		</div>
	);
};

export default DisplayItem;
