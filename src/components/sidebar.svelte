<script lang="ts">
	import food from '$lib/food.svg';
	import helmet from '$lib/helmet.svg';
	import book from '$lib/book.svg';
	import MagicTree from '../components/magic_tree.svelte';
	import { gameState } from '../stores/game';
	const { isMagicTreeOpen } = gameState.interface;
</script>

<div class="sidebar absolute">
	<MagicTree />
	<button class="item">
		<img src={food} alt="Magias" />
	</button>
	<button class="item" on:click={() => isMagicTreeOpen.toggle()}>
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
		padding: 5px;
		background: red;

		& .item {
			padding: 5px;
			display: flex;
			align-items: center;
			justify-content: center;
			cursor: pointer;
			&:hover {
				background-color: #00000013;
			}
		}
	}
</style>
