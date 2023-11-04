<script lang="ts">
  import Spinner from "../lib/Spinner.svelte";
  import { resetMessages } from "../lib/gpt";
  import DestinationAndDates from "./DestinationAndDates.svelte";
  import Itinerary from "./Itinerary.svelte";
  import Entrance from "./Entrance.svelte";
  import Travelers from "./Travelers.svelte";
  import Activities from "./Activities.svelte";
  import Budget from "./Budget.svelte";

  const pages = [
    Entrance,
    DestinationAndDates,
    Travelers,
    Activities,
    Budget,
    Itinerary,
  ];
  let page = pages[0];
  console.log(pages.indexOf(page));

  let data = {
    thinking: false,
    recipes: [],
    selection: "",
    instruction: "",
  };

  function movePage(numpages = 1) {
    page = pages[pages.indexOf(page) + numpages];
  }

  function reset() {
    resetMessages();
    page = pages[0];
  }
</script>

<content>
  <h1>Travel Planning Assistant</h1>
  <br><br><br>
  {#if data.thinking}
    <Spinner />
    <br><br><br><br><br>
  {:else}
    <svelte:component this={page} bind:data {movePage} />
    <br><br><br>
    <button on:click={reset}>Reset</button>
  {/if}
</content>

<style>
</style>
