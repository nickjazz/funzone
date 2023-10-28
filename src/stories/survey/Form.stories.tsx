import React from "react";
import cx from "classnames";
import { MantineProvider, createTheme } from "@mantine/core";
import { Funzone, FunBoard, FunSensor, FunComponents } from "../../components";
import { TextLong, TextShort } from "../../components/FormItems";
import schame from "./schema4.json";
import { MyInput, MySpanInput } from "../../components/customControl";

// custom lib
import "@mantine/core/styles.css";
import { useForm, FormProvider } from "react-hook-form";

export default {
	title: "Form Builder",
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

const uitheme = createTheme({
	/** Put your mantine theme override here */
});

const components = [
	{
		label: "TextLong",
		key: "TextLong",
		markup: TextLong,
		defaultProps: { span: 12, title: "default title" },
		control: [
			{
				label: "label",
				children: [{ label: "label", type: "MyInput" }],
			},
			{
				label: "name",
				children: [{ label: "name", type: "MySpanInput" }],
			},
		],
	},
	{
		label: "TextShort",
		key: "TextShort",
		markup: TextShort,
		defaultProps: { span: 12 },
		control: [
			{
				label: "label",
				children: [{ label: "label", type: "MyInput" }],
			},
			{
				label: "name",
				children: [{ label: "name", type: "MySpanInput" }],
			},
		],
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

const Template = () => {
	const methods = useForm();

	const renderAddbtn = (handleAddRow, handleAddCol) => {
		return (
			<div className="flex gap-2">
				<div className="cursor-pointer p-2 border" onClick={handleAddRow}>
					Add new group
				</div>
				<div
					className="cursor-pointer p-2 border"
					onClick={() => handleAddCol({ id: "TextLong", props: { span: 12 } })}
				>
					Add new question
				</div>
				<input type="submit" />
			</div>
		);
	};

	const theme = {
		row: "m-2",
		editFrameBorder: "border border-slate-400",
		hoverFrameBorder: "border border-blue-400",
	};

	const onSubmit = (data) => console.log(data);

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)} className="flex gap-6">
				<MantineProvider theme={uitheme}>
					<Funzone
						ui={components}
						control={controlComponents}
						schema={schame}
						renderLibHandler={LibItem}
						renderRowPlaceholder={RowPlaceholder}
						theme={theme}
					>
						<FunComponents className="w-[200px] border-none flex flex-col gap-2" />
						<FunBoard className="flex-1 max-w-[60vw] my-4 rounded-sm bg-slate-100">
							{renderAddbtn}
						</FunBoard>
						<FunSensor className="flex-1 max-w-[300px] pl-4" />
					</Funzone>
				</MantineProvider>
			</form>
		</FormProvider>
	);
};

export const Primary = Template.bind({});
