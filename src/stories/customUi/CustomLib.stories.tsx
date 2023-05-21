import React from "react";
import map from "lodash/map";
import isEmpty from "lodash/isEmpty";
import cx from "classnames";
import {
	Whiteboard,
	ComponentsLib,
	Funzone,
	SenSorCenter,
} from "../../components";
import { NavBar, PageHeader, Form } from "../../components/CustomComponent";
import schame from "./schema2.json";
import { MyInput, MySpanInput } from "../../components/customControl";

export default {
	title: "Custom Component",
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

	const renderControlPanel = ({ editProps, onChange }) => {
		if (isEmpty(editProps)) return <div></div>;

		console.log("editProps", editProps);

		return (
			<div className="flex flex-col gap-4 mt-1 border empty:border-none rounded-sm">
				{map(editProps, (group, index) => {
					if (isEmpty(group.children)) return null;
					return (
						<div
							key={`${group.label}-${index}`}
							className="flex flex-col gap-4 pb-4"
						>
							<div className="bg-slate-100 p-2 px-4 text-sm text-slate-600 capitalize">
								{group.label}
							</div>
							<div className="p-2 px-4 flex flex-col gap-4">
								{map(group.children, (sub, index) => {
									const DisplayControl = sub?.markup;
									return (
										<DisplayControl
											key={`${sub?.type}-${index}`}
											label={sub?.label}
											value={sub?.value}
											onChange={(x: string) =>
												onChange({ key: sub?.label, value: x })
											}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
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
				// renderRowHandler={({ handlerProps }) => {
				// 	return <div {...handlerProps}>row handler</div>;
				// }}
				// renderColHandler={({ handlerProps, ...res }) => {
				// 	return <div {...handlerProps}>col handler</div>;
				// }}
				renderRowPlaceholder={RowPlaceholder}
			>
				<ComponentsLib className="w-[200px] border-none flex flex-col gap-2" />
				<Whiteboard className="flex-1 max-w-[60vw]" />
				<SenSorCenter className="flex-1 max-w-[300px] pl-4" />
			</Funzone>
		</div>
	);
};

export const Primary = Template.bind({});
