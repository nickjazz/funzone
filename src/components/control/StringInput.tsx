import React, { useState, useEffect } from "react";

const StringInput = ({ label, value, onChange }) => {
	const [data, setData] = useState("");

	useEffect(() => {
		console.log("value", value);
		setData(value);
	}, [value]);

	const handleOnChange = (e) => {
		setData(e?.target?.value);
	};

	return (
		<div className="flex flex-col gap-1.5">
			<div className="text-slate-600 capitalize text-xs">{label}</div>
			<input
				className="py-1.5 px-2 rounded-sm border w-full text-sm focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-0"
				value={data}
				onChange={handleOnChange}
				onBlur={(e) => onChange(e?.target?.value)}
			/>
		</div>
	);
};

export default StringInput;
