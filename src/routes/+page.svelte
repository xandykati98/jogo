<script>
	import Logs from '../components/logs.svelte';
	import Navbar from '../components/navbar.svelte';
	import Sidebar from '../components/sidebar.svelte';
	import EndDayPrototype from '../components/end_day_prototype.svelte';
	import Cards from '../components/cards.svelte';
</script>

<div class="relative h-[100vh] p-[unset] w-[100vw] overflow-hidden">
	<Navbar />
	<Sidebar />
	<Logs />
	<!-- <EndDayPrototype /> -->
	<Cards />
</div>
