<script>
  import { isdebug } from "../lib/store";

  export let movePage;
  export let data;

  data.destination = $isdebug ? "Tokyo" : "";
  data.datesFrom = $isdebug ? "2023-12-01" : "";
  data.datesTo = $isdebug ? "2023-12-05" : "";
</script>

<div class="card">
  <h2>1. Destination and Dates</h2>
  <form on:submit|preventDefault={() => movePage()}>
    <label
      >Destination
      <input type="text" id="input" bind:value={data.destination} />
    </label><br />
    <label>
      Dates From
      <input type="date" id="input" bind:value={data.datesFrom} />
    </label><br />
    <label>
      Dates To
      <input type="date" id="input" bind:value={data.datesTo} />
    </label>
  </form>
  <br>
  <footer>
    <button on:click={() => movePage(1)}>Next&nbsp;<img src="next.png" alt="Image" width="10px" height="10px" ></button>
  </footer>
  <br>
</div>

<style>
  /* css */
</style>
