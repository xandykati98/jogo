<script lang="ts">
	import food from '$lib/food.svg';
	import helmet from '$lib/helmet.svg';
	import book from '$lib/book.svg';
	import { gameState } from '../stores/game';
	const { isMagicTreeOpen } = gameState.interface;

</script>

<div class="sidebar absolute">
	<button class="item">
		<img src={food} alt="Magias" />
	</button>
	<button class="item" on:click={() => $isMagicTreeOpen = true}>
		<img src={book} alt="Magias" />
	</button>
	<button class="item">
		<img src={helmet} alt="Heróis" />
	</button>
</div>

<style lang="scss">
	.sidebar {
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		background: red;

		& .item {
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
		}
	}
</style>
