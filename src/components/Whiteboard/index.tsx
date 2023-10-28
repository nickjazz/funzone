import React, { useContext, Children } from "react";
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
	children?: (
		handleAddRow: () => void,
		handleAddCol: (x: any) => void
	) => React.ReactNode;
}

const Whiteboard = ({ className, children }: IFWhiteBoard) => {
	const {
		rows,
		items,
		cols,
		ui,
		renderRowPlaceholder,
		handleAddRow,
		handleAddCol,
	} = useContext(context);

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
				" relative rounded-sm transition-all",
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
							<></>
						</SortableItem>
					);
				})}
			</SortableContext>

			<div className="relative z-20">
				{children && children?.(handleAddRow, handleAddCol)}
			</div>
		</div>
	);
};

export default Whiteboard;
