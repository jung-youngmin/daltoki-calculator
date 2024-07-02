import _ from "lodash";
import { PropsWithChildren } from "react";
import styles from "../styles.module.css";

export interface IChapterRowProps {
	readonly showLabel?: boolean;
	readonly label?: string;
	readonly img?: string;
}

export default function ChapterRow(props: PropsWithChildren<IChapterRowProps>) {
	const itemWidth = 80;
	return (
		<div className={styles["chapter-row"]}>
			{props.showLabel && props.img && (
				<div style={{ width: itemWidth }}>
					<img src={props.img} alt={props.img} width={itemWidth / 2} />
				</div>
			)}
			{props.showLabel && !_.isUndefined(props.label) && (
				<div
					className={styles.subLabel}
					style={{ width: itemWidth, wordBreak: "keep-all" }}>
					{props.label}
				</div>
			)}
			{props.children}
		</div>
	);
}
