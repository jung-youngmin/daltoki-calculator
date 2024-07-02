import { useMemo } from "react";
import styles from "../styles.module.css";

export interface ITouchableTitleProps {
	readonly title: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
	readonly hNum?: 1 | 2 | 3 | 4;
}

export default function TouchableTitle(props: ITouchableTitleProps) {
	const { hNum = 2 } = props;

	const heading = useMemo(() => {
		const icon = props.isActive ? " 🔻 " : " 🔺 ";
		switch (hNum) {
			case 1:
				return <h1 className={styles.title}>{icon + props.title + icon}</h1>;
			case 2:
				return <h2 className={styles.title}>{icon + props.title + icon}</h2>;
			case 3:
				return <h3 className={styles.title}>{icon + props.title + icon}</h3>;
			case 4:
				return <h4 className={styles.title}>{icon + props.title + icon}</h4>;
			default:
				return <h2 className={styles.title}>{icon + props.title + icon}</h2>;
		}
	}, [hNum, props.isActive, props.title]);

	return (
		<button
			type="button"
			style={{
				display: "flex",
				flexDirection: "column",
				padding: 0,
				border: "none",
				background: "none",
			}}
			onClick={props.onClick}>
			{heading}
		</button>
	);
}
