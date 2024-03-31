<div class="relative">
    <div class="header">
        <div class="left absolute">
            <img src={headerLeft} alt="Header Left"/>
        </div>
        <div class="middle absolute">
            <img  src={headerMiddle} alt="Header Middle"/>
        </div>
        <div class="right absolute">
            <img src={headerRight} alt="Header Right"/>
        </div>
    </div>
    <div class="flex flex-row gap-[20px] header-info">
        <div class="item">        
            <img width="16" height="16" src={coin} alt="Ouro"/>
            { gameState.gold.getTotal() } Ouro
            {#if gameState.gold.getGrowth() !== 0}
            <span class="growth" class:negative={gameState.gold.getGrowth() < 0}>
                { gameState.gold.getGrowth() > 0 ? '+' : '' }
                { gameState.gold.getGrowth() } por dia
            </span>
            {/if}
        </div>
        <div class="item">
            <img width="16" height="16" src={food} alt="Comida"/>
            { gameState.food.getTotal() } Comida
            {#if gameState.food.getGrowth() !== 0}
            <span class="growth" class:negative={gameState.food.getGrowth() < 0}>
                { gameState.food.getGrowth() > 0 ? '+' : '' }
                { gameState.food.getGrowth() } por dia
            </span>
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    $scale: 2;
    .item {
        display: flex;
        align-items: center;
        gap: 5px;

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
        height: calc(48px * $scale);
        transform: translateX(-50%);
        z-index: 1;
        & .left, & .right, & .middle {
            img {
                height: calc(48px * $scale);
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
            width: calc(100% - 32px - 32px);
            & > img {
                width: 100%;
                max-height: calc(48px * $scale);
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
        padding: 0 10%;
    }
</style>

<script lang="ts">
import coin from '$lib/coin.svg';
import food from '$lib/food.svg';
import headerLeft from '$lib/header_left.svg';
import headerMiddle from '$lib/header_middle.svg';
import headerRight from '$lib/header_right.svg';
import { gameState } from '../stores/game';

</script>