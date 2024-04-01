<script lang="ts">
	import { gameState } from '../stores/game';
</script>

<div class="magic-tree" class:open={gameState.interface.isMagicTreeOpen}>hi</div>

<style lang="scss">
	.magic-tree {
		display: none;
		position: fixed;
		top: 50vh;
		left: 50vw;
		z-index: +4;
		transform: translate(-50%, -50%);
		width: 400px;
		height: 400px;
		background: red;
		&.open {
			display: block;
		}
	}
</style>
