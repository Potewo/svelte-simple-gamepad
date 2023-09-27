<script lang="ts">
	import Gamepad from '$lib/Gamepad.svelte';
	import type { Layout, State, GamepadState } from '$lib/types.js';
	let state: State<(typeof layout.buttons)[number], (typeof layout.axes)[number]>;
	let layout: Layout;
	let rawState: GamepadState;
	const onButtonAUp = () => {
		console.log('Button A Up!');
	};
	const onButtonADown = () => {
		console.log('Button A Down!');
	};
</script>

<Gamepad
	bind:state
	bind:layout
	bind:rawState
	on:buttonAUp={onButtonAUp}
	on:buttonADown={onButtonADown}
/>

{#if state && state.buttons}
	{#each Object.entries(state.buttons) as button}
		<p>{button[0]}: {button[1].value}</p>
	{/each}
{/if}

{#if state && state.axes}
	{#each Object.entries(state.axes) as axe}
		<p>{axe[0]}: {axe[1]}</p>
	{/each}
{/if}
