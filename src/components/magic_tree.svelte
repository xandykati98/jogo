<script lang="ts">
	import { calcProgress } from '$lib';
	import { gameState, magicTree } from '../stores/game';
	const { isMagicTreeOpen } = gameState.sideInterface;
	const { spells } = magicTree;
	// sort for the lowest tiers first
	$: sortedSpells = $spells
		.sort((a, b) => a.tier - b.tier)
		.filter((spell) => spell.progress !== spell.cost);
</script>

<div class="magic-tree" class:open={$isMagicTreeOpen}>
	<div class="title">
		<h2>Magias</h2>
		<button on:click={() => ($isMagicTreeOpen = false)}>X</button>
	</div>
	{#each sortedSpells as spell}
		<button
			class="alternative"
			on:click={() => (magicTree.selected = magicTree.selected === spell.id ? null : spell.id)}
			class:selected={magicTree.selected === spell.id}
		>
			<div class="icon">
				{#await import(`$lib/${spell.icon}.svg`) then { default: src }}
					<img {src} alt={spell.name} />
				{/await}
			</div>
			<div class="text">
				<h3>{spell.name}</h3>
				<p>{spell.description}</p>
				<div class="progress">
					<div class="bar" style="width: {calcProgress(spell.progress, spell.cost)}%"></div>
				</div>
			</div>
		</button>
	{/each}
</div>

<style lang="scss">
	.magic-tree {
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

		&.open {
			display: flex;
		}

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
		& .alternative {
			display: flex;
			flex-direction: row;
			align-items: center;
			gap: 20px;
			padding: 5px;
			border: 1px solid #000;
			cursor: pointer;

			&:hover:not(.selected) {
				background-color: #00000013;
			}
			&.selected {
				background-color: #0000003a;
			}

			& .icon {
				@include size(64px);
				flex-shrink: 0;
				& img {
					@include size(100%);
				}
			}

			& .text {
				display: flex;
				flex-direction: column;
				& h3 {
					font-size: 20px;
				}
				& p {
					font-size: 16px;
					line-height: 16px;
				}
				& .progress {
					width: 100%;
					height: 4px;
					background: #000;
					margin-top: 6px;
					& .bar {
						height: 100%;
						background: green;
					}
				}
			}
		}
	}
</style>
