import find from "lodash/find";
import map from "lodash/map";
import { StringInput, NumberInput, ObjectInput } from "../control";

const hightLine = (item: HTMLElement, outline: HTMLDivElement) => {
	if (!item) return;

	const { width, height, x, y } = item?.getBoundingClientRect();
	resizeOut({ item: outline, width, height });
	reLocate({ item: outline, x, y });

	const styleList = ["border-2", "rounded-sm"];
	outline.classList.add(...styleList);

	const child = Array.from(item.children);
	if (!child) return;

	child.forEach((c) => {
		const isCol = c.getAttribute("data-fun-control");
		cleanColControl();
		if (isCol) {
			c.classList.remove("opacity-0");
			c.classList.add("opacity-100");
		}
	});
};

const resizeOut = ({ item, width, height }) => {
	if (!item) return;
	item.style.width = `${width}px`;
	item.style.height = `${height}px`;
};

const reLocate = ({ item, x, y }) => {
	if (!item) return;

	item.style.top = `${y}px`;
	item.style.left = `${x}px`;
};

const cleanColControl = () => {
	const items = document.querySelectorAll("[data-fun-control='col']");
	if (!items) return;

	items.forEach((item) => {
		item.classList.remove("opacity-100");
		item.classList.add("opacity-0");
	});
};

const cleanOut = (x: HTMLDivElement) => {
	if (!x) return;
	x.style.width = `0px`;
	x.style.height = `0px`;
	x.style.top = `0px`;
	x.style.left = `0px`;
};

const findFunItem = (e: {
	target: { closest: (arg0: string) => HTMLElement };
}) => {
	const element = e?.target?.closest?.("div[data-id]") as HTMLElement;
	if (!element || !e) return { element: null, id: "" };

	return { element, id: element?.getAttribute("data-id") };
};

const findControlByType = (ui, type) => {
	const control = find(ui, ["key", type])?.control || {};
	return control;
};

const getControlByValue = (x: any) => {
	const typeIs = typeof x;
	let Element = StringInput;

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

	return {
		markup: Element,
		type: typeIs,
	};
};

const getControlItems = (xs) => {
	const next = map(xs, (value, key: string) => {
		const { markup, type } = getControlByValue(value);
		return {
			label: key,
			type,
			value,
			markup,
		};
	});
	return next;
};

const getCustomControl = (xs, allControl, defaultProps) => {
	const next = map(xs, (value) => {
		const child = map(value.children, (x) => {
			const markup = allControl[x.type]?.markup;

			// return row
			return {
				label: x.label,
				value: defaultProps?.[x?.label],
				markup,
			};
		});

		// return group
		return {
			...value,
			children: [...child],
		};
	});

	return next;
};

export {
	hightLine,
	cleanColControl,
	cleanOut,
	findFunItem,
	findControlByType,
	resizeOut,
	reLocate,
	getControlItems,
	getCustomControl,
};
