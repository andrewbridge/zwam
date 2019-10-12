<script>
    export let title;
    export let user;
</script>

<style>
    .card {
        margin-bottom: 15px;
        border: 1px solid #e6e8ec;
        border-radius: 0.3em;
        box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
        transition: 0.25s box-shadow ease-in-out;
        padding: 10px;
        background: white;
    }

    .card:hover {
        box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
    }

    .card h4 {
        margin-top: 0;
    }
</style>

<div class="card">
    <h4>{title}</h4>
    <p class="author">{user.login}</p>
</div>
