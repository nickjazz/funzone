import React, { useState, useContext } from "react";
import {
	Whiteboard,
	ComponentsLib,
	Funzone,
	SenSorCenter,
} from "../../components";
import { NavBar, PageHeader, Form } from "../../components/AntdComponent";
import schame from "./schema3.json";

export default {
	title: "Whiteboard",
	component: Whiteboard,
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
		// setData(e);
	};

	return (
		<div className="flex gap-10">
			<Funzone
				ui={components}
				schema={data}
				onChange={handleChange}
				// renderLibHandler={({ label }) => {
				// 	return <div className="p-2 border bg-white">{label}</div>;
				// }}
				// renderRowHandler={({ handlerProps }) => {
				// 	return <div {...handlerProps}>row handler</div>;
				// }}
				// renderColHandler={({ handlerProps, ...res }) => {
				// 	return <div {...handlerProps}>col handler</div>;
				// }}
			>
				<ComponentsLib className="w-[200px]" />
				<Whiteboard className="flex-1 max-w-[60vw]" />
				<SenSorCenter className="flex-1 max-w-[300px]" />
			</Funzone>
		</div>
	);
};

export const Primary = Template.bind({});
