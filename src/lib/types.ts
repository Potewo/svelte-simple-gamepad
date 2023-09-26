export type GamepadState = {
	buttons: Gamepad['buttons'];
	axes: Gamepad['axes'];
};

export type Layout = {
	buttons: string[];
	axes: string[];
};

export interface State<T extends string, U extends string> {
	buttons: {
		[key in T]: GamepadButton;
	};
	axes: {
		[key in U]: number;
	};
}
