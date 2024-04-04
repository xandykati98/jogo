<div class:open={$isHeroesOpen} class="heroes">
	<div class="title">
		<h2>Heróis</h2>
		<button
			on:click={() => {
				$isHeroesOpen = false;
			}}>X</button
		>
	</div>
    <div class="wrapper">
        {#if $heroes.length === 0}
            Nenhum herói disponível
        {:else}
            {#each $heroes as hero}
                <div class="item">
                    {hero.name}
                </div>
            {/each}
        {/if}
    </div>
</div>

<script lang="ts">
    import { gameState, heroes } from '../stores/game';
    const { isHeroesOpen } = gameState.sideInterface;
</script>

<style lang="scss">
    .heroes {
        display: none;
        position: absolute;
        top: 0;
        left: 68px;
        z-index: +4;
        width: 400px;
        height: 400px;
        background: red;
        padding: 10px;
        z-index: 2;
        flex-direction: column;
        gap: 5px;

        & .title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			& h2 {
				font-size: 24px;
			}
			& button {
				background: none;
				border: none;
				cursor: pointer;
				font-size: 24px;
			}
		}
    }
    .heroes.open {
        display: flex;
    }
</style>