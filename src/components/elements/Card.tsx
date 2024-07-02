import { Property } from "csstype";
import { CSSProperties, PropsWithChildren, useState } from "react";
import TouchableTitle from "./TouchableTitle";

export interface ICardProps {
	readonly title?: string;
	readonly flexDirection: Property.FlexDirection;
	readonly flexWrap?: Property.FlexWrap;
	readonly hideShadow?: boolean;
	readonly showCard?: boolean;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function Card(props: PropsWithChildren<ICardProps>) {
	const {
		title = "",
		flexDirection,
		flexWrap,
		hideShadow = false,
		showCard = true,
		style,
		className,
	} = props;

	const [isActive, setIsActive] = useState(showCard);

	return (
		<div>
			{title.length > 0 && (
				<TouchableTitle
					title={title}
					hNum={3}
					isActive={isActive}
					onClick={() => setIsActive(prev => !prev)}
				/>
			)}
			<div
				className={className}
				style={{
					boxSizing: "border-box",
					display: isActive ? "flex" : "none",
					flexDirection,
					flexWrap,
					backgroundColor: "white",
					borderRadius: 16,
					padding: 16,
					boxShadow: hideShadow ? "none" : "0px 0px 16px 0px #cfcfcf",
					...style,
				}}>
				{props.children}
			</div>
		</div>
	);
}
