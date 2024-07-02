import _ from "lodash";
import { CSSProperties } from "react";
import styles from "../styles.module.css";
import Input from "./Input";

export interface IInputWithTitleProps {
	readonly title: string;
	readonly inputType: "number" | "text";
	readonly onChangeText: (text: string) => void;
	readonly placeholder?: string;
	readonly unit?: string;
	readonly style?: CSSProperties;
}

export default function InputWithTitle(props: IInputWithTitleProps) {
	return (
		<div
			style={{
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
				justifyContent: "space-between",
				...props.style,
			}}>
			<div className={styles.subLabel}>{props.title}</div>
			<div style={{ flexDirection: "row", alignItems: "center", marginLeft: 16 }}>
				<Input
					placeholder={props.placeholder}
					inputType={props.inputType}
					onChange={props.onChangeText}
					isRequired={false}
				/>
				{!_.isUndefined(props.unit) && (
					<div className={styles.subLabel} style={{ marginLeft: 4 }}>
						{props.unit}
					</div>
				)}
			</div>
		</div>
	);
}
