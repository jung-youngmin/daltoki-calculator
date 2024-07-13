import _ from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";
import appStyle from "./App.module.css";
import { BaseSettingCard, DailyHunting, DailyHuntingTitle } from "./components";
import ButtonGroup from "./components/elements/ButtonGroup";
import styles from "./components/styles.module.css";
import { BaseSettingContext } from "./context";
import { dataUtils } from "./data";
import { consts, IBaseSettings, IHuntingData, typeUtils } from "./types";
// import logo from "./logo.svg";

function App() {
	const [character, setCharacter] = useState<"lyn" | "nia" | "miho" | "yuna">("lyn");
	const [lynHunting, setLynHunting] = useState<IHuntingData[]>([
		consts.DEFAULT_HUNTIN_DATA,
		consts.DEFAULT_HUNTIN_DATA,
	]);
	// const [niaHunting, setNiaHunting] = useState<IHuntingData>(consts.DEFAULT_HUNTIN_DATA);
	// const [mihoHunting, setMihoHunting] = useState<IHuntingData>(consts.DEFAULT_HUNTIN_DATA);
	// const [yunaHunting, setYunaHunting] = useState<IHuntingData>(consts.DEFAULT_HUNTIN_DATA);
	const [dataList, setDataList] = useState<IHuntingData[]>(new Array(2).fill(0));

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

		setLynHunting(dataUtils.getHuntingDataLocalStorage(LOCAL_STORAGE_KEYS.lynHuntingData));
		// TODO
		// setNiaHunting(getSavedHuntingData(LOCAL_STORAGE_KEYS.niaHuntingData));
		// setMihoHunting()
		// setYunaHunting()
	}, []);

	const onChangeHuntingData = useCallback((index: number, data: IHuntingData) => {
		setDataList(prev => {
			if (_.isUndefined(prev[index])) {
				return prev;
			}

			// eslint-disable-next-line no-param-reassign
			prev[index] = data;
			return prev.slice();
		});
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
					<div className={styles.mt32} style={{ flexDirection: "row" }}>
						<DailyHuntingTitle />
						{character === "lyn" &&
							_.map(lynHunting, (item, idx) => {
								return (
									<DailyHunting
										key={`${item.chapter}-${item.stage}-${idx}`}
										character="lyn"
										colIdx={idx}
										huntingDataList={dataList}
										onChangeHuntingData={onChangeHuntingData}
										isLast={lynHunting.length === idx + 1}
									/>
								);
							})}
						{/* <DailyHunting character={character} />
						<DailyHunting character={character} isLast /> */}
					</div>
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
