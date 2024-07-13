import _ from "lodash";
import { CSSProperties, ChangeEvent } from "react";
import styles from "../styles.module.css";

export interface ISelectBoxProps {
	readonly optionList: (number | string)[];
	readonly value?: number | string;
	readonly onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function SelectBox(props: ISelectBoxProps) {
	return (
		<select
			onChange={props.onChange}
			value={props.value}
			className={`${styles.pv8} ${styles.smyInput} ${props.className}`}
			style={{
				display: "flex",
				boxSizing: "border-box",
				padding: 8,
				borderRadius: 12,
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: "darkgray",
				...props.style,
			}}>
			{_.map(props.optionList, (item, idx) => {
				return <option key={item}>{item}</option>;
			})}
		</select>
	);
}
