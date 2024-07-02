import { CSSProperties, useCallback, useMemo } from "react";
import ActionButton from "./ActionButton";
import styles from "./styles.module.css";

type TData = { label: string; isActive: boolean; onClick: () => void };

interface IButtonGroupProps {
	readonly buttonData: TData[];
	readonly title: string;
	readonly buttonSize?: number;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function ButtonGroup(props: IButtonGroupProps) {
	const buttonGroupStyle = useMemo<CSSProperties>(() => {
		const size = props.buttonSize === undefined ? 70 : props.buttonSize;
		return {
			boxSizing: "border-box",
			justifyContent: "center",
			width: size,
		};
	}, [props.buttonSize]);

	const lastIndex = useMemo(() => {
		return props.buttonData.length - 1;
	}, [props.buttonData]);

	const renderButtons = useCallback(
		(item: TData, index: number) => {
			const isFirst = index === 0;
			const isLast = index === lastIndex;

			let btnStyles: CSSProperties;
			if (isFirst) {
				btnStyles = { borderTopRightRadius: 0, borderBottomRightRadius: 0 };
			} else if (isLast) {
				btnStyles = {
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
					borderLeft: "0.5px solid darkgray",
				};
			} else {
				btnStyles = {
					borderRadius: 0,
					borderLeft: "0.5px solid darkgray",
				};
			}

			return (
				<ActionButton
					key={item.label}
					label={item.label}
					isActive={item.isActive}
					style={{
						...buttonGroupStyle,
						...btnStyles,
					}}
					onClick={item.onClick}
				/>
			);
		},
		[lastIndex, buttonGroupStyle],
	);

	return (
		<div className={props.className} style={{ ...props.style }}>
			<div className={styles.subLabel}>{props.title}</div>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{props.buttonData.map(renderButtons)}
			</div>
		</div>
	);
}
