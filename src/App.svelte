<script>
	import store from './store';
	import Board from './components/Board.svelte';

	const { state: { author, repo } } = store;
	const boardAvailable = author && repo;

	console.log(boardAvailable);
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
{/if}
