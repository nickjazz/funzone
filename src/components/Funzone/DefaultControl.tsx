import React, { useContext } from "react";
import { context } from "../FunzoneContext";
import { Move, Trash } from "react-feather";
import DragIcon from "../SortableItem/DragIcon";

const DefaultRowControl = ({ handlerProps, type, id }) => {
	const { onRemove } = useContext(context);

	return (
		<>
			<div
				onClick={() => onRemove?.({ type, id })}
				className="group-hover:opacity-100 opacity-20 absolute flex cursor-grab rounded-l-md py-1 justify-center items-start w-6 -left-6 -top-[1px] h-[full] bg-red-200/40 hover:bg-red-300/40 "
			>
				<Trash className="text-gray-500 w-6 h-6 py-1.5 px-1.5 cursor-pointer" />
			</div>
			<div
				className="absolute flex cursor-grab rounded-r-lg pt-2 justify-center items-start w-6 -right-6 -top-[1px] h-full bg-slate-200/40 hover:bg-slate-300/60"
				{...handlerProps}
			>
				<DragIcon />
			</div>
		</>
	);
};

const DefaultColControl = ({ handlerProps, type, id }) => {
	const { onRemove } = useContext(context);

	return (
		<div
			data-fun-control="col"
			className="min-w-4 handler absolute top-0 right-0 flex opacity-0 transition-all"
		>
			<Trash
				onClick={() => onRemove?.({ type, id })}
				className="text-gray-200 w-6 h-6 py-1.5  px-1.5 cursor-pointer bg-blue-600/80  hover:text-white hover:bg-blue-600 "
			/>
			<div {...handlerProps}>
				<Move className="text-gray-200 w-6 h-6 py-1.5 px-1.5 cursor-pointer  bg-blue-600/80  hover:text-white hover:bg-blue-600" />
			</div>
		</div>
	);
};

const DefaultLibControl = ({ label }) => {
	return (
		<div className="scale-100 p-3 text-sm border-slate-200 group relative border bg-white">
			{label}
		</div>
	);
};

const DefaultRowPlaceholder = () => {
	return (
		<div className="h-[45px] flex justify-center items-center text-blue-600/60 text-sm bg-sky-100/40 border-2 border-sky-500/20 border-dashed m-2 rounded-sm">
			Drag the component here.
		</div>
	);
};

export {
	DefaultColControl,
	DefaultRowControl,
	DefaultLibControl,
	DefaultRowPlaceholder,
};
