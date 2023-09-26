<script lang="ts">
	import { onMount } from 'svelte';
	import type { GamepadState, State } from './types.js';
	import { layout as defaultLayout } from './layout.js';

	// codes below are inspired by https://developer.mozilla.org/ja/docs/Web/API/Gamepad_API/Using_the_Gamepad_API
	let haveEvents = false;
	export let layout = defaultLayout;
	export const controllers = new Map<number, Gamepad>();
	export let rawState: GamepadState = {
		buttons: [],
		axes: []
	};
	// interface State {
	// 	buttons: {
	// 		[key: (typeof layout.buttons)[number]]: GamepadButton;
	// 	};
	// 	axes: {
	// 		[key: (typeof layout.axes)[number]]: number;
	// 	};
	// }
	export let state: State<(typeof layout.buttons)[number], (typeof layout.axes)[number]> = {
		buttons: {
			a: { pressed: false, value: 0, touched: false },
			b: { pressed: false, value: 0, touched: false },
			x: { pressed: false, value: 0, touched: false },
			y: { pressed: false, value: 0, touched: false },
			lb: { pressed: false, value: 0, touched: false },
			rb: { pressed: false, value: 0, touched: false },
			lt: { pressed: false, value: 0, touched: false },
			rt: { pressed: false, value: 0, touched: false },
			back: { pressed: false, value: 0, touched: false },
			start: { pressed: false, value: 0, touched: false },
			ls: { pressed: false, value: 0, touched: false },
			rs: { pressed: false, value: 0, touched: false },
			up: { pressed: false, value: 0, touched: false },
			down: { pressed: false, value: 0, touched: false },
			left: { pressed: false, value: 0, touched: false },
			right: { pressed: false, value: 0, touched: false }
		},
		axes: {
			lx: 0,
			ly: 0,
			rx: 0,
			rt: 0
		}
	};
	export let gamepadIndex = 0;

	onMount(() => {
		haveEvents = 'ongamepadconnected' in window;
		window.addEventListener('gamepadconnected', (e) => {
			add(e.gamepad);
		});
		window.addEventListener('gamepaddisconnected', (e) => {
			remove(e.gamepad);
		});
		if (!haveEvents) {
			setInterval(scan, 500);
		}
	});

	const scan = () => {
		const gamepads = navigator.getGamepads();
		for (const gamepad of gamepads) {
			if (gamepad) {
				if (gamepad.index in controllers) {
					controllers.set(gamepad.index, gamepad);
				} else {
					add(gamepad);
				}
			}
		}
	};

	const add = (gamepad: Gamepad) => {
		controllers.set(gamepad.index, gamepad);
		requestAnimationFrame(update);
	};

	const remove = (gamepad: Gamepad) => {
		controllers.delete(gamepad.index);
	};

	const update = () => {
		if (!haveEvents) {
			scan();
		}
		const gamepad = controllers.get(gamepadIndex);
		if (typeof gamepad == 'undefined') {
			return;
		}
		rawState.buttons = gamepad.buttons;
		rawState.axes = gamepad.axes;
		for (let i = 0; i < layout.buttons.length; i++) {
			state.buttons[layout.buttons[i]] = gamepad.buttons[i];
		}

		// requestAnimationFrame(update);
		setInterval(update, 30);
	};
</script>
