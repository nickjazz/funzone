import map from "lodash/map";

const schemaToFunzone = (xs) => {
	const rows: React.SetStateAction<string[]> = [];
	const cols: string[][] = [];
	const items: { [x: string]: any } = {};

	map(xs, (x) => {
		rows.push(x.id);
		cols.push([...x?.children?.map((xc) => xc?.id)]);
		map(x?.children, (item) => {
			if (!item?.id) return;
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
					children: items[col],
				};
			}),
		};
	});
	return next;
};

export { schemaToFunzone, funzoneToSchema };
