<script>
	import '../app.css';
</script>

<slot />

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap"
		rel="stylesheet"
	/>
	<style lang="scss">
		* {
			font-family: 'Pixelify Sans', sans-serif;
		}
	</style>
</svelte:head>
