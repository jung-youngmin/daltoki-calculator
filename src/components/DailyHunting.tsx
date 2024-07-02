import _ from "lodash";
import {
	CSSProperties,
	ChangeEvent,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { BaseSettingContext } from "../context";
import { dataUtils, huntingGround, stages } from "../data";
import { IHuntingGround, IWeaponPerDayParam } from "../types/types";
import ChapterRow from "./elements/ChapterRow";
import Input from "./elements/Input";
import SelectBox from "./elements/SelectBox";

const DEFAULT_STAGE: IHuntingGround = {
	name: "",
	chapter: 0,
	stage: 0,
	climbingEfficiency: 0,
	nextClimbingEfficiency: 0,
	weapon: {
		drop: 0,
		U1: 0,
		E4: 0,
		E3: 0,
		E2: 0,
		E1: 0,
	},
};

export interface IDailyHuntingProps {
	readonly isFirst?: boolean;
	readonly style?: CSSProperties;
}

export default function DailyHunting(props: IDailyHuntingProps) {
	const { baseSetting } = useContext(BaseSettingContext);

	const [chapter, setChapter] = useState<5 | 6 | 7 | 8 | 9>(5);
	const [stage, setStage] = useState<number>(0);
	const [currentStage, setCurrentStage] = useState<IHuntingGround>(DEFAULT_STAGE);
	const [monsterPerHour, setMonsterPerHour] = useState<number>(0);

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

	const onChangeChapter = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		const selected = _.toSafeInteger(event.target.value);
		if (
			selected === 5 ||
			selected === 6 ||
			selected === 7 ||
			selected === 8 ||
			selected === 9
		) {
			setChapter(selected);
		}
	}, []);

	const onChangeStage = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
		const selected = _.toSafeInteger(event.target.value);
		setStage(selected);
	}, []);

	const onChangeMonster = useCallback((text: string) => {
		setMonsterPerHour(_.toSafeInteger(text));
	}, []);

	useEffect(() => {
		const curStage = _.find(huntingGround.LynHuntingGround, (item: IHuntingGround, index) => {
			return item.chapter === chapter && item.stage === stage;
		});

		if (_.isUndefined(curStage)) {
			setCurrentStage(DEFAULT_STAGE);
		} else {
			setCurrentStage(curStage);
		}
	}, [chapter, stage]);

	const weaponPerDay = useMemo(() => {
		if (_.isUndefined(currentStage)) {
			return 0;
		}
		const weaponParam: IWeaponPerDayParam = {
			monsterPerHour: monsterPerHour,
			goldenMimicMinus: baseSetting.goldenMimicMinus,
			itemDropPlus: baseSetting.itemDropPlus,
			weapon: currentStage.weapon,
		};
		const perDay = dataUtils.getWeaponPerDay(weaponParam);
		return Math.max(perDay, 0);
	}, [baseSetting.goldenMimicMinus, baseSetting.itemDropPlus, currentStage, monsterPerHour]);

	const containerWidth = props.isFirst ? 160 : 80;
	const itemWidth = 80;

	return (
		<div
			style={{
				borderWidth: 1,
				borderStyle: "solid",
				width: containerWidth,
				...props.style,
			}}>
			<ChapterRow showLabel={props.isFirst} label="챕터">
				<SelectBox
					optionList={stages.MAIN_STAGE}
					style={{ width: itemWidth }}
					onChange={onChangeChapter}
				/>
			</ChapterRow>
			<ChapterRow showLabel={props.isFirst} label="스테이지">
				<SelectBox
					optionList={subStageList}
					style={{ width: itemWidth }}
					onChange={onChangeStage}
				/>
			</ChapterRow>
			<ChapterRow showLabel={props.isFirst} label="1시간 사냥한 몹수">
				<Input
					inputType="number"
					isRequired={false}
					inputWidth={itemWidth}
					value={monsterPerHour.toString()}
					onChange={onChangeMonster}
				/>
			</ChapterRow>
			<ChapterRow showLabel={props.isFirst} label="1시간 이벤트 몹수">
				<div style={{ width: itemWidth, textAlign: "right", paddingRight: 16 }}>TODO</div>
				{/* <Input
					inputType="number"
					isRequired={false}
					inputWidth={itemWidth}
					value={monsterPerHour.toString()}
					onChange={onChangeMonster}
				/> */}
			</ChapterRow>
			<ChapterRow showLabel={props.isFirst} label="등반 효율">
				<div style={{ width: itemWidth, textAlign: "right", paddingRight: 16 }}>
					{`${(currentStage.climbingEfficiency * 100).toFixed(2)}%`}
				</div>
			</ChapterRow>
			<ChapterRow showLabel={props.isFirst} label="무기 손실 X">
				<div style={{ width: itemWidth, textAlign: "right", paddingRight: 16 }}>TODO</div>
			</ChapterRow>
			<ChapterRow showLabel={props.isFirst} img="/imgs/weapon_L1.png">
				<div style={{ width: itemWidth, textAlign: "right", paddingRight: 16 }}>
					{weaponPerDay.toFixed(4)}
				</div>
			</ChapterRow>
		</div>
	);
}
