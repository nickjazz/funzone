import React from "react";

const PageHeader = ({ title }) => {
	return (
		<div className="p-3 text-xs text-white h-[70px] bg-[#A459D1]">
			title: {title}
		</div>
	);
};

export default PageHeader;
