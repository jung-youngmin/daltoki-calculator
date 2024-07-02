import { IWeaponPerDayParam } from "../types/types";

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
 * @param param `{monsterPerHour, mimicPerHour, itemDropPlus, weapon}`
 * @returns
 */
const getWeaponPerDay = (param: IWeaponPerDayParam) => {
	const { monsterPerHour, goldenMimicMinus, itemDropPlus, weapon } = param;

	// (("시간당 몬스터 수"*24) - ("시간당 미믹"*24)) * ("무기드랍률(6%)"*(1+"아이템 드랍률 증가")))*data!H39/390625
	return (
		((monsterPerHour * 24 - getMimicPerHour(goldenMimicMinus) * 24) *
			weapon.drop *
			(1 + itemDropPlus) *
			(weapon.U1 + weapon.E4 * 5 + weapon.E3 * 25 + weapon.E2 * 125 + weapon.E1 * 625)) /
		390625
	);
};

export default {
	getMonsterPerHour,
	getMimicPerHour,
	getWeaponPerDay,
};
