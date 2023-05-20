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
		return {
			id: row,
			children: map(cols[index], (col) => {
				return {
					id: col,
					type: col?.type,
					children: items[col],
					props: items[col]?.props || {},
					actions: items[col]?.actions || {},
				};
			}),
			props: items[row]?.props,
			actions: items[row]?.actions || {},
		};
	});
	return [...next];
};

export { schemaToFunzone, funzoneToSchema };
