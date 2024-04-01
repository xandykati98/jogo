<script lang="ts">
	import { gameState } from '../stores/game';

	const { day, endDay } = gameState;
</script>

<div class="fixed end-day">
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
	}
</style>
