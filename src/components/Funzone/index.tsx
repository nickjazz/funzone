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
import orderBy from "lodash/orderBy";
import map from "lodash/map";
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

interface IFFunzone {
	children: any;
	schema: any;
	ui: any;
	control?: any;
	renderRowHandler?: ({ handlerProps, type, id }) => React.ReactElement;
	renderColHandler?: ({ handlerProps, type, id }) => React.ReactElement;
	renderLibHandler?: ({ ...x }) => React.ReactElement;
	renderRowPlaceholder?: ({ ...x }) => React.ReactElement;
}

const Funzone = ({
	children,
	schema,
	ui,
	control,
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
	} = useFun();

	useEffect(() => {
		const _rows: React.SetStateAction<string[]> = [];
		const _cols: string[][] = [];
		const _items: { [x: string]: any } = {};

		map(schema, (x) => {
			_rows.push(x.id);

			_cols.push([...x?.children?.map((xc) => xc.id)]);
			map(x?.children, (item) => {
				_items[item.id] = item;
			});
		});

		console.log("_cols", _rows, _cols);

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

	const handleDragEnd = (event) => {
		cond([
			[isChangeRow, handleSwithRow],
			[isSameRow, handleSwitch],
			[isRoot, handleAddToRow],
		])(event);
		handleClean();
		setActiveId(null);
	};

	const handleDragOver = (event) => {
		cond([
			[isNewSource, handleNewJoin],
			[isDiff, handleMoveGrag],
			[isDiffEmtpy, handleMoveGragRow],
			[isOutSite, handleMoveOut],
		])(event);
	};

	const value = useMemo(
		() => ({
			rows,
			items,
			setItems,
			cols,
			ui,
			control,
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
