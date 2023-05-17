import React, { useRef, useContext, useEffect, useState } from "react";
import cx from "classnames";
import debounce from "lodash/debounce";
import { useDndMonitor } from "@dnd-kit/core";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import { set } from "dot-prop-immutable";
import {
	hightLine,
	findFunItem,
	resizeOut,
	reLocate,
	findControlByType,
	getControlItems,
	getCustomControl,
} from "./utils";
import { context } from "../FunzoneContext";
import Debug from "./Debug";

interface IFSensorCenter {
	className?: string;
	debug?: boolean;
	children?: (x: any) => React.ReactElement;
}

interface IFObject {
	[key: string]: any;
}

const SensorCenter = ({
	className,
	debug = false,
	children,
}: IFSensorCenter) => {
	const editingOut = useRef<HTMLDivElement | null>(null);
	const out = useRef<HTMLDivElement | null>(null);
	const { control, items, setItems, ui } = useContext(context);
	const [isDragging, setIsDragging] = useState(false);
	const [hover, setHover] = useState<IFObject>({});
	const [editProps, setEditProps] = useState<IFObject[]>([
		{ label: "properties", children: [] },
	]);
	const [editId, setEditId] = useState("");

	// watch dnd event
	useDndMonitor({
		onDragStart() {
			setIsDragging(true);
			cleanUp();
			reLocate({
				item: out.current,
				x: -10000,
				y: 0,
			});
			resizeOut({
				item: out.current,
				width: 0,
				height: 0,
			});
		},
		onDragEnd() {
			setIsDragging(false);
		},
	});

	const handleMouseOver = debounce((e) => {
		const outline = out.current;
		const { element } = findFunItem(e);

		if (!element && out.current) {
			// cleanOut(out.current);
			return;
		}

		const size = element?.dataset;
		if (!size) return;
		setHover(size);

		if (!outline || !element || isDragging) return;
		hightLine(element, outline);
	}, 300);

	/**
	 * Add click and mouseover event listener
	 */
	useEffect(() => {
		const funZone = document.querySelector("body");
		if (!funZone || isDragging) return;
		funZone?.addEventListener("mouseover", handleMouseOver, false);
		funZone?.addEventListener("click", handleClick);
		return () => {
			funZone.removeEventListener("mouseover", handleMouseOver, false);
			funZone.removeEventListener("click", handleClick);
		};
	}, [items, isDragging]);

	/**
	 * Watch Edit dom, sync this size to outline wrapper
	 */
	useEffect(() => {
		const watchItem = document.querySelector(`[data-id="${hover.id}"]`);

		const resizeOb = new ResizeObserver((entries) => {
			// since we are observing only a single element, so we access the first element in entries array
			let rect = entries[0].contentRect;
			const { x, y } = watchItem?.getBoundingClientRect();
			resizeOut({
				item: out.current,
				width: rect.width,
				height: rect.height,
			});
			reLocate({
				item: out.current,
				x,
				y,
			});
		});

		if (!watchItem) return;
		resizeOb.observe(watchItem);
		return () => resizeOb.unobserve(watchItem);
	}, [hover.id, isDragging]);

	useEffect(() => {
		const watchItem = document.querySelector(`[data-id="${editId}"]`);

		const resizeOb = new ResizeObserver((entries) => {
			// since we are observing only a single element, so we access the first element in entries array
			let rect = entries[0].contentRect;
			const { x, y } = watchItem?.getBoundingClientRect();
			resizeOut({
				item: editingOut.current,
				width: rect.width,
				height: rect.height,
			});
			reLocate({
				item: editingOut.current,
				x,
				y,
			});
		});

		if (!watchItem) return;
		resizeOb.observe(watchItem);
		return () => resizeOb.unobserve(watchItem);
	}, [editId, isDragging]);

	/**
	 * Watch Edit dom. sync this position to outline wrapper
	 */
	useEffect(() => {
		const syncEditPosition = () => {
			const hoverDom = document.querySelector(
				`[data-id="${hover.id}"]`
			) as HTMLElement;
			if (hoverDom) {
				const { x, y, width, height } = hoverDom.getBoundingClientRect();
				reLocate({ item: out.current, x, y });
			}

			const editDom = document.querySelector(
				`[data-id="${editId}"]`
			) as HTMLElement;
			if (editDom) {
				const { x, y, width, height } = editDom.getBoundingClientRect();
				reLocate({ item: editingOut.current, x, y });
			}
		};

		document.addEventListener("scroll", syncEditPosition);
		return () => document.removeEventListener("scroll", syncEditPosition);
	}, [editId, hover.id]);

	const cleanUp = () => {
		setEditId("");
		setEditProps([{ label: "properties", children: [] }]);
		setHover({});
	};

	const handleClick = (e) => {
		const { id } = findFunItem(e);
		if (!id || !items) return;
		const props = items?.[id]?.props || {};
		// this type have custom control ?
		const controlGroup = findControlByType(ui, items?.[id]?.type);
		const editItem = document.querySelector(
			`[data-id="${id}"]`
		) as HTMLDivElement;
		hightLine(editItem, editingOut.current);

		setEditId(id);
		setEditProps(() => {
			if (!isEmpty(controlGroup))
				return [...getCustomControl(controlGroup, control, props)];
			else
				return [
					{
						label: "properties",
						children: [...getControlItems(props)],
					},
				];
		});
	};

	// const handleChange = (e) => {
	// 	setEditProps(JSON.parse(e.target.value));
	// };

	// const handleSave = () => {
	// 	if (!editId || !setItems) return;
	// 	setItems((prev) => set(prev, `${editId}.props`, editProps));
	// };

	const handleControlChange = ({ key, value }: { key: string; value: any }) => {
		if (!key || !setItems) return;
		setItems((prev) => set(prev, `${editId}.props.${key}`, value));
	};

	const getControlProps = () => {
		const next = map(editProps, (value, key) => {
			return { value, key };
		});
		return next;
	};

	return (
		<>
			<div className={cx("relataive", className)}>
				{/* debug */}
				{debug && (
					<Debug
						hover={hover}
						editProps={editProps}
						editId={editId}
						// handleChange={handleChange}
						// handleSave={handleSave}
					/>
				)}

				{/* control */}
				{!children && (
					<div className=" flex flex-col gap-4 border empty:border-none">
						{map(editProps, (group, index) => {
							if (isEmpty(group.children)) return null;
							return (
								<div
									key={`${group.label}-${index}`}
									className="flex flex-col gap-4 pb-4"
								>
									<div className="bg-slate-100 p-2 px-4 text-sm text-slate-600 capitalize">
										{group.label}
									</div>
									<div className="p-2 px-4 flex flex-col gap-4">
										{map(group.children, (sub, index) => {
											const DisplayControl = sub?.markup;
											return (
												<DisplayControl
													key={`${sub?.type}-${index}`}
													label={sub?.label}
													value={sub?.value}
													onChange={(x: string) =>
														handleControlChange({ key: sub?.label, value: x })
													}
												/>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>
				)}

				{children &&
					children({
						editProps,
						onChange: handleControlChange,
					})}
			</div>

			<div
				ref={editingOut}
				className={"fixed  pointer-events-none cursor-none border-green-500/80"}
			/>

			<div
				ref={out}
				className={"fixed  pointer-events-none cursor-none border-blue-600/60"}
			/>
		</>
	);
};

export default SensorCenter;
