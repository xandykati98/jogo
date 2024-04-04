<script lang="ts">
	import coinIcon from '$lib/coin.svg';
	import foodIcon from '$lib/food.svg';
	import headerLeft from '$lib/header_left.svg';
	import headerMiddle from '$lib/header_middle.svg';
	import headerRight from '$lib/header_right.svg';
	import { gameState } from '../stores/game';
	const { gold, food } = gameState;
</script>

<div class="relative z-[2]">
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
			<img width="32" height="32" src={coinIcon} alt="Ouro" />
			{$gold.total} Ouro
			{#if $gold.growth !== 0}
				<span class="growth" class:negative={$gold.growth < 0}>
					{$gold.growth > 0 ? '+' : ''}
					{$gold.growth} por dia
				</span>
			{/if}
		</div>
		<div class="item">
			<img width="32" height="32" src={foodIcon} alt="Comida" />
			{$food.total} Comida
			{#if $food.growth !== 0}
				<span class="growth" class:negative={$food.growth < 0}>
					{$food.growth > 0 ? '+' : ''}
					{$food.growth} por dia
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
		& .right {
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
			width: calc(100% - 64px - 64px + 1px);
			height: 100%;
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
