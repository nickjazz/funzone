import React from "react";
import { Card as AntdCard } from "antd";

const { Meta } = AntdCard;

const Card = () => {
	return (
		<div className="grid grid-cols-3 justify-items-center py-4 gap-3">
			<AntdCard
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						alt="example"
						src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
					/>
				}
			>
				<Meta title="Europe Street beat" description="www.instagram.com" />
			</AntdCard>
			<AntdCard
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						alt="example"
						src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
					/>
				}
			>
				<Meta title="Europe Street beat" description="www.instagram.com" />
			</AntdCard>
			<AntdCard
				hoverable
				style={{ width: 240 }}
				cover={
					<img
						alt="example"
						src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
					/>
				}
			>
				<Meta title="Europe Street beat" description="www.instagram.com" />
			</AntdCard>
		</div>
	);
};

export default Card;
