import React, { createContext } from "react";
import { IBaseSettings } from "../types";

const BaseSettingContext = createContext<{
	baseSetting: IBaseSettings;
	setBaseSetting: React.Dispatch<React.SetStateAction<IBaseSettings>>;
}>({
	baseSetting: {
		goldenMimicMinus: 0,
		expPlus: 0,
		goldPlus: 0,
		itemDropPlus: 0,
		weaponStonePlus: 0,
		skillStonePlus: 0,
		starFragmentPlus: 0,
		saiyanStonePlus: 0,
		dimensionPlus: 0,
	},
	setBaseSetting: () => {},
});
export default BaseSettingContext;
