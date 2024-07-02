import { CSSProperties, useState } from "react";

interface IActionButtonProps {
	readonly label: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function ActionButton(props: IActionButtonProps) {
	/**
	 * 1. touchstart
	 * 2. touchmove
	 * 3. touchend
	 * 4. mouseover
	 * 5. mousemove
	 * 6. mousedown
	 * 7. mouseup
	 * 8. click
	 */
	const [hover, setHover] = useState(false);

	return (
		<button
			className={props.className}
			type="button"
			style={{
				display: "flex",
				alignItems: "center",
				boxSizing: "border-box",
				backgroundColor: props.isActive ? "dodgerblue" : "#e0e0e0e0",
				color: props.isActive ? "white" : "slategray",
				border: "none",
				padding: 0,
				paddingRight: 12,
				borderRadius: 12,
				textWrap: "nowrap",
				opacity: hover ? 0.6 : 1,
				overflow: "hidden",
				...props.style,
			}}
			onFocus={() => {}}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onTouchStart={() => setHover(true)}
			onMouseUp={() => setHover(false)}
			onClick={props.onClick}>
			<span style={{ paddingTop: 8, paddingBottom: 8, paddingLeft: 12 }}>{props.label}</span>
		</button>
	);
}
