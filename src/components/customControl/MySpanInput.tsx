import React, { useState, useEffect } from "react";

const MySpanInput = ({ label, value, onChange }) => {
	const [data, setData] = useState("");

	useEffect(() => {
		setData(value);
	}, [value]);

	const handleOnChange = (e) => {
		setData(e?.target?.value);
		onChange(e?.target?.value);
	};

	return (
		<div className="flex flex-row items-center gap-1">
			<div className="pr-3 font-bold capitalize w-20">{label}</div>
			<input
				type="number"
				className="py-1.5 px-2 rounded-sm w-full text-sm border-2 border-slate-400 text-slate-500 "
				value={data}
				onChange={handleOnChange}
			/>
		</div>
	);
};

export default MySpanInput;
