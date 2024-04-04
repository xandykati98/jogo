<script lang="ts">
	import { gameState, decisions } from '../stores/game';

	const { day, endDay } = gameState;
	$: console.log(decisions, $decisions);
	$: disabled = $decisions.length > 0;
</script>

<div class:disabled class="fixed end-day">
	<button on:click={() => endDay()}>Clique para ir para o próximo dia. <b>Dia {$day}</b></button>
</div>

<style lang="scss">
	.end-day {
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px;
		background: red;
		color: #fff;
		z-index: 2;
		&.disabled {
			background: gray;
		}
	}
</style>
