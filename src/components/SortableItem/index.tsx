import React, { useContext, useEffect } from "react";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import cx from "classnames";
import isNaN from "lodash/isNaN";
import { CSS } from "@dnd-kit/utilities";
import useMountStatus from "./useMountStatus";
import { context } from "../FunzoneContext";

function animateLayoutChanges(args: any) {
	const { isSorting, wasSorting } = args;

	if (isSorting || wasSorting) {
		return defaultAnimateLayoutChanges(args);
	}

	return true;
}

const SortableItem = ({
	id,
	type,
	children = null,
	isNew = false,
	width = "auto",
}) => {
	const { renderColHandler, renderRowHandler, onRemove } = useContext(context);
	const mounted = useMountStatus();

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		active,
		isDragging,
	} = useSortable({
		animateLayoutChanges,
		id,
		data: { type },
	});

	const mountedWhileDragging = isDragging && !mounted;

	const isCol = type === "col";
	const isRow = type === "row";
	const rowActive = active?.data?.current?.type === "row" && isRow;
	const colActive = active?.data?.current?.type === "col";
	const sourceActive = active?.data?.current?.type === "source";

	const getWidth = () => {
		if (typeof +width === "number" && !isNaN(+width)) {
			return { flexBasis: `${(100 / 12) * +width}%` };
		} else if (width === "auto") {
			return { flex: 1 };
		} else {
			return {};
		}
	};

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		...getWidth(),
	};

	const handlerProps = {
		...listeners,
		...attributes,
	};

	return (
		<div
			data-type={type}
			data-id={id}
			ref={rowActive || colActive || sourceActive ? setNodeRef : null}
			style={style}
			className={cx(
				" scale-100  group relative border border-transparent bg-white",
				{ "bg-sky-200p-4  hover:z-50 ": isCol },
				{ "min-h-[65px]": isRow && !children },
				{
					"dragOverlay shadow-[-1px_-1px_11px_#00000021] z-50 opacity-50 scale-[1.02]":
						isDragging,
				},
				{ "px-3 py-2 border border-slate-200": type === "source" },
				{ "fade-in": mountedWhileDragging },
				{ "border-yellow-500": isNew }
			)}
		>
			{children}

			{isRow &&
				renderRowHandler &&
				renderRowHandler({
					handlerProps,
					type,
					id,
					isCol,
					isRow,
					active,
					isDragging,
					onRemove,
				})}

			{isCol &&
				renderColHandler &&
				renderColHandler({
					handlerProps,
					type,
					id,
					isCol,
					isRow,
					active,
					isDragging,
					onRemove,
				})}
		</div>
	);
};

export default SortableItem;
