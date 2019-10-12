<script>
    import Lane from './Lane.svelte';

    import rootStore from '../store';

    import * as store from '../store/issues';

    const { state: { repo: name } } = rootStore;

    let lanes = [];
    store.actions.getIssues().then(() => {
      lanes = store.getters.lanes();
      console.log(lanes);
    });

    let boardClass = 'at-start';

    const fadeWidth = 25;
    function handleScroll({ target }) {
        const threshold = lanes.length * 266 + ((lanes.length - 1) * 10) - fadeWidth - target.clientWidth;
        if (target.scrollLeft > threshold) {
          boardClass = 'at-end';
          return;
        }
        if (target.scrollLeft < fadeWidth) {
          boardClass = 'at-start';
          return;
        }

        boardClass = 'in-middle';
    }
</script>

<style>
    .board-wrapper {
        --board-height: 83vh;
        scrollbar-width: thin;
        scrollbar-color: darkgrey transparent;
        overflow-y: hidden;
        overflow-x: scroll;
        position: relative;
    }

    .board-wrapper::-webkit-scrollbar {
        width: 1em;
    }
    .board-wrapper::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .board-wrapper::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    }

    .board-wrapper::after {
        content: '';
        position: fixed;
        bottom: 5px;
        right: 5px;
        width: 25px;
        height: var(--board-height);
        background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
        transition: 0.25s width ease-in-out;
    }

    .board-wrapper::before {
        content: '';
        position: fixed;
        bottom: 5px;
        left: 5px;
        width: 25px;
        height: var(--board-height);
        z-index: 1;
        background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
        transition: 0.25s width ease-in-out;
    }

    .board-wrapper.at-end::after {
        width: 0;
    }

    .board-wrapper.at-start::before {
        width: 0;
    }

    .board {
        display: flex;
        align-items: stretch;
        height: var(--board-height);
        position: relative;
        margin-bottom: 5px;
        list-style: none;
        padding: 0;
        width: calc(var(--lanes) * var(--lane-width));
    }

    .board h3 {
        margin: 0;
        height: 30px;
    }

    .board > li {
        padding: 0 5px;
        list-style: none;
    }
    .board > li:first-child { padding-left: 0; }
    .board > li:last-child { padding-right: 0; }
</style>

<h2>{name}</h2>
<div class="board-wrapper {boardClass}" on:scroll="{handleScroll}">
    <ul class="board" style="--lanes: { lanes.length }">
        {#each lanes as lane}
            <li>
                <h3>{lane.name}</h3>
                <Lane {...lane}></Lane>
            </li>
        {/each}
    </ul>
</div>
