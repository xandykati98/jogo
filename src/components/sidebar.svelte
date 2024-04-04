<script lang="ts">
	import food from '$lib/food.svg';
	import chest from '$lib/chest.svg';
	import shop from '$lib/shop.svg';
	import crate from '$lib/crate.svg';
	import helmet from '$lib/helmet.svg';
	import book from '$lib/book.svg';
	import MagicTree from '../components/magic_tree.svelte';
	import { gameState, magicTree } from '../stores/game';
	import Inventory from './inventory.svelte';
	import Shop from './shop.svelte';
	import Heroes from './heroes.svelte';
	const { isMagicTreeOpen, isInventoryOpen, isShopOpen, closeAll, isHeroesOpen } =
		gameState.sideInterface;
	const { selected: selectedMagicTree } = magicTree;
</script>

<div class="sidebar absolute z-[2]">
	<MagicTree />
	<Inventory />
	<Shop />
	<Heroes />
	<button
		class="item"
		on:click={() => {
			closeAll();
			isShopOpen.toggle();
		}}
	>
		<img src={shop} alt="Loja" />
	</button>
	<button
		class="item"
		on:click={() => {
			closeAll();
			isInventoryOpen.toggle();
		}}
	>
		<img src={chest} alt="Inventário" />
	</button>
	<button
		class="item"
		class:highlight={$selectedMagicTree === null}
		on:click={() => {
			closeAll();
			isMagicTreeOpen.toggle();
		}}
	>
		<img src={book} alt="Magias" />
	</button>
	<button
		class="item"
		on:click={() => {
			closeAll();
			isHeroesOpen.toggle();
		}}
	>
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
			&.highlight {
				background-color: #5900ff98;
			}
			&:hover {
				background-color: #00000013;
			}
		}
	}
</style>
