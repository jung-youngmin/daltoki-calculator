import _ from "lodash";
import { CSSProperties, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { dataUtils } from "../../data";
import styles from "../styles.module.css";

export interface IChapterRowProps {
	readonly showRowTitle?: boolean;
	readonly label?: string;
	readonly imgName?: string;
}

export default function ChapterRow(props: PropsWithChildren<IChapterRowProps>) {
	const itemWidth = 80;

	const [imgError, setImgError] = useState<boolean>(false);
	useEffect(() => {
		setImgError(false);
	}, [props.imgName]);

	const showImg = props.showRowTitle && !_.isUndefined(props.imgName) && imgError === false;
	const showLabel = props.showRowTitle && !_.isUndefined(props.label);

	const labelStyle = useMemo<CSSProperties>(() => {
		if (showImg) {
			return {
				position: "absolute",
				width: itemWidth,
				wordBreak: "keep-all",
				fontSize: "0.7rem",
				// left: -8,
				// top: 8,
				bottom: 4,
				left: 32,
			};
		}

		return {
			width: itemWidth,
			wordBreak: "keep-all",
		};
	}, [showImg]);

	return (
		<div className={styles["chapter-row"]}>
			{showImg && (
				<div style={{ width: itemWidth }}>
					<img
						src={dataUtils.getImgPath(props.imgName)}
						alt={props.label}
						width={itemWidth / 2}
						height={itemWidth / 2}
						style={{ objectFit: "contain" }}
						onError={() => setImgError(true)}
					/>
				</div>
			)}
			{showLabel && (
				<div className={styles.subLabel} style={labelStyle}>
					{props.label}
				</div>
			)}
			{props.children}
		</div>
	);
}
