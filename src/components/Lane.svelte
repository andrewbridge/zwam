<script>
    import Card from './Card.svelte';

    export let issues;
</script>

<style>
    .lane {
        background: lightgrey;
        width: var(--lane-width);
        height: calc(100% - 30px);
        padding: 10px;
        border-radius: 0.2em;
        border: 1px solid lightgrey;
        list-style: none;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: darkgrey transparent;
    }

    .lane::-webkit-scrollbar {
        width: 0.5em;
    }
    .lane::-webkit-scrollbar-track {
        background-color: transparent;
    }
    .lane::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
    }
</style>

<ul class="lane">
    {#each issues as issue}
        <li>
            <Card {...issue}></Card>
        </li>
    {/each}
</ul>
