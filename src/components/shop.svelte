<script lang="ts">
	import coin from '$lib/coin.svg';
	import { gameState, shop } from '../stores/game';
	import type { GeneralItem } from '../stores/types';
	import { createId, raritiesMap, richText } from '$lib';
	const { gold, logs, inventory } = gameState;
	const { isShopOpen } = gameState.sideInterface;
	const { items: shopItems, tax } = shop;

	let selectedItem: GeneralItem | null = null;
	const selectItem = (item: GeneralItem) => {
		if (selectedItem?.id === item.id) {
			selectedItem = null;
		} else {
			selectedItem = item;
		}
	};

	const buy = () => {
		if (selectedItem) {
			// if the player has enough gold
			const cost = Math.trunc(selectedItem.cost * tax);
			if ($gold.total >= cost) {
				// remove the item from the shop
				shop.items.remove(selectedItem.id);
				gold.incrementTotal(-cost);
				inventory.add(selectedItem);
				logs.add({
					type: 'sell',
					message: richText(`Comprou ${selectedItem.name} por **${cost} de ouro**.`),
					id: createId()
				});
				selectedItem = null;
			} else {
				logs.add({
					type: 'warning',
					message: `Você não tem ouro suficiente para comprar ${selectedItem.name}.`,
					id: createId()
				});
			}
		}
	};
</script>

<div class="shop" class:wide={selectedItem !== null} class:open={$isShopOpen}>
	<div class="title">
		<h2>Loja</h2>
		<button
			on:click={() => {
				isShopOpen.set(false);
			}}>X</button
		>
	</div>
	<div class="wrapper">
		<div class="content">
			{#each $shopItems.items as item}
				<button
					on:click={() => selectItem(item)}
					class:selected={selectedItem?.id === item.id}
					class={`item ${item.rarity}`}
				>
					{#await import(`$lib/${item.icon}.svg`) then { default: src }}
						<img {src} alt={item.name} width="64" height="64" />
					{/await}
				</button>
			{/each}
		</div>
		{#if selectedItem}
			<div class="details">
				<div class="description">
					<div class="icon">
						{#await import(`$lib/${selectedItem.icon}.svg`) then { default: src }}
							<img width="64" height="64" {src} alt={selectedItem.name} />
						{/await}
					</div>
					<div class="text">
						<h3>{selectedItem.name}</h3>
						<div class={`rarity ${selectedItem.rarity}`}>{raritiesMap[selectedItem.rarity]}</div>
						<p>{@html selectedItem.description}</p>
					</div>
				</div>
				<div class="actions">
					<button
						class:disabled={$gold.total < Math.trunc(selectedItem.cost * tax)}
						on:click={() => buy()}
						>Comprar {Math.trunc(selectedItem.cost * tax)}<img src={coin} alt="Moeda" /></button
					>
				</div>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.shop {
		display: none;
		position: absolute;
		top: 0;
		left: 68px;
		z-index: +4;
		width: 360px;
		height: 400px;
		background: red;
		padding: 10px;

		flex-direction: column;
		gap: 5px;
		& .wrapper {
			display: flex;
			gap: 5px;
			flex-direction: row;

			& .details {
				padding: 0 10px;

				& .description {
					display: flex;
					gap: 10px;
					flex-direction: row;
					align-items: flex-start;

					& .icon {
						flex-shrink: 0;
						background: radial-gradient(#00000066 50%, transparent 65%);
					}

					& .text {
						display: flex;
						flex-direction: column;
						gap: 5px;
						& h3 {
							font-size: 20px;
						}
						& .rarity {
							background: #00000066;
							padding: 2px 4px;
							border-radius: 4px;
							width: fit-content;
							&.common {
								color: map-get($rarities, 'common');
							}
							&.uncommon {
								color: map-get($rarities, 'uncommon');
							}
							&.rare {
								color: map-get($rarities, 'rare');
							}
							&.epic {
								color: map-get($rarities, 'epic');
							}
							&.legendary {
								color: map-get($rarities, 'legendary');
							}
						}
					}
				}
				& .actions {
					width: 100%;
					display: flex;
					flex-direction: row;
					gap: 5px;
					margin-top: 10px;

					& button {
						flex: 1;
						background: none;
						border: 1px solid #000;
						padding: 5px 10px;
						cursor: pointer;
						display: flex;
						flex-direction: row;
						justify-content: center;
						align-items: center;
						gap: 5px;
						&:hover {
							background: #00000013;
						}
						&.disabled {
							cursor: disabled;
						}
					}
				}
			}
		}
		&.wide {
			width: 720px;
		}

		& .content {
			width: 340px;
			display: flex;
			flex-wrap: wrap;
			gap: 5px;
			flex-shrink: 0;
			& .item {
				width: 64px;
				height: 64px;
				border: 1px solid #000;
				background: rgba(0, 0, 0, 0.275);
				cursor: pointer;
				&.selected {
					background: rgba(0, 0, 0, 0.5);
				}
				&.common {
					border-color: map-get($rarities, 'common');
				}
				&.uncommon {
					border-color: map-get($rarities, 'uncommon');
				}
				&.rare {
					border-color: map-get($rarities, 'rare');
				}
				&.epic {
					border-color: map-get($rarities, 'epic');
				}
				&.legendary {
					border-color: map-get($rarities, 'legendary');
				}
				&:hover {
					background: rgba(0, 0, 0, 0.375);
				}
			}
		}

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
	}
</style>
