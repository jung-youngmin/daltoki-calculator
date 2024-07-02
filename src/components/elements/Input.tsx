import _ from "lodash";
import { CSSProperties, KeyboardEvent, useCallback, useEffect, useState } from "react";
import styles from "../styles.module.css";

export interface IInputProps {
	readonly label?: string;
	readonly inputType: "text" | "number";
	readonly isRequired: boolean;
	readonly inputWidth?: number;
	readonly defaultVal?: string;
	readonly value?: string;
	readonly min?: number;
	readonly max?: number;
	readonly step?: number;
	readonly placeholder?: string;
	readonly onChange: (text: string) => void;
	readonly onEnterKey?: () => void;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function Input(props: IInputProps) {
	const {
		label,
		inputType,
		isRequired,
		inputWidth = 100,
		defaultVal = "",
		value,
		step = 10,
		placeholder,
		onChange,
		onEnterKey,
	} = props;

	const [text, setText] = useState(defaultVal);
	useEffect(() => {
		if (value !== undefined) {
			setText(value);
		}
	}, [value]);

	// const onSubmit = useCallback(() => {
	// 	if (text === "") {
	// 		return;
	// 	} else {
	// 		onClickSubmit(text);
	// 	}
	// }, [text, onClickSubmit]);

	const onEnter = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				onEnterKey?.();
			}
		},
		[onEnterKey],
	);

	return (
		<div className={props.className} style={props.style}>
			{!_.isUndefined(label) && <span className={styles.subLabel}>{label}</span>}
			<input
				type={inputType}
				value={text}
				placeholder={placeholder}
				className={styles.myInput}
				required={isRequired}
				step={step}
				min={props.min}
				max={props.max}
				style={{
					boxSizing: "border-box",
					width: inputWidth,
					padding: 8,
					borderRadius: 12,
					borderWidth: 1,
					borderStyle: "solid",
					borderColor: "darkgray",
					textAlign: inputType === "number" ? "right" : "initial",
				}}
				onChange={e => {
					setText(e.target.value);
					onChange(e.target.value);
				}}
				onKeyDown={onEnter}
			/>
		</div>
	);
}
