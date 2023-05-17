import React from "react";
import { useState } from "react";

const items = [
	{
		label: "Navigation One",
		key: "mail",
	},
	{
		label: "Navigation Two",
		key: "app",
		disabled: true,
	},
	{
		label: "Navigation Three - Submenu",
		key: "SubMenu",
		children: [
			{
				type: "group",
				label: "Item 1",
				children: [
					{
						label: "Option 1",
						key: "setting:1",
					},
					{
						label: "Option 2",
						key: "setting:2",
					},
				],
			},
			{
				type: "group",
				label: "Item 2",
				children: [
					{
						label: "Option 3",
						key: "setting:3",
					},
					{
						label: "Option 4",
						key: "setting:4",
					},
				],
			},
		],
	},
	{
		label: (
			<a href="https://ant.design" target="_blank" rel="noopener noreferrer">
				Navigation Four - Link
			</a>
		),
		key: "alipay",
	},
];
const NavBar = ({ data = items }) => {
	return (
		<div className="flex gap-1 border-y">
			{items?.map((item) => {
				return (
					<div key={item.key} className="p-2 text-xs ">
						{item.label}
					</div>
				);
			})}
		</div>
	);
};

export default NavBar;
