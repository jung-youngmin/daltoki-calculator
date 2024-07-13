import _ from "lodash";
import { consts, IHuntingData, IHuntingGround, IWeaponPerDayParam, typeUtils } from "../types";
import huntingGround from "./hunting-ground";

const isSameStage = (
	stage1: IHuntingData | IHuntingGround | { readonly chapter: number; readonly stage: number },
	stage2: IHuntingData | IHuntingGround | { readonly chapter: number; readonly stage: number },
) => {
	return stage1.chapter === stage2.chapter && stage1.stage === stage2.stage;
};

const isNextStage = (
	stage1: IHuntingData | IHuntingGround | { readonly chapter: number; readonly stage: number },
	stage2: IHuntingData | IHuntingGround | { readonly chapter: number; readonly stage: number },
) => {
	if (isSameStage(stage1, stage2)) {
		return false;
	}
	if (stage1.chapter === stage2.chapter) {
		return stage1.stage > stage2.stage;
	}
	if (stage1.chapter > stage2.chapter) {
		return true;
	}
	if (stage1.chapter < stage2.chapter) {
		return false;
	}

	return null;
};

/**
 * 시간 당 몬스터 수
 * @param monster 1시간 사냥한 몹 수
 * @param eventMonster 시간당 이벤트 몹 수
 * @returns
 */
const getMonsterPerHour = (monster: number, eventMonster: number) =>
	Math.max(monster - eventMonster, 0);

/**
 * 시간당 미믹 숫자
 * @param goldenMimicRegen 황금 미믹 리젠 감소
 * @returns
 */
const getMimicPerHour = (goldenMimicRegen: number) => 3600 / (25 * (1 - goldenMimicRegen) + 0.3);

/**
 * 일간 레1 무기
 * @param param `{monsterPerHour, eventMonsterPerHour, mimicPerHour, itemDropPlus, weapon}`
 * @returns
 */
const getWeaponPerDay = (param: IWeaponPerDayParam) => {
	const { monsterPerHour, eventMonsterPerHour, goldenMimicMinus, itemDropPlus, weapon } = param;

	// (("시간당 몬스터 수"*24) - ("시간당 미믹"*24)) * ("무기드랍률(6%)"*(1+"아이템 드랍률 증가")))*data!H39/390625
	const realMonsterPerHour = Math.max(monsterPerHour - eventMonsterPerHour, 0);
	const calculated =
		((realMonsterPerHour * 24 - getMimicPerHour(goldenMimicMinus) * 24) *
			weapon.drop *
			(1 + itemDropPlus / 100) *
			(weapon.U1 + weapon.E4 * 5 + weapon.E3 * 25 + weapon.E2 * 125 + weapon.E1 * 625)) /
		390625;
	return Math.max(calculated, 0);
};

const getNoWeaponLoss = (
	character: "lyn" | "nia" | "miho" | "yuna",
	dataList: IHuntingData[],
	curStage: IHuntingGround,
	goldenMimicRegen: number,
) => {
	const maxWeapon = _.maxBy(dataList, item => item.weaponPerDay);
	if (_.isUndefined(maxWeapon)) {
		return 0;
	}

	if (isSameStage(maxWeapon, curStage)) {
		return maxWeapon.monsterPerHour;
	}

	const mimic = getMimicPerHour(goldenMimicRegen);

	// 최대 무기 효율이 현재 사냥터보다 높은 스테이지임?
	const maxIdx = huntingGround.getIdx(maxWeapon.chapter, maxWeapon.stage);
	const curIdx = huntingGround.getIdx(curStage.chapter, curStage.stage);
	if (maxIdx > curIdx) {
		let expN = 1;
		for (let index = curIdx; index < maxIdx; index++) {
			if (character === "lyn") {
				expN *= 1 + huntingGround.LynHuntingGround[index].nextClimbingEfficiency;
			}
		}
		// ({"다음 인덱스의 무기획득량"}-{"시간당 미믹"})*(1+{"다음 인덱스의 등반효율"})+{"시간당 미믹"},
		return (maxWeapon.monsterPerHour - mimic) * expN + mimic;
	}

	let expN = 1;
	for (let index = curIdx; index > maxIdx; index--) {
		if (character === "lyn") {
			expN *= 1 + huntingGround.LynHuntingGround[index].climbingEfficiency;
		}
	}

	// ({"이전 인덱스의 무기획득량"}-{"시간당 미믹"})/({"현재 인덱스의 등반효율"}+1)+{"시간당 미믹"}
	return (maxWeapon.monsterPerHour - mimic) / expN + mimic;
};

/**
 * 이미지 경로 리턴
 * @param imgName 확장자 포함 파일명
 * @returns
 */
const getImgPath = (imgName: string) => {
	return `/imgs/${imgName}`;
};

const getHuntingDataLocalStorage = (storageKey: keyof typeof consts.LOCAL_STORAGE_KEYS) => {
	const data = localStorage.getItem(storageKey);
	if (_.isString(data)) {
		const obj = JSON.parse(data);
		if (_.isArray(obj)) {
			const dataList: IHuntingData[] = [];
			_.forEach(obj, (item, idx) => {
				if (typeUtils.isHuntingData(item)) {
					dataList.push(item);
				}
			});
			return dataList;
		}
	}
	return [consts.DEFAULT_HUNTIN_DATA, consts.DEFAULT_HUNTIN_DATA];
};

const setHuntingDataLocalStorage = (
	storageKey: keyof typeof consts.LOCAL_STORAGE_KEYS,
	huntingData: Partial<IHuntingData>,
	index: number,
) => {
	if (index < 0) {
		return;
	}

	const data = getHuntingDataLocalStorage(storageKey);
	const curData = data[index];
	if (_.isUndefined(curData)) {
		return;
	}

	if (!_.isUndefined(huntingData.chapter)) {
		curData.chapter = huntingData.chapter;
	}
	if (!_.isUndefined(huntingData.stage)) {
		curData.stage = huntingData.stage;
	}
	if (!_.isUndefined(huntingData.monsterPerHour)) {
		curData.monsterPerHour = huntingData.monsterPerHour;
	}
	if (!_.isUndefined(huntingData.eventMonsterPerHour)) {
		curData.eventMonsterPerHour = huntingData.eventMonsterPerHour;
	}
	localStorage.setItem(storageKey, JSON.stringify(data));
};

export default {
	isSameStage,
	getMonsterPerHour,
	getMimicPerHour,
	getWeaponPerDay,
	getNoWeaponLoss,
	getImgPath,
	getHuntingDataLocalStorage,
	setHuntingDataLocalStorage,
};
