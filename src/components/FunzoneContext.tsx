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
	theme?: any;
	control?: any;
	onRemove?: ({ type, id }: { type: string; id: string }) => void;
	onClick?: (id: string) => void;
	afterChanged?: () => void;
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
	handleAddRow?: () => void;
	handleAddCol?: (x: any) => void;
}

export const context = createContext<IFContent>({
	rows: [],
	items: {},
	cols: [],
	ui: [],
	onRemove: () => {},
	onClick: () => {},
	afterChanged: () => {},
	handleAddRow: () => {},
	handleAddCol: () => {},
	theme: {},
});

export const Provider = context.Provider;
export default context;
