import React, { useState, useEffect } from "react";

const MyInput = ({ label, value, onChange }) => {
	const [data, setData] = useState("");

	useEffect(() => {
		setData(value);
	}, [value]);

	const handleOnChange = (e) => {
		setData(e?.target?.value);
		onChange(e?.target?.value);
	};

	return (
		<div className="flex flex-col gap-1">
			<div className="pr-3 font-bold capitalize">{label}</div>
			<input
				className="py-1.5 px-2 rounded-sm w-full text-sm border-2 border-slate-400 text-slate-500 "
				value={data}
				onChange={handleOnChange}
			/>
		</div>
	);
};

export default MyInput;
