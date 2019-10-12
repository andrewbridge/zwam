<script>
	import Board from './components/Board.svelte';
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

<Board></Board>
