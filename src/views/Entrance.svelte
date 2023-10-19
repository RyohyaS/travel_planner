<script>
  export let movePage;
  export let data;
</script>

<div class="card">
  <form on:submit|preventDefault={() => movePage()}>
    <button id="submit">Get Started</button>
  </form>
</div>

<style>
  /* css */
</style>
