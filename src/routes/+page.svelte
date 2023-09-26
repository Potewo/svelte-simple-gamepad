<script lang="ts">
	import Gamepad from '$lib/Gamepad.svelte';
	import type { Layout, State } from '$lib/types.js';
	let state: State<(typeof layout.buttons)[number], (typeof layout.axes)[number]>;
	let layout: Layout;
</script>

<Gamepad bind:state bind:layout />

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
