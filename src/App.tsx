import _ from "lodash";
import { useEffect, useMemo, useState } from "react";
import appStyle from "./App.module.css";
import { BaseSettingCard, HuntingSheet } from "./components";
import ButtonGroup from "./components/elements/ButtonGroup";
import styles from "./components/styles.module.css";
import { BaseSettingContext } from "./context";
import { consts, IBaseSettings, TCharacters, typeUtils } from "./types";
// import logo from "./logo.svg";

function App() {
	const [character, setCharacter] = useState<TCharacters>("lyn");

	const [baseSetting, setBaseSetting] = useState<IBaseSettings>(consts.DEFAULT_BASE_SETTING);
	const value = useMemo(() => ({ baseSetting, setBaseSetting }), [baseSetting]);

	useEffect(() => {
		const { LOCAL_STORAGE_KEYS } = consts;
		const baseSet = localStorage.getItem(LOCAL_STORAGE_KEYS.baseSetting);
		if (_.isString(baseSet)) {
			const obj = JSON.parse(baseSet);
			if (typeUtils.isBaseSettings(obj)) {
				setBaseSetting(obj);
			}
		}
	}, []);

	return (
		<BaseSettingContext.Provider value={value}>
			<div className={appStyle.App}>
				<div style={{ alignItems: "center" }}>
					<BaseSettingCard />
					<ButtonGroup
						buttonWidth={80}
						className={`${styles.mt32} ${styles.shadow}`}
						buttonData={[
							{
								label: "린",
								img: "lyn.png",
								isActive: character === "lyn",
								onClick: () => setCharacter("lyn"),
							},
							{
								label: "니아",
								img: "nia.png",
								isActive: character === "nia",
								onClick: () => setCharacter("nia"),
							},
							{
								label: "미호",
								img: "miho.png",
								isActive: character === "miho",
								onClick: () => setCharacter("miho"),
							},
							{
								label: "유나",
								img: "yuna.png",
								isActive: character === "yuna",
								onClick: () => setCharacter("yuna"),
							},
						]}
					/>
					<HuntingSheet character={character} />
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
