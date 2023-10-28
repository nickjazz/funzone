import React from "react";
import { TextInput } from "@mantine/core";
import { useFormContext } from "react-hook-form";

const TextShort = ({ name, label, placeholder }) => {
	const { register } = useFormContext();
	return (
		<div className="p-2">
			<TextInput
				mt="md"
				label={label || "Text Short"}
				placeholder={placeholder}
				{...register(name || "text-short")}
			/>
		</div>
	);
};
export default TextShort;
