import React, { useState } from "react";
import { Funzone, FunBoard, FunSensor, FunComponents } from "../../components";
import { NavBar, PageHeader, Form } from "../../components/CustomComponent";
import schame from "./schema3.json";

export default {
	title: "Whiteboard",
	component: Funzone,
};

/**
 *
 * string
 * number
 * boolean
 * json
 *
 */

const mockItems = schame;

const Template = () => {
	const [data, setData] = useState(mockItems);
	const [next, setNext] = useState(mockItems);
	const components = [
		{
			label: "PageHeader",
			group: "block",
			key: "PageHeader",
			markup: PageHeader,
			defaultProps: { span: 4, title: "default title" },
		},
		{
			label: "NavBar",
			group: "block",
			key: "NavBar",
			markup: NavBar,
			defaultProps: { span: 12 },
		},

		{
			label: "Form",
			group: "inline",
			key: "Form",
			markup: Form,
			defaultProps: { span: 4 },
		},
	];

	const handleChange = (e) => {
		console.log("[handleChange]", e);
		setNext(e);
	};

	return (
		<div className="flex gap-10">
			<Funzone ui={components} schema={data} onChange={handleChange}>
				<FunComponents className="w-[200px] border-none flex flex-col gap-2" />
				<FunBoard className="flex-1 max-w-[60vw] my-4 rounded-sm bg-slate-100" />
				<FunSensor className="flex-1 max-w-[300px] pl-4" />
			</Funzone>
		</div>
	);
};

export const Primary = Template.bind({});
