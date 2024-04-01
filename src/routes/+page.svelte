<script>
	import Logs from '../components/logs.svelte';
	import MagicTree from '../components/magic_tree.svelte';
	import Navbar from '../components/navbar.svelte';
	import Sidebar from '../components/sidebar.svelte';
</script>

<div class="relative h-[100vh] p-[unset] w-[100vw]">
	<Navbar />
	<Sidebar />
	<Logs />
	<MagicTree />
</div>
