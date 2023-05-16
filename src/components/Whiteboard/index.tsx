import React, { useContext } from "react";
import cx from "classnames";
import map from "lodash/map";
import find from "lodash/find";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { context } from "../FunzoneContext";
import SortableItem from "../SortableItem";

interface IFWhiteBoard {
	className: string;
}

const Whiteboard = ({ className }: IFWhiteBoard) => {
	const { rows, items, cols, ui, renderRowPlaceholder } = useContext(context);
	const { setNodeRef, isOver, active } = useDroppable({
		id: "root",
	});

	const renderChild = (child: any[]) => {
		if (!child) return null;
		return (
			<div className="flex w-full flex-wrap">
				<SortableContext items={child} strategy={horizontalListSortingStrategy}>
					{map(child, (x, index) => {
						const type = items?.[x]?.type;
						const props = items?.[x]?.props || {};
						const Markup = find(ui, ["key", type])?.markup;

						return (
							<SortableItem
								key={`${x}-${index}`}
								type="col"
								id={x}
								width={props?.span}
								isNew={props?._temp}
							>
								{/* {type} */}
								{Markup && <Markup {...props} />}
							</SortableItem>
						);
					})}
				</SortableContext>
			</div>
		);
	};

	return (
		<div
			className={cx(
				"min-h-[1200px] relative border rounded-sm transition-all",
				{ "border-sky-400": isOver },
				className
			)}
		>
			<SortableContext items={rows} strategy={verticalListSortingStrategy}>
				<div ref={setNodeRef} className="absolute w-full h-full" />
				{map(rows, (row, index) => {
					const child = cols?.[index];
					if (!child) return;
					return (
						<SortableItem type="row" key={`${row}-${child.length}`} id={row}>
							{/* {row} */}
							{child.length === 0 && renderRowPlaceholder({ row })}

							{child && renderChild(child)}
						</SortableItem>
					);
				})}
			</SortableContext>
		</div>
	);
};

export default Whiteboard;
