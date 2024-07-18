import _ from "lodash";
import { ChangeEvent, CSSProperties, useCallback, useEffect, useMemo, useState } from "react";
import { dataUtils, huntingGround, stages } from "../data";
import { consts, IHuntingData, IHuntingGround, TChapters, TCharacters } from "../types";
import ChapterRow from "./elements/ChapterRow";
import HighlightText from "./elements/HighlightText";
import Input from "./elements/Input";
import SelectBox from "./elements/SelectBox";
import styles from "./styles.module.css";

export interface IDailyHuntingProps {
	readonly character: TCharacters;
	readonly colIdx: number;
	readonly onChangeHuntingData: (index: number, data: IHuntingData) => void;
	readonly isLast?: boolean;
	readonly weaponPerDay: number;
	readonly isMaxWeapon: boolean;
	readonly noWeaponLoss: number;
	readonly isMaxNoLoss: boolean;
}

export default function DailyHunting(props: IDailyHuntingProps) {
	const [chapter, setChapter] = useState<TChapters>(5);
	const [stage, setStage] = useState<number>(1);
	const [monsterPerHour, setMonsterPerHour] = useState<number>(0);
	const [eventMonsterPerHour, setEventMonsterPerHour] = useState<number>(0);

	const subStageList = useMemo(() => {
		switch (chapter) {
			case 5:
				return stages.STAGE_5;
			case 6:
				return stages.STAGE_6;
			case 7:
				return stages.STAGE_7;
			case 8:
				return stages.STAGE_8;
			case 9:
				return stages.STAGE_9;
			default:
				return stages.STAGE_5;
		}
	}, [chapter]);

	const characterStorageKey = useMemo(() => {
		const { lynHuntingData, niaHuntingData, mihoHuntingData, yunaHuntingData } =
			consts.LOCAL_STORAGE_KEYS;
		let storageKey: keyof typeof consts.LOCAL_STORAGE_KEYS;
		switch (props.character) {
			case "lyn":
				storageKey = lynHuntingData;
				break;
			case "nia":
				storageKey = niaHuntingData;
				break;
			case "miho":
				storageKey = mihoHuntingData;
				break;
			case "yuna":
				storageKey = yunaHuntingData;
				break;
			default:
				storageKey = lynHuntingData;
		}
		return storageKey;
	}, [props.character]);

	const onChangeChapter = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const selected = _.toSafeInteger(event.target.value);
			if (
				selected === 5 ||
				selected === 6 ||
				selected === 7 ||
				selected === 8 ||
				selected === 9
			) {
				setChapter(selected);
				dataUtils.setHuntingDataLocalStorage(
					characterStorageKey,
					{ chapter: selected },
					props.colIdx,
				);
			}
		},
		[characterStorageKey, props.colIdx],
	);

	const onChangeStage = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const selected = _.toSafeInteger(event.target.value);
			setStage(selected);
			dataUtils.setHuntingDataLocalStorage(
				characterStorageKey,
				{ stage: selected },
				props.colIdx,
			);
		},
		[characterStorageKey, props.colIdx],
	);

	const onChangeMonster = useCallback(
		(text: string) => {
			const monster = _.toSafeInteger(text);
			setMonsterPerHour(monster);
			dataUtils.setHuntingDataLocalStorage(
				characterStorageKey,
				{ monsterPerHour: monster },
				props.colIdx,
			);
		},
		[characterStorageKey, props.colIdx],
	);

	const onChangeEventMonster = useCallback(
		(text: string) => {
			const monster = _.toSafeInteger(text);
			setEventMonsterPerHour(monster);
			dataUtils.setHuntingDataLocalStorage(
				characterStorageKey,
				{ eventMonsterPerHour: monster },
				props.colIdx,
			);
		},
		[characterStorageKey, props.colIdx],
	);

	useEffect(() => {
		if (props.colIdx < 0) {
			return;
		}

		const huntingData = dataUtils.getHuntingDataLocalStorage(characterStorageKey);
		if (!_.isUndefined(huntingData[props.colIdx])) {
			const {
				chapter: chap,
				stage: stg,
				monsterPerHour: mph,
				eventMonsterPerHour: emph,
			} = huntingData[props.colIdx];
			setChapter(chap);
			setStage(stg);
			setMonsterPerHour(mph);
			setEventMonsterPerHour(emph);
		}
	}, [characterStorageKey, props.colIdx]);

	const currentStage = useMemo(() => {
		const { LynHuntingGround, NiaHuntingGround, MihoHuntingGround, YunaHuntingGround } =
			huntingGround;

		let ground: IHuntingGround[];
		switch (props.character) {
			case "lyn":
				ground = LynHuntingGround;
				break;
			case "nia":
				ground = NiaHuntingGround;
				break;
			case "miho":
				ground = MihoHuntingGround;
				break;
			case "yuna":
				ground = YunaHuntingGround;
				break;
			default:
				ground = LynHuntingGround;
		}

		const curStage = _.find(ground, (item: IHuntingGround, index) => {
			return item.chapter === chapter && item.stage === stage;
		});

		if (_.isUndefined(curStage)) {
			return consts.DEFAULT_STAGE;
		}
		return curStage;
	}, [chapter, props.character, stage]);

	const { onChangeHuntingData } = props;

	useEffect(() => {
		onChangeHuntingData(props.colIdx, {
			chapter: chapter,
			stage: stage,
			monsterPerHour: monsterPerHour,
			eventMonsterPerHour: eventMonsterPerHour,
		});
	}, [chapter, eventMonsterPerHour, monsterPerHour, onChangeHuntingData, props.colIdx, stage]);

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

	const itemWidth = 80;

	return (
		<div>
			<ChapterRow label="챕터" style={upperCardStyle} isLast={props.isLast}>
				<SelectBox
					optionList={stages.MAIN_STAGE}
					value={chapter}
					style={{ width: itemWidth }}
					onChange={onChangeChapter}
				/>
			</ChapterRow>
			<ChapterRow label="스테이지" style={lowerCardStyle} isLast={props.isLast}>
				<SelectBox
					optionList={subStageList}
					value={stage}
					style={{ width: itemWidth }}
					onChange={onChangeStage}
				/>
			</ChapterRow>
			<ChapterRow
				label="1시간 사냥한 몹수"
				style={{ ...upperCardStyle, marginTop: 8 }}
				isLast={props.isLast}>
				<Input
					inputType="number"
					isRequired={false}
					inputWidth={itemWidth}
					value={monsterPerHour.toString()}
					onChange={onChangeMonster}
				/>
			</ChapterRow>
			<ChapterRow label="1시간 이벤트 몹수" style={lowerCardStyle} isLast={props.isLast}>
				<Input
					inputType="number"
					isRequired={false}
					inputWidth={itemWidth}
					value={eventMonsterPerHour.toString()}
					onChange={onChangeEventMonster}
				/>
			</ChapterRow>
			<ChapterRow label="등반 효율" isLast={props.isLast}>
				<div className={styles["data-item"]}>{`${(
					currentStage.climbingEfficiency * 100
				).toFixed(2)}%`}</div>
			</ChapterRow>
			<ChapterRow label="무기 손실 X" isLast={props.isLast}>
				<HighlightText
					text={props.noWeaponLoss.toFixed(1)}
					isHighlight={props.isMaxNoLoss}
				/>
			</ChapterRow>
			<ChapterRow imgName="weapon_lyn_legend_1.png" label="레1무기" isLast={props.isLast}>
				<HighlightText
					text={props.weaponPerDay.toFixed(4)}
					isHighlight={props.isMaxWeapon}
				/>
			</ChapterRow>
			<ChapterRow imgName="weapon_enhancer.png" label="무강석" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="skill_enhancer.png" label="스강석" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="ruby.png" label="루비" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="mysterious_star_piece.png" label="의문별조" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="gold.png" label="골드" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow label="경험치" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="friend_tome.png" label="동료서" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="friend_token.png" label="동료증표" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="star_fragment.png" label="별파" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="transcendental_enhancer.png" label="초강석" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="power_star_piece.png" label="힘별조" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="dimensional_shard.png" label="차원조각" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="weapon_draw_ticket.png" label="무뽑권" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
			<ChapterRow imgName="curio_summoning_stone.png" label="성물석" isLast={props.isLast}>
				<div className={styles["data-item"]}>TODO</div>
			</ChapterRow>
		</div>
	);
}
