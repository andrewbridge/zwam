<script>
	import store from './store';
	import Board from './components/Board.svelte';

	let { state: { author, repo } } = store;
	$: boardAvailable = !!author && !!repo;

	let newUrl = '';

	function openUrl() {
		window.history.pushState(null, `Board for ${newUrl}`, `/${newUrl}`);
		store.actions.parseRepo();
		author = store.state.author;
		repo = store.state.repo;
	}
</script>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(:root) {
		--lane-width: 266px;
		--header-height: 17vh;
		--board-height: calc(100vh - var(--header-height));
	}
</style>

{#if boardAvailable}
	<Board></Board>
{:else}
	<h1>Zwam</h1>
	<input bind:value="{newUrl}" />
	<button on:click="{openUrl}">Open</button>
{/if}
