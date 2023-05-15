import React, { useContext } from "react";
import map from "lodash/map";
import cx from "classnames";
import { context } from "../FunzoneContext";
import SortableUIItem from "./SortableUIItem";

const ComponentsLib = ({ className }) => {
	const { ui, renderLibHandler } = useContext(context);

	return (
		<div
			className={cx(
				"min-h-[600px] border p-2 rounded-sm flex flex-col",
				className
			)}
		>
			{map(ui, (x) => (
				<SortableUIItem
					renderLibHandler={renderLibHandler}
					key={x.key}
					id={x.key}
				>
					{x}
				</SortableUIItem>
			))}
		</div>
	);
};

export default ComponentsLib;
