<script lang="ts">
	// make a tinder-like swipeable card component
	import { onMount } from 'svelte';
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
		if (!isDragging) return;
		x = event.clientX - prevX;
		angle = x / 5;
		card.style.transform = `translate(${Math.trunc(x)}px) rotate(${angle}deg)`;

		// lower the opacity as the card moves away from the center to the sides
		card.style.opacity = `${1 - Math.abs(x) / window.innerWidth}`;

		// if the card passes the threshold, change the color
		if (Math.abs(x) > threshold) {
			card.style.backgroundColor = x > 0 ? 'green' : 'yellow';
		} else {
			card.style.backgroundColor = 'red';
		}
	};

	const handleMouseDown = (event: MouseEvent) => {
		isDragging = true;
		prevX = event.clientX - x;
	};

	const reset = () => {
		const rate = 5;
		if (Math.abs(x) < rate) {
			isDragging = false;
			prevX = 0;
			return;
		}
		x += (0 - x) / rate;

		angle = x / 5;

		card.style.transform = `translate(${x}px) rotate(${angle}deg)`;
		card.style.opacity = `${1 - Math.abs(x) / window.innerWidth}`;

		if (x !== 0) requestAnimationFrame(reset);
	};

	const handleRightDecision = () => {
		console.log('right');
	};
	const handleLeftDecision = () => {
		console.log('left');
	};
	const handleMouseUp = () => {
		isDragging = false;
		if (Math.abs(x) > threshold) {
			if (x > 0) {
				// right swipe
				handleRightDecision();
			} else {
				// left swipe
				handleLeftDecision();
			}
		}
		reset();
	};
	const handleMouseLeave = () => {
		isDragging = false;
		reset();
	};
</script>

<div class="card-container">
	<button
		class="card"
		bind:this={card}
		on:mousemove={handleMouseMove}
		on:mousedown={handleMouseDown}
		on:mouseup={handleMouseUp}
		on:mouseleave={handleMouseLeave}
	></button>
</div>

<style lang="scss">
	.card-container {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		height: 100vh;
	}
	.card {
		height: 50vh;
		width: 300px;
		background: red;
		position: absolute;
	}
</style>
