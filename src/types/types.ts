export type TChapters = 5 | 6 | 7 | 8 | 9;

/**
 * 무기 드랍 관련 정보
 */
export interface IWeapon {
	readonly drop: number;
	readonly U1: number;
	readonly E4: number;
	readonly E3: number;
	readonly E2: number;
	readonly E1: number;
}

/**
 * 사냥터
 */
export interface IHuntingGround {
	readonly name: string;
	readonly chapter: number;
	readonly stage: number;
	/** 등반효율 */
	readonly climbingEfficiency: number;
	/** 다음 스테이지 등반효율 */
	readonly nextClimbingEfficiency: number;
	readonly weapon: IWeapon;
}

// Params
export interface IWeaponPerDayParam {
	readonly monsterPerHour: number;
	readonly eventMonsterPerHour: number;
	readonly goldenMimicMinus: number;
	readonly itemDropPlus: number;
	readonly weapon: IWeapon;
}

export interface IBaseSettings {
	readonly goldenMimicMinus: number;
	readonly expPlus: number;
	readonly goldPlus: number;
	readonly itemDropPlus: number;
	readonly weaponStonePlus: number;
	readonly skillStonePlus: number;
	readonly starFragmentPlus: number;
	readonly saiyanStonePlus: number;
	readonly dimensionPlus: number;
}

export interface IHuntingData {
	chapter: TChapters;
	stage: number;
	monsterPerHour: number;
	eventMonsterPerHour: number;
	weaponPerDay: number;
}
