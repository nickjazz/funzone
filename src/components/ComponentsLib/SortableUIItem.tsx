import React from "react";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import cx from "classnames";
import { CSS } from "@dnd-kit/utilities";
import useMountStatus from "../SortableItem/useMountStatus";

function animateLayoutChanges(args: any) {
	const { isSorting, wasSorting } = args;

	if (isSorting || wasSorting) {
		return defaultAnimateLayoutChanges(args);
	}

	return true;
}

const SortableUIItem = ({ id, children, renderLibHandler }) => {
	const mounted = useMountStatus();

	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		animateLayoutChanges,
		id,
		data: { type: "source", initprops: { ...children?.defaultProps } },
	});

	const mountedWhileDragging = isDragging && !mounted;

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const handlerProps = {
		...listeners,
		...attributes,
	};

	return (
		<div
			data-type={"source"}
			ref={setNodeRef}
			style={style}
			className={cx(
				{
					"dragOverlay shadow-[-1px_-1px_11px_#00000021] z-50 opacity-50":
						isDragging,
				},
				{ "fade-in": mountedWhileDragging }
			)}
			{...handlerProps}
		>
			{renderLibHandler(children)}
		</div>
	);
};

export default SortableUIItem;
