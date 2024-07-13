import { CSSProperties, PropsWithChildren, useState } from "react";
import styles from "../styles.module.css";
import TouchableTitle from "./TouchableTitle";

export interface ICardProps {
	readonly title?: string;
	readonly hideShadow?: boolean;
	readonly showCard?: boolean;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function Card(props: PropsWithChildren<ICardProps>) {
	const { title = "", hideShadow = false, showCard = true, style, className } = props;

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
				className={`${styles.card} ${hideShadow ? "" : styles.shadow} ${className}`}
				style={{
					display: isActive ? "flex" : "none",
					...style,
				}}>
				{props.children}
			</div>
		</div>
	);
}
