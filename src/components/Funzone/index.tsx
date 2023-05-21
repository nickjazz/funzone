import React, { useEffect, useMemo, useRef, useState } from "react";
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragOverlay,
	MeasuringStrategy,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import isEqual from "lodash/isEqual";
import { cond } from "lodash/fp";
import { Provider } from "../FunzoneContext";
import DisplayItem from "../DisplayItem";
import {
	DefaultRowControl,
	DefaultColControl,
	DefaultLibControl,
	DefaultRowPlaceholder,
} from "./DefaultControl";
import useFun from "./useFun";
import { schemaToFunzone, funzoneToSchema } from "./utils";

interface IFFunzone {
	children: any;
	schema: any;
	ui: any;
	control?: any;
	onChange?: (x: any) => void;
	renderRowHandler?: ({ handlerProps, type, id }) => React.ReactElement;
	renderColHandler?: ({ handlerProps, type, id }) => React.ReactElement;
	renderLibHandler?: (...x) => React.ReactElement;
	renderRowPlaceholder?: (...x) => React.ReactElement;
}

const Funzone = ({
	children,
	schema,
	ui,
	control,
	onChange = (e: any) => {},
	renderRowHandler = DefaultRowControl,
	renderColHandler = DefaultColControl,
	renderLibHandler = DefaultLibControl,
	renderRowPlaceholder = DefaultRowPlaceholder,
}: IFFunzone) => {
	const protalRef = useRef(null);

	const {
		setCols,
		cols,
		isOutSite,
		isDiffEmtpy,
		isDiff,
		isChangeRow,
		isSameRow,
		isNewSource,
		isRoot,
		items,
		setItems,
		rows,
		setRows,
		setActiveId,
		activeId,
		handleRemove,
		handleMoveOut,
		handleAddToRow,
		handleDragStart,
		handleClean,
		handleNewJoin,
		handleSwitch,
		handleMoveGragRow,
		handleSwithRow,
		handleMoveGrag,
	} = useFun(onChange);

	useEffect(() => {
		const { rows: _rows, cols: _cols, items: _items } = schemaToFunzone(schema);
		setRows(_rows);
		setCols(_cols);
		setItems(_items);
	}, [schema]);

	useEffect(() => {
		protalRef.current === document.querySelector("body");
	}, []);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragOver = (event) => {
		cond([
			[isNewSource, handleNewJoin],
			[isDiff, handleMoveGrag],
			[isDiffEmtpy, handleMoveGragRow],
			[isOutSite, handleMoveOut],
		])(event);
	};

	const handleDragEnd = (event) => {
		cond([
			[isChangeRow, handleSwithRow],
			[isSameRow, handleSwitch],
			[isRoot, handleAddToRow],
		])(event);
		handleClean();
		setActiveId(null);
		afterChanged();
	};

	const afterChanged = () => {
		const next = funzoneToSchema(rows, cols, items);
		onChange(next);
	};

	const value = useMemo(
		() => ({
			rows,
			items,
			setItems,
			cols,
			ui,
			control,
			afterChanged,
			onRemove: handleRemove,
			renderRowHandler,
			renderColHandler,
			renderLibHandler,
			renderRowPlaceholder,
		}),
		[rows, items, cols, ui, control]
	);

	const measuringConfig = {
		droppable: {
			strategy: MeasuringStrategy.Always,
		},
	};

	return (
		<DndContext
			sensors={sensors}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			measuring={measuringConfig}
		>
			<Provider value={value}>
				{children}
				<DragOverlay
					dropAnimation={{
						duration: 260,
						easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
					}}
				>
					{activeId && <DisplayItem id={activeId} />}
				</DragOverlay>
			</Provider>
		</DndContext>
	);
};

export default Funzone;
