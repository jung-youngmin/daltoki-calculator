import _ from "lodash";
import { useCallback, useContext, useMemo, useState } from "react";
import { BaseSettingContext } from "../context";
import { dataUtils, huntingGround } from "../data";
import { consts, IHuntingData, IWeaponPerDayParam, TCharacters } from "../types";
import DailyHunting from "./DailyHunting";
import DailyHuntingTitle from "./DailyHuntingTitle";
import styles from "./styles.module.css";

export interface IHuntingSheetProps {
	readonly character: TCharacters;
}

export default function HuntingSheet(props: IHuntingSheetProps) {
	const { baseSetting } = useContext(BaseSettingContext);

	const huntingGroundList = useMemo(() => {
		return dataUtils.getHuntingGroundList(props.character);
	}, [props.character]);

	const [huntingData, setHuntingData] = useState<IHuntingData[]>([
		consts.DEFAULT_HUNTIN_DATA,
		consts.DEFAULT_HUNTIN_DATA,
	]);

	const onChangeHuntingData = useCallback((index: number, data: IHuntingData) => {
		setHuntingData(prev => {
			if (_.isUndefined(prev[index])) {
				return prev;
			}
			if (_.isEqual(prev[index], data)) {
				return prev;
			}

			// eslint-disable-next-line no-param-reassign
			prev[index] = data;
			return prev.slice();
		});
	}, []);

	const weaponPerDayList = useMemo(() => {
		return _.map(huntingData, (item, idx) => {
			const { monsterPerHour, eventMonsterPerHour, chapter, stage } = item;

			if (monsterPerHour <= 0 || monsterPerHour - eventMonsterPerHour <= 0) {
				return 0;
			}

			const stageIdx = huntingGround.getIdx(chapter, stage);
			const weaponParam: IWeaponPerDayParam = {
				monsterPerHour: monsterPerHour,
				eventMonsterPerHour: eventMonsterPerHour,
				goldenMimicMinus: baseSetting.goldenMimicMinus,
				itemDropPlus: baseSetting.itemDropPlus,
				weapon: huntingGroundList[stageIdx].weapon,
			};
			const perDay = dataUtils.getWeaponPerDay(weaponParam);

			return perDay;
		});
	}, [baseSetting.goldenMimicMinus, baseSetting.itemDropPlus, huntingData, huntingGroundList]);

	const maxWeaponIdx = useMemo(() => {
		return dataUtils.getMaxValueIndex(weaponPerDayList);
	}, [weaponPerDayList]);

	const noWeaponLossList = useMemo(() => {
		if (weaponPerDayList.length !== 2) {
			return new Array<number>(huntingData.length).fill(0);
		}

		return _.map(huntingData, (item, idx) => {
			const { chapter, stage } = item;
			const stageIdx = huntingGround.getIdx(chapter, stage);
			const currentStage = huntingGroundList[stageIdx];

			const noWeaponLoss = dataUtils.getNoWeaponLoss(
				huntingGroundList,
				huntingData[maxWeaponIdx],
				currentStage,
				baseSetting.goldenMimicMinus,
			);
			return noWeaponLoss;
		});
	}, [
		baseSetting.goldenMimicMinus,
		huntingData,
		huntingGroundList,
		maxWeaponIdx,
		weaponPerDayList.length,
	]);

	const maxNoWeaponLossIdx = useMemo(() => {
		return dataUtils.getMaxValueIndex(noWeaponLossList);
	}, [noWeaponLossList]);

	return (
		<div className={styles.mt32} style={{ flexDirection: "row" }}>
			<DailyHuntingTitle />
			{props.character === "lyn" && (
				// _.map(huntingData, (item, idx) => {
				// 	return (
				// 		<DailyHunting
				// 			key={`${item.chapter}-${item.stage}-${idx}`}
				// 			character="lyn"
				// 			colIdx={idx}
				// 			// huntingDataList={dataList}
				// 			onChangeHuntingData={onChangeHuntingData}
				// 			isLast={huntingData.length === idx + 1}
				// 			weaponPerDay={weaponPerDayList[idx]}
				// 		/>
				// 	);
				// })
				<>
					<DailyHunting
						character="lyn"
						colIdx={0}
						onChangeHuntingData={onChangeHuntingData}
						isLast={false}
						weaponPerDay={weaponPerDayList[0]}
						isMaxWeapon={maxWeaponIdx === 0}
						noWeaponLoss={noWeaponLossList[0]}
						isMaxNoLoss={maxNoWeaponLossIdx === 0}
					/>
					<DailyHunting
						character="lyn"
						colIdx={1}
						onChangeHuntingData={onChangeHuntingData}
						isLast
						weaponPerDay={weaponPerDayList[1]}
						isMaxWeapon={maxWeaponIdx === 1}
						noWeaponLoss={noWeaponLossList[1]}
						isMaxNoLoss={maxNoWeaponLossIdx === 1}
					/>
				</>
			)}
		</div>
	);
}
