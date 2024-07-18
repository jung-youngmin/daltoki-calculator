import styles from "../styles.module.css";

export interface IHighlightTextProps {
	readonly text: string;
	readonly isHighlight: boolean;
}
export default function HighlightText(props: IHighlightTextProps) {
	return (
		<div
			className={styles["data-item"]}
			style={
				props.isHighlight
					? { boxShadow: "inset 0px -10px 0 #D9FCDB", fontWeight: "bold" }
					: undefined
			}>
			{props.text}
		</div>
	);
}
