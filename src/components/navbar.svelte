<script lang="ts">
	import coin from '$lib/coin.svg';
	import food from '$lib/food.svg';
	import headerLeft from '$lib/header_left.svg';
	import headerMiddle from '$lib/header_middle.svg';
	import headerRight from '$lib/header_right.svg';
	import { gameState } from '../stores/game';
</script>

<div class="relative">
	<div class="header">
		<div class="left absolute">
			<img src={headerLeft} alt="Header Left" />
		</div>
		<div class="middle absolute" style="background-image: url({headerMiddle})"></div>
		<div class="right absolute">
			<img src={headerRight} alt="Header Right" />
		</div>
	</div>
	<div class="flex flex-row gap-[20px] header-info">
		<div class="item">
			<img width="32" height="32" src={coin} alt="Ouro" />
			{gameState.gold.getTotal()} Ouro
			{#if gameState.gold.getGrowth() !== 0}
				<span class="growth" class:negative={gameState.gold.getGrowth() < 0}>
					{gameState.gold.getGrowth() > 0 ? '+' : ''}
					{gameState.gold.getGrowth()} por dia
				</span>
			{/if}
		</div>
		<div class="item">
			<img width="32" height="32" src={food} alt="Comida" />
			{gameState.food.getTotal()} Comida
			{#if gameState.food.getGrowth() !== 0}
				<span class="growth" class:negative={gameState.food.getGrowth() < 0}>
					{gameState.food.getGrowth() > 0 ? '+' : ''}
					{gameState.food.getGrowth()} por dia
				</span>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.item {
		display: flex;
		align-items: center;
		gap: 5px;
		color: #fff;
		& .growth {
			color: rgb(85, 255, 85);
			&.negative {
				color: rgb(155 0 0);
			}
		}
	}
	.header {
		position: absolute;
		top: 10px;
		left: 50%;
		width: 90%;
		height: 96px;
		transform: translateX(-50%);
		z-index: 1;
		& .left,
		& .right,
		& .middle {
			img {
				height: 96px;
			}
		}
		& .left {
			left: 0;
			top: 0;
		}
		& .middle {
			top: 0;
			left: 50%;
			transform: translateX(-50%);
			width: calc(100% - 64px - 64px);
			height: 100%;
			& > img {
				width: 100%;
				max-height: 96px;
			}
		}
		& .right {
			top: 0;
			right: 0;
		}
	}
	.header-info {
		position: absolute;
		z-index: +2;
		top: 56px;
		width: 100%;
		padding: 0 7%;
	}
</style>
