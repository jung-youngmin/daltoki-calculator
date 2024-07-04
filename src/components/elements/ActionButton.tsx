import _ from "lodash";
import { CSSProperties, useState } from "react";
import { dataUtils } from "../../data";

interface IActionButtonProps {
	readonly label: string;
	readonly isActive: boolean;
	readonly onClick: () => void;
	readonly buttonWidth?: number;
	readonly imgName?: string;
	readonly style?: CSSProperties;
	readonly className?: string;
}

export default function ActionButton(props: IActionButtonProps) {
	const { buttonWidth = 70 } = props;
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
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				boxSizing: "border-box",
				backgroundColor: props.isActive ? "dodgerblue" : "#e0e0e0",
				color: props.isActive ? "white" : "slategray",
				border: "none",
				padding: 0,
				borderRadius: 16,
				textWrap: "nowrap",
				opacity: hover ? 0.6 : 1,
				overflow: "hidden",
				width: buttonWidth,
				...props.style,
			}}
			onFocus={() => {}}
			onMouseOver={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onTouchStart={() => setHover(true)}
			onMouseUp={() => setHover(false)}
			onClick={props.onClick}>
			{!_.isUndefined(props.imgName) && (
				<img
					src={dataUtils.getImgPath(props.imgName)}
					alt={props.imgName}
					width={buttonWidth}
					height={buttonWidth}
					style={{
						display: "flex",
						objectFit: "contain",
						filter: props.isActive ? "none" : "blur(1px) grayscale(60%)",
					}}
				/>
			)}
			<div style={{ padding: 8 }}>{props.label}</div>
		</button>
	);
}
