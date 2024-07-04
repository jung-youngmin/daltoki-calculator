import _ from "lodash";
import { CSSProperties, useCallback, useMemo } from "react";
import styles from "../styles.module.css";
import ActionButton from "./ActionButton";

type TData = {
	readonly label: string;
	readonly img?: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
};

interface IButtonGroupProps {
	readonly buttonData: TData[];
	readonly title?: string;
	readonly buttonWidth?: number;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function ButtonGroup(props: IButtonGroupProps) {
	const { buttonWidth = 70 } = props;

	const lastIndex = useMemo(() => {
		return props.buttonData.length - 1;
	}, [props.buttonData]);

	const renderButtons = useCallback(
		(item: TData, index: number) => {
			const isFirst = index === 0;
			const isLast = index === lastIndex;

			let btnStyles: CSSProperties;
			if (isFirst) {
				btnStyles = {
					boxSizing: "border-box",
					justifyContent: "center",
					borderTopRightRadius: 0,
					borderBottomRightRadius: 0,
				};
			} else if (isLast) {
				btnStyles = {
					boxSizing: "border-box",
					justifyContent: "center",
					borderTopLeftRadius: 0,
					borderBottomLeftRadius: 0,
					borderLeft: "0.5px solid darkgray",
				};
			} else {
				btnStyles = {
					boxSizing: "border-box",
					justifyContent: "center",
					borderRadius: 0,
					borderLeft: "0.5px solid darkgray",
				};
			}

			return (
				<ActionButton
					key={item.label}
					label={item.label}
					imgName={item.img}
					isActive={item.isActive}
					buttonWidth={buttonWidth}
					style={btnStyles}
					onClick={item.onClick}
				/>
			);
		},
		[buttonWidth, lastIndex],
	);

	return (
		<div className={props.className} style={{ borderRadius: 16, ...props.style }}>
			{!_.isUndefined(props.title) && <div className={styles.subLabel}>{props.title}</div>}
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "wrap",
					backgroundColor: "transparent",
				}}>
				{props.buttonData.map(renderButtons)}
			</div>
		</div>
	);
}
