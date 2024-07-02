import { useMemo, useState } from "react";
import appStyle from "./App.module.css";
import { BaseSettingCard, DailyHunting } from "./components";
import { BaseSettingContext } from "./context";
import { IBaseSettings } from "./types/types";
// import logo from "./logo.svg";

function App() {
	// const hh = huntingGround.LynHuntingGround[0];
	// const weaponPerDay = dataUtils.getWeaponPerDay({
	// 	monsterPerHour: dataUtils.getMonsterPerHour(6885, 0),
	// 	goldenMimicMinus: dataUtils.getMimicPerHour(0),
	// 	itemDropPlus: 0.45,
	// 	weapon: hh.weapon,
	// });
	// console.log("@@@ weaponPerDay", weaponPerDay);

	const [baseSetting, setBaseSetting] = useState<IBaseSettings>({
		goldenMimicMinus: 0,
		expPlus: 0,
		goldPlus: 0,
		itemDropPlus: 0,
		weaponStonePlus: 0,
		skillStonePlus: 0,
		starFragmentPlus: 0,
		saiyanStonePlus: 0,
		dimensionPlus: 0,
	});
	const value = useMemo(() => ({ baseSetting, setBaseSetting }), [baseSetting]);

	return (
		<BaseSettingContext.Provider value={value}>
			<div className={appStyle.App}>
				<div style={{ alignItems: "center" }}>
					<BaseSettingCard />
				</div>
				<div style={{ flexDirection: "row" }}>
					<DailyHunting isFirst style={{ marginTop: 30 }} />
					<DailyHunting style={{ marginTop: 30 }} />
					<DailyHunting style={{ marginTop: 30 }} />
					<DailyHunting style={{ marginTop: 30 }} />
					<DailyHunting style={{ marginTop: 30 }} />
				</div>

				<div>{value.baseSetting.goldenMimicMinus}</div>
				<div>{value.baseSetting.expPlus}</div>
				<div>{value.baseSetting.goldPlus}</div>
				<div>{value.baseSetting.itemDropPlus}</div>
				<div>{value.baseSetting.weaponStonePlus}</div>
				<div>{value.baseSetting.skillStonePlus}</div>
				<div>{value.baseSetting.starFragmentPlus}</div>
				<div>{value.baseSetting.saiyanStonePlus}</div>
				<div>{value.baseSetting.dimensionPlus}</div>
			</div>
		</BaseSettingContext.Provider>
	);

	// return (
	// 	<div className="App">
	// 		<header className="App-header">
	// 			<img src={logo} className="App-logo" alt="logo" />
	// 			<p>
	// 				Edit <code>src/App.tsx</code> and save to reload.
	// 			</p>
	// 			<a
	// 				className="App-link"
	// 				href="https://reactjs.org"
	// 				target="_blank"
	// 				rel="noopener noreferrer">
	// 				Learn React
	// 			</a>
	// 		</header>
	// 	</div>
	// );
}

export default App;
