import React from "react";
import { Textarea } from "@mantine/core";
import { useFormContext } from "react-hook-form";

const TextLong = ({ name, label, placeholder }) => {
	const { register } = useFormContext(); // retrieve all hook methods

	return (
		<div className="p-2">
			<Textarea
				mt="md"
				label={label || "Text Long"}
				placeholder={placeholder}
				{...register(name || "text-long")}
			/>
		</div>
	);
};
export default TextLong;
