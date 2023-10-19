<script lang="ts">
  import { isdebug } from "../lib/store";

  export let movePage;
  export let data;

  data.activities = [];
  if ($isdebug) {
    data.activities = ["eat japapese food", "shopping"];
  }
</script>

<div class="card">
  <h2>3. Interested Activities</h2>
  <form>
    <ul>
      {#each data.activities as activity, i}
        <li>
          <input type="text" bind:value={data.activities[i]} />
        </li>
      {/each}
    </ul>
    <button on:click|preventDefault={() => { data.activities = [...data.activities, ""]; }}>Add</button
    >
    <hr />
  </form>
  <footer>
    <button on:click={() => movePage(-1)}>Back</button>
    <button on:click={() => movePage(1)}>Next</button>
  </footer>
</div>

<style>
  /* css */
</style>
