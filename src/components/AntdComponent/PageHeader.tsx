import React from "react";

const PageHeader = ({ title }) => {
	return (
		<div className="px-3 border-b pt-6">
			<div className="mb-4 text-[#1f2c73] font-bold text-lg">{title}</div>
		</div>
	);
};

export default PageHeader;
