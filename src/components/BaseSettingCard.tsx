import _ from "lodash";
import { useCallback, useContext, useEffect } from "react";
import { BaseSettingContext } from "../context";
import { consts } from "../types";
import Card from "./elements/Card";
import InputWithTitle from "./elements/InputWithTitle";

export interface IBaseSettingCardProps {}

export default function BaseSettingCard(props: IBaseSettingCardProps) {
	const { baseSetting, setBaseSetting } = useContext(BaseSettingContext);

	useEffect(() => {
		if (!_.isEqual(baseSetting, consts.DEFAULT_BASE_SETTING)) {
			localStorage.setItem(
				consts.LOCAL_STORAGE_KEYS.baseSetting,
				JSON.stringify(baseSetting),
			);
		}
	}, [baseSetting]);

	const onChangeGoldenMimic = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				goldenMimicMinus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeExp = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				expPlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeGold = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				goldPlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeItemDrop = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				itemDropPlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeWeaponStone = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				weaponStonePlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeSkillStone = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				skillStonePlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeStarFragment = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				starFragmentPlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeSaiyanStone = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				saiyanStonePlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	const onChangeDimension = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				dimensionPlus: _.toNumber(text),
			}));
		},
		[setBaseSetting],
	);

	return (
		<div style={{ maxWidth: 400 }}>
			<Card title="기본 설정">
				<InputWithTitle
					title="황금미믹 리젠 감소"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.goldenMimicMinus.toString()}
					onChangeText={onChangeGoldenMimic}
				/>
				<InputWithTitle
					title="경험치 획득량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.expPlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeExp}
				/>
				<InputWithTitle
					title="골드 획득량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.goldPlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeGold}
				/>
				<InputWithTitle
					title="아이템 드랍률 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.itemDropPlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeItemDrop}
				/>
				<InputWithTitle
					title="무강석 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.weaponStonePlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeWeaponStone}
				/>
				<InputWithTitle
					title="스강석 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.skillStonePlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeSkillStone}
				/>
				<InputWithTitle
					title="별파 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.starFragmentPlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeStarFragment}
				/>
				<InputWithTitle
					title="초강석 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.saiyanStonePlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeSaiyanStone}
				/>
				<InputWithTitle
					title="차원 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					value={baseSetting.dimensionPlus.toString()}
					style={{ marginTop: 16 }}
					onChangeText={onChangeDimension}
				/>
			</Card>
		</div>
	);
}
