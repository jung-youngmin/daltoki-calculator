import _ from "lodash";
import { useCallback, useContext } from "react";
import { BaseSettingContext } from "../context";
import Card from "./elements/Card";
import InputWithTitle from "./elements/InputWithTitle";

export interface IBaseSettingCardProps {}

export default function BaseSettingCard(props: IBaseSettingCardProps) {
	const { setBaseSetting } = useContext(BaseSettingContext);

	const onChangeGoldenMimic = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				goldenMimicMinus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeExp = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				expPlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeGold = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				goldPlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeItemDrop = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				itemDropPlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeWeaponStone = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				weaponStonePlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeSkillStone = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				skillStonePlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeStarFragment = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				starFragmentPlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeSaiyanStone = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				saiyanStonePlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	const onChangeDimension = useCallback(
		(text: string) => {
			setBaseSetting(prev => ({
				...prev,
				dimensionPlus: _.toSafeInteger(text) / 100,
			}));
		},
		[setBaseSetting],
	);

	return (
		<div style={{ maxWidth: 400 }}>
			<Card title="기본 설정" flexDirection="column">
				<InputWithTitle
					title="황금미믹 리젠 감소"
					placeholder="%"
					inputType="number"
					unit="%"
					onChangeText={onChangeGoldenMimic}
				/>
				<InputWithTitle
					title="경험치 획득량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeExp}
				/>
				<InputWithTitle
					title="골드 획득량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeGold}
				/>
				<InputWithTitle
					title="아이템 드랍률 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeItemDrop}
				/>
				<InputWithTitle
					title="무강석 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeWeaponStone}
				/>
				<InputWithTitle
					title="스강석 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeSkillStone}
				/>
				<InputWithTitle
					title="별파 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeStarFragment}
				/>
				<InputWithTitle
					title="초강석 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeSaiyanStone}
				/>
				<InputWithTitle
					title="차원 드랍량 증가"
					placeholder="%"
					inputType="number"
					unit="%"
					style={{ marginTop: 16 }}
					onChangeText={onChangeDimension}
				/>
			</Card>
		</div>
	);
}
