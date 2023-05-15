import React, { useState, useEffect } from "react";

const ObjectInput = ({ label, value, onChange }) => {
	const [data, setData] = useState("");

	const checkData = (x) => {
		try {
			var testIfJson = JSON.parse(x);
			if (typeof testIfJson == "object") {
				return true;
			} else {
				return false;
			}
		} catch {
			return false;
		}
	};

	useEffect(() => {
		const jsonData = checkData(value)
			? value
			: JSON.stringify(value, undefined, 2);

		setData(jsonData);
	}, [value]);

	const handleOnChange = (value) => {
		setData(value);
		onChange(JSON.parse(value));
	};

	return (
		<div className="flex flex-col gap-1.5">
			<div className="text-slate-600 capitalize text-xs">{label}</div>
			{/* <textarea
				className="py-1.5 px-2 min-h-[300px] rounded-sm border w-full text-sm focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-0"
				value={JSON.stringify(data, undefined, 2)}
				onChange={handleOnChange}
				onBlur={(e) => onChange(e?.target?.value)}
			/> */}
			<div
				dangerouslySetInnerHTML={{ __html: `<pre>${data}</pre>` }}
				onBlur={(e) => handleOnChange(e?.target?.innerText)}
				contentEditable
				className="py-1.5 text-xs px-2 min-h-[300px] rounded-sm border w-full focus:outline-none focus:border-slate-500 focus:ring-slate-500 focus:ring-0"
			/>
			<span className="text-slate-400 text-xs">save onblur</span>
		</div>
	);
};

export default ObjectInput;
