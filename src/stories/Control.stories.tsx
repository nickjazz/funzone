import React from "react";
import { StringInput } from "../components/control";

export default {
	title: "StringInput",
	component: StringInput,
};

const Template = () => {
	return (
		<div className="flex gap-6">
			<StringInput
				label="Alignment"
				value="Alignment"
				onChange={(e) => {
					console.log("---next---", e);
				}}
			/>
		</div>
	);
};

export const Primary = Template.bind({});
