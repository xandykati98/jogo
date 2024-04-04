<script lang="ts">
	// make a tinder-like swipeable card component
	import { onMount, createEventDispatcher } from 'svelte';
	import { decisions, gameState } from '../stores/game';

	$: activeDecision = $decisions[0];

	const dispatch = createEventDispatcher();

	let isDragging = false;
	let x = 0;
	let prevX = 0;
	let angle = 0;
	let card: HTMLButtonElement;
	let threshold = 0;

	onMount(() => {
		threshold = window.innerWidth / 6;
	});

	const handleMouseMove = (event: MouseEvent) => {
		if (!card) return;
		if (!isDragging) {
			card.classList.remove('left-active', 'right-active');
			return;
		}
		x = event.clientX - prevX;
		angle = x / 5;
		card.style.transform = `translate(${Math.trunc(x)}px) rotate(${angle}deg)`;

		// lower the opacity as the card moves away from the center to the sides
		card.style.opacity = `${1 - Math.abs(x) / window.innerWidth}`;

		// if the card passes the threshold, change the color
		if (Math.abs(x) > threshold) {
			card.classList.add(x < 0 ? 'left-active' : 'right-active');
		} else {
			card.classList.remove('left-active', 'right-active');
		}
	};

	const handleMouseDown = (event: MouseEvent) => {
		isDragging = true;
		prevX = event.clientX - x;
	};

	const reset = () => {
		if (!card) return;
		const rate = 5;
		if (Math.abs(x) < rate) {
			isDragging = false;
			prevX = 0;
			x = 0;
			return;
		}
		x += (0 - x) / rate;

		angle = x / 5;

		card.style.transform = `translate(${x}px) rotate(${angle}deg)`;
		card.style.opacity = `${1 - Math.abs(x) / window.innerWidth}`;

		if (x !== 0) requestAnimationFrame(reset);
	};

	const handleRightDecision = () => {
		dispatch('decision', 'right');
		activeDecision.right.effect.activate();
		decisions.remove(activeDecision.id);
		prevX = 0;
		x = 0;
	};
	const handleLeftDecision = () => {
		dispatch('decision', 'left');
		activeDecision.left.effect.activate();
		decisions.remove(activeDecision.id);
		prevX = 0;
		x = 0;
	};
	const handleMouseUp = () => {
		isDragging = false;
		if (Math.abs(x) > threshold) {
			if (x > 0) {
				// right swipe
				if (activeDecision) {
					handleRightDecision();
				} else {
					handleEndYes();
				}
			} else {
				// left swipe
				if (activeDecision) {
					handleLeftDecision();
				} else {
					handleEndNo();
				}
			}
		}
		reset();
	};
	const handleMouseLeave = () => {
		isDragging = false;
		reset();
	};
	const handleEndNo = () => {
		isDragging = false;
		reset();
	};
	const handleEndYes = () => {
		isDragging = false;
		reset();
		gameState.endDay();
	};
</script>

<div class="card-container">
	{#if activeDecision}
		{#await import(`$lib/cards/${activeDecision.image}.png`) then { default: src }}
			<button
				class="card"
				bind:this={card}
				on:mousemove={handleMouseMove}
				on:mousedown={handleMouseDown}
				on:mouseup={handleMouseUp}
				on:mouseleave={handleMouseLeave}
				style="background-image: url({src})"
			>
				<div class="wrapper">
					<div class="title">
						{@html activeDecision.title}
					</div>
					<div class="text">
						{@html activeDecision.text}
					</div>
					<div class="actions">
						<button class="left action" on:click={handleLeftDecision}>
							{activeDecision.left.text}
							{#if activeDecision.left.effect}
								<div class="pop">
									{@html activeDecision.left.effect.description}
								</div>
							{/if}
						</button>
						<button class="right action" on:click={handleRightDecision}>
							{activeDecision.right.text}
							{#if activeDecision.right.effect}
								<div class="pop">
									{@html activeDecision.right.effect.description}
								</div>
							{/if}
						</button>
					</div>
				</div>
			</button>
		{/await}
	{:else}
		{#await import(`$lib/cards/end.png`) then { default: src }}
			<button
				class="card"
				bind:this={card}
				on:mousemove={handleMouseMove}
				on:mousedown={handleMouseDown}
				on:mouseup={handleMouseUp}
				on:mouseleave={handleMouseLeave}
				style="background-image: url({src})"
			>
				<div class="wrapper">
					<div class="title">Todas as decisões foram tomadas</div>
					<div class="text">Quer avançar para o próximo dia?</div>
					<div class="actions">
						<button class="left action" on:click={handleEndNo}> Não </button>
						<button class="right action" on:click={handleEndNo}> Sim </button>
					</div>
				</div>
			</button>
		{/await}
	{/if}
</div>

<style lang="scss">
	.card-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 3;
		height: 50vh;
		width: 300px;
	}
	.card {
		height: 50vh;
		width: 300px;
		background: red;
		background-size: cover;
		background-position: center;
		position: absolute;
		animation: goUp 0.2s;
		&.left-active {
			& .wrapper .actions .left {
				color: yellowgreen;
			}
		}
		&.right-active {
			& .wrapper .actions .right {
				color: yellowgreen;
			}
		}
		@keyframes goUp {
			0% {
				transform: translateY(100%);
			}
			100% {
				transform: translateY(0);
			}
		}

		& .wrapper {
			// linear gradient
			background: linear-gradient(0deg, rgba(0, 0, 0, 1), transparent);
			height: 100%;
			width: 100%;
			color: #fff;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			& .title {
				font-size: 24px;
				padding: 10px;
				width: 100%;
			}
			& .text {
				padding: 10px;
			}
			& .actions {
				display: flex;
				justify-content: space-between;
				flex-direction: column;
				gap: 5px;
				padding: 10px;
				& .action {
					padding: 5px 25px;
					position: relative;
					background: #00000066;
					border: 1px solid #000;
					color: #fff;
					border: none;
					cursor: pointer;
					&:hover {
						background: #00000099;
						& .pop {
							display: block;
						}
					}
					& .pop {
						position: absolute;
						top: 100%;
						left: 50%;
						transform: translateX(-50%);
						background: #000;
						padding: 5px;
						display: none;
						color: #fff;
						font-size: 12px;
						z-index: 2;
						pointer-events: none;
					}
					&::after {
						position: absolute;
						top: 50%;
						transform: translateY(-50%);
					}
					&.left::after {
						content: '<-';
						left: 5px;
					}
					&.right::after {
						content: '->';
						right: 5px;
					}
				}
			}
		}
	}
</style>
