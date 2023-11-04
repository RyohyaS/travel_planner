<script>
  import { isdebug } from "../lib/store";

  export let movePage;
  export let data;

  data.travelers = {
    adults: 0,
    teens: 0,
    children: 0,
  };
  if ($isdebug) {
    data.travelers = {
      adults: 2,
      teens: 3,
      children: 0,
    };
  }
</script>

<div class="card">
  <h2>2. Travelers</h2>
  <form>
    <label
      >Adults:
      <input type="number" bind:value={data.travelers.adults} />
    </label><br />
    <label
      >Teens:
      <input type="number" bind:value={data.travelers.teens} />
    </label><br />
    <label
      >Children:
      <input type="number" bind:value={data.travelers.children} />
    </label>
    <hr />
  </form>
  <br>

  <footer>
    <button on:click={() => movePage(-1)}><img src="back1.png" alt="Image" width="10px" height="10px" >&nbsp;Back</button>
    <button on:click={() => movePage(1)}>Next&nbsp;<img src="next.png" alt="Image" width="10px" height="10px" ></button>
  </footer>
  <br>
</div>

<style>
  /* css */
</style>
