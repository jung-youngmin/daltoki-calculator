import _ from "lodash";
import { IBaseSettings, IHuntingData } from "./types";

const isBaseSettings = (obj: any): obj is IBaseSettings => {
	const {
		goldenMimicMinus,
		expPlus,
		goldPlus,
		itemDropPlus,
		weaponStonePlus,
		skillStonePlus,
		starFragmentPlus,
		saiyanStonePlus,
		dimensionPlus,
	} = obj;

	return (
		_.isNumber(goldenMimicMinus) &&
		_.isNumber(expPlus) &&
		_.isNumber(goldPlus) &&
		_.isNumber(itemDropPlus) &&
		_.isNumber(weaponStonePlus) &&
		_.isNumber(skillStonePlus) &&
		_.isNumber(starFragmentPlus) &&
		_.isNumber(saiyanStonePlus) &&
		_.isNumber(dimensionPlus)
	);
};

const isHuntingData = (obj: any): obj is IHuntingData => {
	const { chapter, stage, monsterPerHour, eventMonsterPerHour, weaponPerDay } = obj;

	return (
		_.isNumber(chapter) &&
		chapter >= 5 &&
		chapter <= 9 &&
		_.isNumber(stage) &&
		_.isNumber(monsterPerHour) &&
		_.isNumber(eventMonsterPerHour) &&
		_.isNumber(weaponPerDay)
	);
};

export default {
	isBaseSettings,
	isHuntingData,
};
