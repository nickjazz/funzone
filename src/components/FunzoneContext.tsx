import { createContext } from "react";

interface IFObject {
	[key: string]: any;
}

interface IFContent {
	rows?: any;
	items?: IFObject;
	setItems?: React.Dispatch<React.SetStateAction<string>>;
	cols?: any;
	ui?: any;
	control?: any;
	onRemove?: ({ type, id }: { type: string; id: string }) => void;
	onClick?: (id: string) => void;
	renderRowHandler?: ({
		handlerProps,
		isCol,
		isRow,
		active,
		isDragging,
		type,
		id,
		onRemove,
	}) => React.ReactElement;
	renderColHandler?: ({
		handlerProps,
		isCol,
		isRow,
		active,
		isDragging,
		type,
		id,
		onRemove,
	}) => React.ReactElement;
	renderRowPlaceholder?: (x: any) => React.ReactElement;
	renderLibHandler?: (x: any) => React.ReactElement;
}

export const context = createContext<IFContent>({
	rows: [],
	items: {},
	cols: [],
	ui: [],
	onRemove: () => {},
	onClick: () => {},
});

export const Provider = context.Provider;
