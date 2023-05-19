import { useState } from "react";
import map from "lodash/map";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";
import dotProp from "dot-prop-immutable";

const useFun = () => {
	const [cols, setCols] = useState<string[][]>([]);
	const [items, setItems] = useState<any>({});
	const [rows, setRows] = useState<string[]>([]);
	const [activeId, setActiveId] = useState(null);

	const findRowIndex = (colId: string) => {
		let index = -1;
		map(cols, (col, colIndex) => {
			if (col.includes(`${colId}`) && index === -1) index = colIndex;
		});
		return index;
	};

	const createItem = (active) => {
		const { id: type, data } = active || {};
		const id = nanoid();
		const initProps = data?.current?.initprops || {};
		return {
			id,
			item: {
				[id]: { type, props: Object.assign({}, initProps, { _temp: true }) },
			},
		};
	};

	const isSource = (x: any) => x?.data?.current?.type === "source";
	const isRow = (x: any) => x?.data?.current?.type === "row";
	const isCol = (x: any) => x?.data?.current?.type === "col";

	const isRoot = ({ active, over }) => {
		return (
			over?.id === "root" &&
			isSource(active) &&
			activeId &&
			!cols?.flat().includes(activeId)
		);
	};

	const isOutSite = ({ over, active }) => {
		return over?.id === "root" && !isRow(active);
	};

	const isDiffEmtpy = ({ active, over }) => {
		return isRow(over) && isCol(active);
	};

	const isDiff = ({ active, over }) => {
		const activeRowIndex = findRowIndex(active?.id);
		const activeColIndex = findRowIndex(over?.id);
		return isCol(over) && isCol(active) && activeRowIndex !== activeColIndex;
	};

	const isSameRow = ({ active, over }) => {
		const activeRowIndex = findRowIndex(active?.id);
		const activeColIndex = findRowIndex(over?.id);
		return isCol(over) && isCol(active) && activeRowIndex === activeColIndex;
	};

	const isEmptyOver = ({ active, over }) => {
		return !over?.id;
	};

	const isChangeRow = ({ active, over }) => {
		return isRow(over) && isRow(active);
	};

	const isNewSource = ({ active, over }) => {
		return isSource(active) && over?.id;
	};

	const handleMoveGrag = (event) => {
		const { active, over } = event;
		const { id } = active;
		const { id: overId } = over;

		setCols((prev) => {
			const activeItems = findRowIndex(id);
			const overItems = findRowIndex(overId);

			// Find the indexes for the items

			const next = map(prev, (x, index) => {
				if (index === activeItems) {
					return x.filter((item) => item !== id);
				} else if (index === overItems) {
					return [
						...x.slice(0, overItems),
						id,
						...x.slice(overItems, prev[overItems].length),
					];
				}
				return x;
			});

			return next;
		});
	};

	const handleMoveGragRow = (event) => {
		const { active, over } = event;
		const { id } = active;
		const { id: overId } = over; // is row
		const activeItems = findRowIndex(id);
		const overItems = rows.indexOf(overId);

		if (activeItems === overItems) {
			return;
		}

		setCols((prev) => {
			const activeItems = findRowIndex(id);

			const next = map(prev, (x, index) => {
				if (index === activeItems) {
					return x.filter((item) => item !== id);
				} else if (index === overItems) {
					return [...x, id];
				}
				return x;
			});

			return next;
		});
	};

	const handleSwithRow = ({ active, over }) => {
		console.log("[handleSwithRow ]", active, over);

		setRows((prev) => {
			const from = prev.indexOf(active.id);
			const to = prev.indexOf(over.id);
			setCols((cols) => arrayMove(cols, from, to));

			return arrayMove(prev, from, to);
		});
	};

	const handleSwitch = ({ active, over }) => {
		const actionIndex = findRowIndex(active.id);
		setCols((prev) => {
			const next = map(prev, (x, index) => {
				if (index === actionIndex) {
					return arrayMove(x, x.indexOf(active?.id), x.indexOf(over?.id));
				}
				return x;
			});

			return next;
		});
	};

	const handleAddToRow = ({ active }) => {
		const nextId = nanoid();

		const { id, item } = createItem(active);

		setRows((prev) => {
			return [...prev, nextId];
		});
		setCols((prev) => {
			return [...prev, [id]];
		});
		setItems((prev) => {
			return Object.assign({}, prev, item);
		});
	};

	// new item only allow join row, become a new col
	const handleNewJoin = ({ over }) => {
		// 1, make sure is row
		const rowIndex = isRow(over)
			? rows.indexOf(over.id)
			: findRowIndex(over?.id);

		// 2, find col index in the row
		const colIndex = isRow(over) ? 0 : cols?.[rowIndex]?.indexOf(over.id);

		if (rowIndex === -1) return;

		setCols((prev) => {
			return map(prev, (x, index) => {
				if (index === rowIndex) {
					let next = x;
					if (next.includes(activeId)) {
						next = x.filter((item) => item !== activeId);
					}
					return [
						...next.slice(0, colIndex),
						activeId,
						...next.slice(colIndex, prev[rowIndex].length),
					];
				} else {
					return x.filter((item) => item !== activeId);
				}
			});
		});

		// console.log(`===join to row ${rowIndex} and col ${colIndex}`);
	};

	const handleClean = () => {
		setItems((prev: any) => {
			const next: IFObject = {};
			map(prev, (x, key) => {
				next[key] = dotProp.delete(x, "props._temp");
			});
			return next;
		});
	};

	const handleDragStart = ({ active }) => {
		console.log("[create new item ]");
		if (activeId) return;
		if (isSource(active)) {
			const { id, item } = createItem(active);
			setActiveId(id);
			setItems((prev) => {
				return Object.assign({}, prev, item);
			});
		} else {
			setActiveId(active.id);
		}
	};

	// create new row move in
	const handleMoveOut = ({ active }) => {
		const rowIndex = findRowIndex(active.id);
		const newRowId = nanoid();

		setRows((prev) => {
			return [...prev, newRowId];
		});

		setCols((prev) => {
			const next = map(prev, (x, index) => {
				if (index === rowIndex) {
					return x.filter((item) => item !== active.id);
				}
				return x;
			});

			return [...next, [active.id]];
		});
	};

	const handleRemove = ({ type, id }) => {
		console.log("[handleRemove]", type, id);
		if (type === "col") {
			setCols((prev) => {
				const next = map(prev, (x) => {
					if (x.includes(id)) {
						return x.filter((item) => item !== id);
					} else {
						return x;
					}
				});

				return next;
			});
		}

		if (type === "row") {
			const rowIndex = rows.indexOf(id);
			setRows((prev) => {
				const next = prev.filter((item) => item !== id);
				return next;
			});

			setCols((prev) => {
				const next = [...prev];
				next.splice(rowIndex, 1);
				console.log("next", next);
				return next;
			});
		}
	};

	return {
		setItems,
		items,
		setRows,
		rows,
		setCols,
		cols,
		setActiveId,
		activeId,

		findRowIndex,
		createItem,
		isOutSite,
		isDiffEmtpy,
		isDiff,
		isChangeRow,
		isNewSource,
		isEmptyOver,
		isSameRow,
		isSource,
		isRoot,
		isRow,
		isCol,

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
	};
};

export default useFun;
