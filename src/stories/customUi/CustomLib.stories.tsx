import React from "react";
import cx from "classnames";
import { Funzone, FunBoard, FunSensor, FunComponents } from "../../components";
import { NavBar, PageHeader, Form } from "../../components/CustomComponent";
import schame from "./schema2.json";
import { MyInput, MySpanInput } from "../../components/customControl";

export default {
	title: "Custom Component",
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

const Template = () => {
	const components = [
		{
			label: "PageHeader",
			group: "block",
			key: "PageHeader",
			markup: PageHeader,
			defaultProps: { span: 12, title: "default title" },
			control: [
				{
					label: "Name",
					children: [{ label: "title", type: "MyInput" }],
				},
				{
					label: "Style",
					children: [{ label: "span", type: "MySpanInput" }],
				},
			],
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

	const controlComponents = {
		MyInput: { label: "MyInput", key: "MyInput", markup: MyInput },
		MySpanInput: {
			label: "MySpanInput",
			key: "MySpanInput",
			markup: MySpanInput,
		},
	};

	/**
	 * custom component
	 */

	const RowPlaceholder = () => {
		return (
			<div className="p-2 py-5 m-2 border text-gray-400 border-yellow-400 bg-yellow-50 opacity-70 text-sm flex justify-center items-center">
				Your components here.
			</div>
		);
	};

	const LibItem = ({ label }) => {
		return (
			<div
				className={cx(
					"border py-2 px-4 text-sm text-slate-600 rounded-sm",
					"bg-slate-50 hover:bg-slate-100 text-gray-500 font-bold"
				)}
			>
				{label}
			</div>
		);
	};

	return (
		<div className="flex gap-6">
			<Funzone
				ui={components}
				control={controlComponents}
				schema={schame}
				renderLibHandler={LibItem}
				renderRowPlaceholder={RowPlaceholder}
			>
				<FunComponents className="w-[200px] border-none flex flex-col gap-2" />
				<FunBoard className="flex-1 max-w-[60vw] my-4 rounded-sm bg-slate-100"></FunBoard>
				<FunSensor className="flex-1 max-w-[300px] pl-4" />
			</Funzone>
		</div>
	);
};
export const Primary = Template.bind({});
