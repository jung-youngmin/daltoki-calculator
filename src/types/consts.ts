import { IBaseSettings, IHuntingData, IHuntingGround } from "./types";

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

const DEFAULT_BASE_SETTING: IBaseSettings = {
	goldenMimicMinus: 0,
	expPlus: 0,
	goldPlus: 0,
	itemDropPlus: 0,
	weaponStonePlus: 0,
	skillStonePlus: 0,
	starFragmentPlus: 0,
	saiyanStonePlus: 0,
	dimensionPlus: 0,
};

const DEFAULT_HUNTIN_DATA: IHuntingData = {
	chapter: 5,
	stage: 1,
	monsterPerHour: 0,
	eventMonsterPerHour: 0,
	weaponPerDay: 0,
};

const LOCAL_STORAGE_KEYS = {
	baseSetting: "baseSetting",
	lynHuntingData: "lynHuntingData",
	niaHuntingData: "niaHuntingData",
	mihoHuntingData: "mihoHuntingData",
	yunaHuntingData: "yunaHuntingData",
} as const;

export default {
	DEFAULT_STAGE,
	DEFAULT_BASE_SETTING,
	DEFAULT_HUNTIN_DATA,
	LOCAL_STORAGE_KEYS,
};
