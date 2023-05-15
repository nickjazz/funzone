const hightLine = (item: HTMLElement, outline: HTMLDivElement) => {
	const { width, height, x, y } = item.getBoundingClientRect();
	resizeOut({ item: outline, x, y, width, height });

	const styleList = ["border-2", "rounded-sm"];
	outline.classList.add(...styleList);

	const child = Array.from(item.children);
	child.forEach((c) => {
		const isCol = c.getAttribute("data-fun-control");
		cleanColControl();
		if (isCol) {
			c.classList.remove("opacity-0");
			c.classList.add("opacity-100");
		}
	});
};

const resizeOut = ({ item, x = 0, y = 0, width, height }) => {
	item.style.width = `${width}px`;
	item.style.height = `${height}px`;

	item.style.top = `${y}px`;
	item.style.left = `${x}px`;
};

const cleanColControl = () => {
	const items = document.querySelectorAll("[data-fun-control='col']");
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

export { hightLine, cleanColControl, cleanOut, findFunItem, resizeOut };
