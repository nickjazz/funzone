import React from "react";
const Debug = ({ hover, editId, editProps, handleChange, handleSave }) => {
	return (
		<>
			<div className="flex gap-4 items-center">
				<div className="font-bold text-sm">HOVER</div>
				<div className="text-xs">
					<div>
						{hover.type} - {hover.id}
					</div>
				</div>
				<div className="font-bold text-sm">EDIT</div>
				<div className="text-xs">
					<div>{editId}</div>
				</div>
			</div>

			{/* props */}
			<textarea
				value={JSON.stringify(editProps, undefined, 2)}
				onChange={handleChange}
				className="w-full border min-h-[200px] p-2 text-xs font-mono"
			/>
			<div
				onClick={handleSave}
				className=" cursor-pointer py-2 px-5 text-xs inline-block rounded-sm bg-sky-500 hover:bg-sky-600 text-white"
			>
				save
			</div>
		</>
	);
};

export default Debug;
