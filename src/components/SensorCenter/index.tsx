import React, { useRef, useContext, useEffect, useState } from "react";
import cx from "classnames";
import debounce from "lodash/debounce";
import { useDndMonitor } from "@dnd-kit/core";
import map from "lodash/map";
import { set } from "dot-prop-immutable";
import { hightLine, findFunItem, resizeOut, reLocate } from "./utils";
import { context } from "../FunzoneContext";
import Debug from "./Debug";
import { StringInput, NumberInput, ObjectInput } from "../control";

interface IFSensorCenter {
	className?: string;
	debug?: boolean;
}

interface IFObject {
	[key: string]: any;
}

const warningLog: string[] = [];

const SensorCenter = ({ className, debug = false }: IFSensorCenter) => {
	const out = useRef<HTMLDivElement | null>(null);
	const { control, items, setItems } = useContext(context);
	const [isDragging, setIsDragging] = useState(false);
	const [hover, setHover] = useState<IFObject>({});
	const [editProps, setEditProps] = useState<IFObject>({});
	const [editControl, setEditControl] = useState<IFObject>({});
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

	const cleanUp = () => {
		setEditId("");
		setEditProps({});
		setEditControl({});
		setHover({});
	};

	const handleClick = (e) => {
		const { id } = findFunItem(e);
		if (!id || !items) return;
		const props = items?.[id]?.props || {};
		const control = items?.[id]?.control || {};

		setEditId(id);
		setEditProps(props);
		setEditControl(control);
	};

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
		const resizeOb = new ResizeObserver((entries) => {
			// since we are observing only a single element, so we access the first element in entries array
			let rect = entries[0].contentRect;
			resizeOut({
				item: out.current,
				width: rect.width,
				height: rect.height,
			});
		});

		const watchItem = document.querySelector(`[data-id="${editId}"]`);
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
		};

		document.addEventListener("scroll", syncEditPosition);
		return () => document.removeEventListener("scroll", syncEditPosition);
	}, [editId, hover.id]);

	const handleChange = (e) => {
		setEditProps(JSON.parse(e.target.value));
	};

	const handleSave = () => {
		if (!editId || !setItems) return;
		setItems((prev) => set(prev, `${editId}.props`, editProps));
	};

	const handleControlChange = ({ key, value }: { key: string; value: any }) => {
		if (!key || !setItems) return;
		setItems((prev) => set(prev, `${editId}.props.${key}`, value));
	};

	const getControlByValue = (x: any, key: string) => {
		const typeIs = typeof x;
		let Element = StringInput;

		const customMy = editControl[key]?.type;

		if (control?.[customMy]) {
			Element = control?.[customMy]?.markup;
			return Element;
		} else if (
			customMy &&
			!control?.[customMy] &&
			!warningLog.includes(customMy)
		) {
			warningLog.push(customMy);
			console.warn(`[${key}] missing control component with name: ${customMy}`);
		}

		switch (typeIs) {
			case "string":
				Element = StringInput;
				break;
			case "number":
				Element = NumberInput;
				break;
			case "object":
				Element = ObjectInput;
				break;
			default:
				break;
		}

		return Element;
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
						handleChange={handleChange}
						handleSave={handleSave}
					/>
				)}

				{/* contro */}
				<div className="mt-6 flex flex-col gap-4">
					{map(editProps, (value, key) => {
						const DisplayControl = getControlByValue(value, key);
						return (
							<DisplayControl
								label={key}
								value={value}
								onChange={(x: string) => handleControlChange({ key, value: x })}
							/>
						);
					})}
				</div>
			</div>

			<div
				ref={out}
				className={"fixed pointer-events-none cursor-none border-blue-600/60"}
			/>
		</>
	);
};

export default SensorCenter;
