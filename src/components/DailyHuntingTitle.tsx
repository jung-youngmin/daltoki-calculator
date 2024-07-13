import { CSSProperties } from "react";
import ChapterRow from "./elements/ChapterRow";

export interface IDailyHuntingTitleProps {}

export default function DailyHuntingTitle(props: IDailyHuntingTitleProps) {
	const upperCardStyle: CSSProperties = {
		marginTop: 0,
		paddingTop: 0,
		paddingBottom: 0,
		borderBottomLeftRadius: 0,
		borderBottomRightRadius: 0,
	};
	const lowerCardStyle: CSSProperties = {
		marginTop: 0,
		paddingTop: 0,
		paddingBottom: 0,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	};

	return (
		<div>
			<ChapterRow showRowTitle label="챕터" style={upperCardStyle} isFirst isLast={false} />
			<ChapterRow
				showRowTitle
				label="스테이지"
				style={lowerCardStyle}
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				label="1시간 사냥한 몹수"
				style={{ ...upperCardStyle, marginTop: 8 }}
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				label="1시간 이벤트 몹수"
				style={lowerCardStyle}
				isFirst
				isLast={false}
			/>
			<ChapterRow showRowTitle label="등반 효율" isFirst isLast={false} />
			<ChapterRow showRowTitle label="무기 손실 X" isFirst isLast={false} />
			<ChapterRow
				showRowTitle
				imgName="weapon_lyn_legend_1.png"
				label="레1무기"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="weapon_enhancer.png"
				label="무강석"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="skill_enhancer.png"
				label="스강석"
				isFirst
				isLast={false}
			/>
			<ChapterRow showRowTitle imgName="ruby.png" label="루비" isFirst isLast={false} />
			<ChapterRow
				showRowTitle
				imgName="mysterious_star_piece.png"
				label="의문별조"
				isFirst
				isLast={false}
			/>
			<ChapterRow showRowTitle imgName="gold.png" label="골드" isFirst isLast={false} />
			<ChapterRow showRowTitle label="경험치" isFirst isLast={false} />
			<ChapterRow
				showRowTitle
				imgName="friend_tome.png"
				label="동료서"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="friend_token.png"
				label="동료증표"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="star_fragment.png"
				label="별파"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="transcendental_enhancer.png"
				label="초강석"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="power_star_piece.png"
				label="힘별조"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="dimensional_shard.png"
				label="차원조각"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="weapon_draw_ticket.png"
				label="무뽑권"
				isFirst
				isLast={false}
			/>
			<ChapterRow
				showRowTitle
				imgName="curio_summoning_stone.png"
				label="성물석"
				isFirst
				isLast={false}
			/>
		</div>
	);
}
