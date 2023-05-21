import map from "lodash/map";

const schemaToFunzone = (xs) => {
	const rows: React.SetStateAction<string[]> = [];
	const cols: string[][] = [];
	const items: { [x: string]: any } = {};

	map(xs, (x) => {
		rows.push(x.id);

		// add row info
		items[x.id] = x;

		// add col (as a layout)
		cols.push([...x?.children?.map((xc) => xc?.id)]);

		// add nested
		map(x?.children, (item) => {
			if (!item?.id) return;

			map(item?.props.items, (x) => {
				if (!x || !x.id) return;
				items[x?.id] = x;
			});

			items[item.id] = item;
		});
	});

	return { rows, cols, items };
};

const funzoneToSchema = (rows, cols, items) => {
	const next = map(rows, (row, index) => {
		const rowItem = items?.[row];

		return {
			id: row,
			children: map(cols[index], (col) => {
				const colItem = items?.[col];
				return {
					id: col,
					type: colItem?.type,
					children: colItem,
					props: colItem?.props || {},
					actions: colItem?.actions || {},
				};
			}),
			props: rowItem?.props,
			actions: rowItem?.actions || {},
		};
	});
	return [...next];
};

export { schemaToFunzone, funzoneToSchema };
