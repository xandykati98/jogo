<script lang="ts">
	import { gameState } from '../stores/game';
	import type { Log } from '../stores/types';
	const { logs } = gameState;
	$: sortedLogs = $logs.sort((a: Log, b: Log) => Number(b.time) - Number(a.time));
</script>

<ul class="logs">
	{#each sortedLogs as log, i}
		<li class={`log ${[log.type]}`}>{@html log.message}</li>
	{/each}
</ul>

<style lang="scss">
	.logs {
		position: absolute;
		bottom: 0;
		right: 0;
		font-size: 18px;
		width: 400px;
		height: 200px;
		background: rgb(236, 236, 236);
		padding: 4px;
		display: flex;
		gap: 2px;
		overflow: auto;
		flex-direction: column-reverse;
		z-index: 2;
		& > .log {
			background: white;
			border-radius: 5px;
			padding: 4px 8px;

			&.magic {
				background-color: aquamarine;
			}
			&.sell {
				background-color: rgb(209, 255, 103);
			}
		}
	}
</style>
