import React, { useContext } from "react";
import map from "lodash/map";
import find from "lodash/find";
import { context } from "..";

const Repeater = ({ items }) => {
	const { ui } = useContext(context);

	return (
		<div className="p-2 border flex">
			{map(items, (item, index) => {
				const Markup = find(ui, ["key", item.type])?.markup;

				return (
					<div data-id={`${index}.${item.id}`} key={item.id}>
						<Markup {...item?.props} />
					</div>
				);
			})}
		</div>
	);
};

export default Repeater;
